#!/usr/bin/env node
/** Offline structural audit for English en-US manifests and source blocks. No linguistic certification. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const LEVELS=['A1','A2','B1'];
const issue=(issues,severity,code,path,message)=>issues.push({severity,code,path,message});
const norm=value=>String(value??'').trim().normalize('NFC').replace(/\s+/g,' ').toLocaleLowerCase('en-US');

export async function loadEnglishLevel(level){
 const manifestPath=`languages/en/curriculum/${level.toLowerCase()}/index.js`;
 const manifestBox={window:{}};
 vm.runInNewContext(await readFile(resolve(ROOT,manifestPath),'utf8'),manifestBox,{filename:manifestPath,timeout:5000});
 const manifest=manifestBox.window.GUARDI_CURRICULUM_MANIFESTS?.en?.[level];
 if(!manifest||!Array.isArray(manifest.blocks))throw new Error(`Invalid English ${level} manifest`);
 const box={window:{}},units=[],declared=[];
 for(const block of manifest.blocks){
  const path=String(block.path??'').replace(/^\.\//,'');
  if(!path||!Array.isArray(block.units))throw new Error(`Invalid block declaration in ${manifestPath}`);
  vm.runInNewContext(await readFile(resolve(ROOT,path),'utf8'),box,{filename:path,timeout:5000});
  const data=box.window.GUARDI_CURRICULUM_BLOCKS?.en?.[level]?.[block.id];
  if(!data||!Array.isArray(data.units))throw new Error(`Block ${block.id} did not register from ${path}`);
  if(JSON.stringify(data.units.map(unit=>unit?.unitNumber))!==JSON.stringify(block.units))throw new Error(`Manifest/block unit mismatch: ${block.id}`);
  units.push(...data.units);declared.push(...block.units);
 }
 return {id:level,totalUnits:manifest.totalUnits,publishedUnits:[...(manifest.publishedUnits??[])],declaredUnitNumbers:declared,units};
}

export function auditEnglishCurriculum(curriculum,knownIds=new Set()){
 const issues=[],units=Array.isArray(curriculum.units)?curriculum.units:[],level=curriculum.id;
 const unitIds=new Set(),vocabIds=new Set();let vocabularyEntries=0,lessonCount=0,directExerciseCount=0,lessonExerciseCount=0;
 const exerciseTypeCounts={};
 if(units.length!==curriculum.totalUnits)issue(issues,'error','MANIFEST_UNIT_COUNT_MISMATCH',level,`Manifest declares ${curriculum.totalUnits}; loaded ${units.length}.`);
 if(JSON.stringify(units.map(u=>u?.unitNumber))!==JSON.stringify(curriculum.publishedUnits))issue(issues,'error','PUBLISHED_UNIT_COVERAGE_MISMATCH',level,'Loaded units differ from publishedUnits.');
 for(const [ui,unit] of units.entries()){
  const p=`${level}.units[${ui}]`;
  if(!unit||typeof unit!=='object'){issue(issues,'error','UNIT_INVALID',p,'Unit must be an object.');continue;}
  if(unit.id!==`en_${level.toLowerCase()}_u${unit.unitNumber}`)issue(issues,'error','UNIT_ID_MISMATCH',p,'Unit ID does not match its level and number.');
  if(unit.unitNumber!==ui+1)issue(issues,'error','UNIT_ORDER_INVALID',p,'Unit numbers must be sequential.');
  if(typeof unit.id!=='string'||!unit.id.trim())issue(issues,'error','UNIT_ID_MISSING',p,'Unit ID is required.');
  else if(unitIds.has(unit.id))issue(issues,'error','UNIT_ID_DUPLICATE',p,`Duplicate unit ID ${unit.id}.`);else unitIds.add(unit.id);
  if(typeof unit.title!=='string'||!unit.title.trim())issue(issues,'error','UNIT_TITLE_MISSING',p,'Unit title is required.');
  if(!Array.isArray(unit.vocab))issue(issues,'error','VOCABULARY_NOT_ARRAY',p,'vocab must be an array.');
  for(const [wi,word] of (Array.isArray(unit.vocab)?unit.vocab:[]).entries()){
   vocabularyEntries++;const wp=`${p}.vocab[${wi}]`;
   if(!word||typeof word!=='object'){issue(issues,'error','VOCAB_ITEM_INVALID',wp,'Vocabulary entry must be an object.');continue;}
   if(typeof word.id!=='string'||!word.id.trim())issue(issues,'error','VOCAB_ID_MISSING',wp,'Vocabulary ID is required.');
   else if(vocabIds.has(word.id))issue(issues,'error','VOCAB_ID_DUPLICATE',wp,`Duplicate vocabulary ID ${word.id}.`);else vocabIds.add(word.id);
   for(const field of ['target','esp'])if(typeof word[field]!=='string'||!word[field].trim())issue(issues,'error','VOCAB_FIELD_MISSING',wp+'.'+field,`Required field ${field} is missing.`);
   for(const field of ['ex','exEsp'])if(typeof word[field]!=='string'||!word[field].trim())issue(issues,'warning','VOCAB_EXAMPLE_INCOMPLETE',wp+'.'+field,`Example field ${field} is missing.`);
  }
  const localIds=new Set((unit.vocab??[]).map(w=>w?.id).filter(Boolean));
  const checkExercise=(e,ep,isLesson=false)=>{
   if(!e||typeof e!=='object'){issue(issues,'error','EXERCISE_INVALID',ep,'Exercise must be an object.');return;}
   if(isLesson)lessonExerciseCount++;else directExerciseCount++;
   if(typeof e.type!=='string'||!e.type.trim())issue(issues,'error','EXERCISE_TYPE_MISSING',ep,'Exercise type is required.');
   else exerciseTypeCounts[e.type]=(exerciseTypeCounts[e.type]??0)+1;
   if(typeof e.prompt!=='string'||!e.prompt.trim())issue(issues,'error','EXERCISE_PROMPT_MISSING',ep,'Exercise prompt is required.');
   if(typeof e.vocabId!=='string'||!e.vocabId.trim())issue(issues,'error','EXERCISE_VOCAB_REFERENCE_MISSING',ep,'Exercise must link to a vocabulary ID.');
   else if(!knownIds.has(e.vocabId)&&!localIds.has(e.vocabId))issue(issues,'error','EXERCISE_VOCAB_REFERENCE_UNKNOWN',ep+'.vocabId',`Unknown vocabulary ID ${e.vocabId}.`);
   if(e.type==='mc'){
    if(!Array.isArray(e.options)||e.options.length<2)issue(issues,'error','MC_OPTIONS_INVALID',ep,'Multiple-choice needs at least two options.');
    else{const opts=e.options.map(norm);if(opts.some(x=>!x))issue(issues,'error','MC_OPTION_EMPTY',ep,'Multiple-choice options cannot be empty.');if(new Set(opts).size!==opts.length)issue(issues,'warning','MC_OPTION_DUPLICATE',ep,'Multiple-choice options contain duplicates.');if(!Number.isInteger(e.answer)||e.answer<0||e.answer>=e.options.length)issue(issues,'error','MC_ANSWER_INVALID',ep,'Multiple-choice answer index is out of range.');}
   }else if(e.type==='order'){
    if(!Array.isArray(e.words)||!Array.isArray(e.correctOrder))issue(issues,'error','ORDER_DATA_INVALID',ep,'Ordering needs words and correctOrder arrays.');
    else{const sort=a=>[...a].map(String).sort();if(JSON.stringify(sort(e.words))!==JSON.stringify(sort(e.correctOrder)))issue(issues,'error','ORDER_TOKEN_MISMATCH',ep,'correctOrder must contain exactly the words tokens.');}
   }else issue(issues,'warning','EXERCISE_TYPE_UNREVIEWED',ep,`Exercise type ${e.type} is outside the mc/order audit.`);
  };
  if(!Array.isArray(unit.exercises))issue(issues,'error','UNIT_EXERCISES_NOT_ARRAY',p,'Unit exercises must be an array.');
  else unit.exercises.forEach((e,i)=>checkExercise(e,`${p}.exercises[${i}]`));
  if(!Array.isArray(unit.lessons))issue(issues,'error','LESSONS_NOT_ARRAY',p,'Lessons must be an array.');
  else{lessonCount+=unit.lessons.length;unit.lessons.forEach((lesson,li)=>{
   const lp=`${p}.lessons[${li}]`;
   if(!lesson||typeof lesson!=='object'){issue(issues,'error','LESSON_INVALID',lp,'Lesson must be an object.');return;}
   for(const field of ['title','objective','grammar'])if(typeof lesson[field]!=='string'||!lesson[field].trim())issue(issues,'error','LESSON_FIELD_MISSING',lp+'.'+field,`Required lesson field ${field} is missing.`);
   for(const field of ['vocabIds','reviewVocabIds']){
    if(!Array.isArray(lesson[field]))issue(issues,'error','LESSON_VOCAB_LIST_INVALID',lp+'.'+field,`${field} must be an array.`);
    else lesson[field].forEach((id,i)=>{if(typeof id!=='string'||!id.trim())issue(issues,'error','LESSON_VOCAB_ID_INVALID',`${lp}.${field}[${i}]`,'Vocabulary reference must be non-empty text.');else if(!knownIds.has(id)&&!localIds.has(id))issue(issues,'error','LESSON_VOCAB_REFERENCE_UNKNOWN',`${lp}.${field}[${i}]`,`Unknown vocabulary ID ${id}.`);});
   }
   if(!Array.isArray(lesson.exercises))issue(issues,'error','LESSON_EXERCISES_NOT_ARRAY',lp,'Lesson exercises must be an array.');
   else lesson.exercises.forEach((e,i)=>checkExercise(e,`${lp}.exercises[${i}]`,true));
  });}
 }
 return {level,unit_count:units.length,vocabulary_entries:vocabularyEntries,unique_vocabulary_ids:vocabIds.size,lesson_count:lessonCount,direct_exercise_count:directExerciseCount,lesson_exercise_count:lessonExerciseCount,total_exercise_count:directExerciseCount+lessonExerciseCount,exercise_type_counts:exerciseTypeCounts,error_count:issues.filter(x=>x.severity==='error').length,warning_count:issues.filter(x=>x.severity==='warning').length,info_count:issues.filter(x=>x.severity==='info').length,issues};
}
export function auditEnglishCurricula(curricula){
 const ids=new Set(curricula.flatMap(c=>c.units.flatMap(u=>(u.vocab??[]).map(w=>w?.id).filter(Boolean))));
 return curricula.map(c=>auditEnglishCurriculum(c,ids));
}
export async function buildEnglishQualityReport(){
 const curricula=[];for(const level of LEVELS)curricula.push(await loadEnglishLevel(level));
 const levels=auditEnglishCurricula(curricula);
 const summary={levels:levels.length,units:levels.reduce((s,x)=>s+x.unit_count,0),vocabulary_entries:levels.reduce((s,x)=>s+x.vocabulary_entries,0),unique_vocabulary_ids:levels.reduce((s,x)=>s+x.unique_vocabulary_ids,0),lessons:levels.reduce((s,x)=>s+x.lesson_count,0),exercises:levels.reduce((s,x)=>s+x.total_exercise_count,0),errors:levels.reduce((s,x)=>s+x.error_count,0),warnings:levels.reduce((s,x)=>s+x.warning_count,0)};
 return {schema_version:1,generated_at:new Date().toISOString(),language:'en-US',scope:'English manifests and declared source blocks A1/A2/B1',method:'offline_structural_and_reference_checks',external_services_used:false,linguistic_certification:false,summary,levels,limitations:['Checks manifest coverage, IDs, required fields, exercise structures, and vocabulary references only.','Does not certify grammar, naturalness, register, US usage, semantic equivalence, pronunciation, or CEFR alignment.','Does not replace independent editorial review or review by a native English speaker.','Vocabulary marked not_checked remains unverified; no verification status is inferred.']};
}
async function main(){
 const args=process.argv.slice(2);let jsonPath='';
 for(let i=0;i<args.length;i++){if(args[i]==='--json'){jsonPath=args[++i];if(!jsonPath)throw new Error('--json requires an output path.');}else if(args[i]==='--help'||args[i]==='-h'){console.log('Usage: node scripts/audit-en-curriculum-quality.mjs [--json PATH]');return;}else throw new Error(`Unknown argument: ${args[i]}`);}
 const report=await buildEnglishQualityReport(),output=JSON.stringify(report,null,2)+'\n';
 if(jsonPath){const dest=resolve(ROOT,jsonPath);await mkdir(dirname(dest),{recursive:true});await writeFile(dest,output,'utf8');}
 console.log(JSON.stringify(report.summary,null,2));
 for(const l of report.levels)console.log(`${l.level}: ${l.unit_count} units, ${l.vocabulary_entries} vocabulary entries, ${l.lesson_count} lessons, ${l.total_exercise_count} exercises, ${l.error_count} errors, ${l.warning_count} warnings`);
 if(jsonPath)console.log(`English report saved to ${resolve(ROOT,jsonPath)}`);
 if(report.summary.errors)process.exitCode=1;
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))main().catch(e=>{console.error('audit-en-curriculum-quality:',e.message);process.exitCode=1;});
