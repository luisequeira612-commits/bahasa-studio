#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
const ROOT = process.cwd();
const TRACKERS = ['docs/A1_VOCABULARY_AUDIT_TRACKER_U1_U23.csv','docs/A1_VOCABULARY_AUDIT_TRACKER_U24_U32.csv','docs/A2_LANGUAGE_AUDIT_TRACKER_ALL_UNITS.csv'];
const ALLOWED = new Set(['verified_primary','not_checked','cross_checked_secondary','doubtful']);
function parseCsv(text) {
  const rows=[]; let row=[], field='', quoted=false; const source=text.replace(/^\uFEFF/,'');
  for(let i=0;i<source.length;i++){const ch=source[i];
    if(quoted){if(ch==='"'&&source[i+1]==='"'){field+='"';i++;}else if(ch==='"')quoted=false;else field+=ch;}
    else if(ch==='"'&&field==='')quoted=true; else if(ch===','){row.push(field);field='';}
    else if(ch==='\n'){row.push(field.replace(/\r$/,''));if(row.some(v=>v!==''))rows.push(row);row=[];field='';} else field+=ch;
  }
  if(field!==''||row.length){row.push(field.replace(/\r$/,''));if(row.some(v=>v!==''))rows.push(row);}
  if(!rows.length)return[]; const headers=rows.shift().map(h=>h.trim());
  return rows.map((values,index)=>({...Object.fromEntries(headers.map((h,i)=>[h,values[i]??''])),__row:index+2}));
}
async function loadIds(file,globalName){
  const source=await readFile(ROOT+'/'+file,'utf8');const sandbox={window:{}};
  vm.runInNewContext(source,sandbox,{filename:file,timeout:10000});
  const units=sandbox.window[globalName]?.units;if(!Array.isArray(units))throw new Error(file+': no se encontró '+globalName+'.units');
  const ids=new Set();for(const unit of units)for(const entry of unit.vocab??[])if(typeof entry.id==='string'&&entry.id.trim())ids.add(entry.id.trim());return ids;
}
const curriculumIds=new Set([...await loadIds('curriculum-a1.js','BAHASA_CURRICULUM_A1'),...await loadIds('curriculum-a2.js','BAHASA_CURRICULUM_A2')]);
const trackerRows=[];for(const file of TRACKERS)for(const row of parseCsv(await readFile(ROOT+'/'+file,'utf8')))trackerRows.push({...row,__file:file});
const trackedIds=new Set(trackerRows.map(r=>String(r.vocab_id??'').trim()).filter(Boolean));
const missingRows=[...curriculumIds].filter(id=>!trackedIds.has(id)).sort();
const staleRows=trackerRows.filter(r=>!curriculumIds.has(String(r.vocab_id??'').trim()));
const invalidStates=trackerRows.filter(r=>!ALLOWED.has(String(r.KBBI_status??'').trim()));
const missingEvidence=trackerRows.filter(r=>String(r.KBBI_status??'').trim()==='verified_primary'&&(!String(r.KBBI_entry_url??'').trim()||!String(r.KBBI_checked_date??'').trim()));
const findings=[
 ...missingRows.map(id=>'Currículo sin fila en tracker: '+id),
 ...staleRows.map(r=>'Fila sin ID curricular: '+(r.vocab_id||'(vacío)')+' — '+r.__file+':'+r.__row),
 ...invalidStates.map(r=>'Estado no permitido "'+r.KBBI_status+'" — '+r.__file+':'+r.__row+' ('+r.vocab_id+')'),
 ...missingEvidence.map(r=>'verified_primary sin KBBI_entry_url o KBBI_checked_date — '+r.__file+':'+r.__row+' ('+r.vocab_id+')')
];
const lines=['# Informe de sincronía con los trackers','','Generado: '+new Date().toISOString(),'','## Resultado','',
 '- IDs curriculares distintos A1+A2: **'+curriculumIds.size+'**.',
 '- IDs distintos representados en trackers: **'+trackedIds.size+'**.',
 '- Filas de tracker: **'+trackerRows.length+'**.',
 '- IDs curriculares sin fila: **'+missingRows.length+'**.',
 '- Filas con vocab_id inexistente: **'+staleRows.length+'**.',
 '- Estados no permitidos: **'+invalidStates.length+'**.',
 '- verified_primary sin fuente/fecha: **'+missingEvidence.length+'**.',
 '- Hallazgos totales: **'+findings.length+'**.','',
 'Los IDs repetidos en varias unidades se cuentan una sola vez en la cobertura curricular. Un ID compartido como v465 queda cubierto con una única fila; no se exige duplicarla por cada unidad.','',
 'Estados aceptados: verified_primary, not_checked, cross_checked_secondary, doubtful.','',
 'Para verified_primary se exigen KBBI_entry_url y KBBI_checked_date, campos de fuente primaria y fecha ya presentes en los trackers. No se cambia ningún estado ni CSV.','','## Detalle','',
 ...(findings.length?findings.map((item,i)=>(i+1)+'. '+item):['Sin discrepancias.']),
 '','## Alcance y limitaciones','','Comprobación estructural de cobertura y estados; no valida corrección lingüística, glosas ni calidad de las fuentes. No modifica currículo, trackers, IndexedDB ni backup JSON v3.',''];
await writeFile(ROOT+'/docs/TRACKER_SYNC_REPORT.md',lines.join('\n'),'utf8');console.log(lines.join('\n'));
if(findings.length&&!process.argv.includes('--report-only'))process.exitCode=1;
