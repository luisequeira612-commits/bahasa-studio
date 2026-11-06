#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const ROOT=process.cwd(), EXCLUDED=new Set(['.git','node_modules','docs','tests','scripts','artifacts','.github']);
const EXTENSIONS=new Set(['.html','.js','.mjs','.css']);
const CATEGORIES=['TEXTO DE INTERFAZ','CÓDIGO DE VOZ','RUTA DE DATOS','LÓGICA DEL IDIOMA','USO LEGÍTIMO'];
async function collect(dir=''){
 const out=[];for(const entry of await readdir(path.join(ROOT,dir),{withFileTypes:true})){
  const rel=path.posix.join(dir,entry.name);if(entry.isDirectory()){if(!EXCLUDED.has(entry.name))out.push(...await collect(rel));}
  else if(EXTENSIONS.has(path.extname(entry.name))&&!/^curriculum-a[12]\.js$/i.test(entry.name))out.push(rel);
 }return out;
}
function parseSuppressions(text){
 const result=[];for(const line of text.split(/\r?\n/)){if(!line.trim().startsWith('|'))continue;const cells=line.split('|').slice(1,-1).map(x=>x.trim());if(cells.length<4||cells[0].toLowerCase()==='categoría'||cells[0].startsWith('---'))continue;result.push({category:cells[0],file:cells[1],contains:cells[2].replace(/^["']|["']$/g,''),reason:cells.slice(3).join(' | ')});}return result;
}
function classify(line){
 const found=[];
 if(/\b(indonesio|indonesian|bahasa indonesia|curso de indonesio)\b/i.test(line))found.push('TEXTO DE INTERFAZ');
 if(/\bid-ID\b|speechSynthesis[^;\n]*\blang\b|recognition[^;\n]*lang/i.test(line))found.push('CÓDIGO DE VOZ');
 if(/curriculum-a[12]\.js|curriculum\/(?:a1|a2)|(?:a1|a2)[-_](?:curriculum|data)\.(?:json|js)/i.test(line))found.push('RUTA DE DATOS');
 if(/(?:prefijo|sufijo|afijo|morfolog|imbuhan|awalan|akhiran).*(?:meN|meng|meny|mem|ber-|ter-|di-)|(?:meN|meng|meny|mem|ber-|ter-|di-).*(?:prefijo|sufijo|afijo|morfolog|imbuhan|awalan|akhiran)/i.test(line))found.push('LÓGICA DEL IDIOMA');
 if(/Bahasa Studio|🇮🇩|flag[-_ ]?id|Indonesia flag/i.test(line))found.push('USO LEGÍTIMO');
 return found;
}
const suppressionText=await readFile(ROOT+'/docs/LANGUAGE_COUPLING_SUPPRESSIONS.md','utf8');
const suppressions=parseSuppressions(suppressionText), findings=[], suppressed=[], files=await collect();
for(const file of files){const content=await readFile(path.join(ROOT,file),'utf8');content.split(/\r?\n/).forEach((line,index)=>{for(const category of classify(line)){
 const match=suppressions.find(s=>(s.category===category||s.category==='*')&&(s.file===file||s.file==='*')&&line.toLowerCase().includes(s.contains.toLowerCase()));
 const item={category,file,line:index+1,snippet:line.trim().slice(0,220),reason:match?.reason??''};if(match)suppressed.push(item);else findings.push(item);
 }});}
const counts=Object.fromEntries(CATEGORIES.map(c=>[c,findings.filter(x=>x.category===c).length]));
const lines=['# Informe de dependencias del indonesio en el código','','Generado: '+new Date().toISOString(),'','## Resumen','','Archivos de aplicación recorridos: '+files.length+'. Se excluyeron datos curriculares, documentación, scripts de auditoría, tests, dependencias y configuración de CI.',
 ...CATEGORIES.map(c=>'- '+c+': **'+counts[c]+'** casos no suprimidos.'),'- Usos legítimos suprimidos mediante la lista documentada: **'+suppressed.length+'**.','','Este inventario es informativo: no cambia código ni bloquea CI. Las coincidencias son heurísticas de texto y deben revisarse en contexto.','','## Casos detectados','','| Clasificación | Archivo | Línea | Fragmento |','|---|---|---:|---|',
 ...(findings.length?findings.map(x=>'| '+x.category+' | '+x.file+' | '+x.line+' | '+x.snippet.replace(/\|/g,'/')+' |'):['| Ninguno | — | — | — |']),
 '','## Usos legítimos suprimidos','','| Clasificación | Archivo | Línea | Motivo |','|---|---|---:|---|',
 ...(suppressed.length?suppressed.map(x=>'| '+x.category+' | '+x.file+' | '+x.line+' | '+x.reason+' |'):['| Ninguno | — | — | — |']),
 '','## Reglas y límites','','- TEXTO DE INTERFAZ: referencias visibles al indonesio/Bahasa en el código de interfaz.',
 '- CÓDIGO DE VOZ: códigos de idioma fijos o asignaciones de idioma en síntesis/reconocimiento de voz.',
 '- RUTA DE DATOS: referencias codificadas a archivos o rutas curriculares A1/A2.',
 '- LÓGICA DEL IDIOMA: reglas de afijos identificadas solo cuando aparecen junto a términos de morfología.',
 '- USO LEGÍTIMO: marca/nombre de la app o bandera de Indonesia, excluidos solo si la tabla de supresiones los documenta.',
 '- No se analiza el contenido de currículo ni se propone refactorizar los casos encontrados. No se añaden reglas nuevas de arquitectura ni se modifica ningún archivo de la app.',''];
await writeFile(ROOT+'/docs/LANGUAGE_COUPLING_REPORT.md',lines.join('\n'),'utf8');console.log('LANGUAGE_COUPLING_REPORT: '+findings.length+' coincidencias no suprimidas; '+suppressed.length+' usos legítimos suprimidos.');
