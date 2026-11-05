#!/usr/bin/env node
/** Offline, read-only inventory; writes docs/VOCABULARY_REPORT.md only. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
const ROOT=process.cwd(), OUTPUT=resolve(ROOT,'docs/VOCABULARY_REPORT.md');
const argIndex=process.argv.indexOf('--expected-total');
const EXPECTED=argIndex>=0?Number(process.argv[argIndex+1]):801;
function parseCsv(source){
 const rows=[];let row=[],field='',quoted=false;
 for(let i=0;i<source.length;i++){const c=source[i];
  if(quoted){if(c==='"'&&source[i+1]==='"'){field+='"';i++;}else if(c==='"')quoted=false;else field+=c;}
  else if(c==='"'&&field==='')quoted=true;else if(c===','){row.push(field);field='';}
  else if(c==='\n'){row.push(field);rows.push(row);row=[];field='';}else if(c!=='\r')field+=c;
 }
 if(field.length||row.length){row.push(field);rows.push(row);}
 const [headers,...values]=rows;return values.filter(r=>r.some(v=>v!=='')).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??''])));
}
async function loadLevel(path,name){const source=await readFile(resolve(ROOT,path),'utf8'),sandbox={window:{}};
 vm.runInNewContext(source,sandbox,{filename:path,timeout:3000});const level=sandbox.window[name];
 if(!level||!Array.isArray(level.units))throw Error('Curriculum unavailable: '+path);return level;}
const norm=v=>String(v??'').trim().toLocaleLowerCase();
function unique(levels){const seen=new Set();return levels.flatMap(l=>l.units.flatMap(u=>u.vocab||[])).filter(w=>{const k=norm(w?.idn);if(!k||seen.has(k))return false;seen.add(k);return true;});}
const cell=v=>String(v??'').replaceAll('|','\\|').replaceAll('\n',' ');
function table(headers,rows){return ['| '+headers.join(' | ')+' |','| '+headers.map(()=> '---').join(' | ')+' |',...rows.map(r=>'| '+r.map(cell).join(' | ')+' |')].join('\n');}
function firstByUnit(level){const seen=new Set();return level.units.map((u,i)=>{let n=0;for(const w of u.vocab||[]){const k=norm(w?.idn);if(k&&!seen.has(k)){seen.add(k);n++;}}return [level.id,u.id||'U'+(i+1),u.title||'',n,n<8?'SÍ (<8)':'—'];});}
function verification(level,rows){const map=new Map();for(const r of rows)if(r.vocab_id)map.set(r.vocab_id,r);
 const words=level.units.flatMap(u=>u.vocab||[]),counts=new Map();let missing=0;
 for(const w of words){const r=map.get(w.id);if(!r){missing++;continue;}const st=r.KBBI_status||'status_missing';counts.set(st,(counts.get(st)||0)+1);}
 return {total:words.length,registered:words.length-missing,missing,counts,orphans:rows.filter(r=>!words.some(w=>w.id===r.vocab_id)).length};}
function candidates(words){return [['ber-',/^ber/i],['meN-',/^me(?:ng|ny|m|n)/i],['di-',/^di/i],['ter-',/^ter/i],['se-',/^se/i],['ke-',/^ke/i],['-an',/an$/i]].map(([label,re])=>({label,forms:[...new Set(words.map(w=>String(w.idn||'').trim()).filter(v=>re.test(v)))].sort((a,b)=>a.localeCompare(b,'id'))}));}
export function buildVocabularyReport({a1,a2,a1Tracker,a2Tracker,expectedTotal=801}){
 const all=unique([a1,a2]),one=unique([a1]),two=unique([a2]),set=new Set(one.map(w=>norm(w.idn)));
 const shared=two.filter(w=>set.has(norm(w.idn))).length, simple=all.filter(w=>!/\s/u.test(String(w.idn).trim())).length;
 const va=verification(a1,a1Tracker),vb=verification(a2,a2Tracker);
 const rows=[['A1',one.length],['A2',two.length],['Total A1+A2 (unión)',all.length],['Compartidas A1/A2',shared]];
 const out=['# Informe local de vocabulario A1+A2','','> Generado con node scripts/vocabulary-report.mjs. Inventario estructural; no certifica corrección lingüística ni dominio.','','## 1. Entradas distintas','',table(['Ámbito','Entradas distintas'],rows),'',
 'La normalización reproduce getUniqueLearningVocabulary(): String(idn || "").trim().toLocaleLowerCase(), excluir vacío y conservar primera aparición. Se incluyen A1 y A2 habilitado; no B1/B2 ni lecciones locales IA.','',
 '**Comprobación del total mostrado:** '+all.length+' calculadas frente a '+expectedTotal+' esperadas. '+(all.length===expectedTotal?'**COINCIDE**.':'**DISCREPANCIA**: revisar currículo o cifra esperada.')+' Se reproduce la lógica con datos del repositorio; no se ejecuta navegador ni se leen lecciones locales del dispositivo.','',
 '## 2. Entradas nuevas por unidad','','Se atribuye cada forma a su primera aparición dentro del nivel. Se marcan unidades con menos de 8 entradas nuevas; no es una cuota.','',
 table(['Nivel','Unidad','Título','Nuevas','Menos de 8'],[...firstByUnit(a1),...firstByUnit(a2)]),'',
 '## 3. Palabras simples y expresiones','',table(['Tipo','Criterio','Entradas'],[['Palabras/formas de un token','Sin espacios internos',simple],['Expresiones de varias palabras','Al menos un espacio',all.length-simple],['Total','Suma',all.length]]),'',
 'Clasificación ortográfica: las expresiones multi-palabra cuentan como una entrada, igual que en la métrica de la app.','',
 '## 4. Candidatos morfológicos para revisión manual','','> ADVERTENCIA: coincidencias de patrones de texto, NO análisis morfológico ni recuento lingüístico. Incluyen falsos positivos (nombres, préstamos y raíces con esas letras). No interpretar como cobertura de afijos.','',
 ...candidates(all).flatMap(g=>['### '+g.label+' — '+g.forms.length+' candidatos','',g.forms.length?g.forms.map(v=>v).join(', '):'Sin coincidencias.','']),
 '## 5. Estado de verificación por entrada','','Se usa la columna KBBI_status de los CSV actuales. Esto no valida por sí solo naturalidad, nivel ni respuestas aceptadas.',''];
 for(const [label,v] of [['A1 (tracker U24–U32)',va],['A2 (tracker completo)',vb]]){
  out.push('### '+label,'',table(['Indicador','Entradas'],[['Entradas curriculares',v.total],['Con registro CSV',v.registered],['Sin registro CSV',v.missing],...[...v.counts].sort(([a],[b])=>a.localeCompare(b)),['Filas CSV sin ID curricular correspondiente',v.orphans]]),'');
 }
 out.push('**Cobertura:** A1 U1–U23 carece de tracker; toda entrada A1 sin fila coincidente se cuenta como “sin registro”. A2 se contrasta por ID. Si un ID aparece varias veces en CSV, la última fila determina su estado y las filas huérfanas se informan aparte.','',
 'Estados futuros aprobados: cross_checked_secondary (coincidencia en dos fuentes secundarias independientes; no es verificación primaria) y doubtful. Este informe no los asigna porque los CSV no aportan evidencia suficiente. Solo revisión humana de fuente primaria permite verified_primary.','',
 '## 6. Límites y decisiones aplicadas','','- Las formas derivadas con ID canónico propio cuentan como entradas; las familias léxicas se reportan aparte. No se calculan familias porque no existe taxonomía morfológica validada por ID.','- not_checked solo puede ser respuesta obligatoria si es básica, frecuente y supera las pruebas automáticas. doubtful nunca puede ser obligatoria.','- Sin hablante nativo disponible y KBBI oficial requiere inicio de sesión: servicios externos opcionales, nunca bloqueantes.','- El informe no usa red ni modifica currículo, vocabulario, ejercicios, CSV, IndexedDB o backup JSON v3.','');
 return out.join('\n');
}
async function main(){const [a1,a2,c1,c2]=await Promise.all([loadLevel('curriculum-a1.js','BAHASA_CURRICULUM_A1'),loadLevel('curriculum-a2.js','BAHASA_CURRICULUM_A2'),readFile(resolve(ROOT,'docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv'),'utf8'),readFile(resolve(ROOT,'docs/A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv'),'utf8')]);
 const report=buildVocabularyReport({a1,a2,a1Tracker:parseCsv(c1),a2Tracker:parseCsv(c2),expectedTotal:EXPECTED});await mkdir(dirname(OUTPUT),{recursive:true});await writeFile(OUTPUT,report,'utf8');
 const line=report.match(/\*\*Comprobación del total mostrado:\*\* ([^\n]+)/)?.[1]||'No disponible';console.log('Wrote docs/VOCABULARY_REPORT.md — '+line);// A mismatch is reported in Markdown but does not block local work or CI.}
if(process.argv[1]&&resolve(process.argv[1])===resolve(import.meta.url.replace('file://','')))await main();
