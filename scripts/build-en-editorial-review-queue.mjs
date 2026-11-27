#!/usr/bin/env node
/** Build a pending human-review queue from the real English en-US A1/A2/B1 curriculum. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnglishLevel } from './audit-en-curriculum-quality.mjs';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const VOCAB_DIMENSIONS='meaning;Spanish gloss;US usage;grammar and morphology;naturalness and register;example pair;level fit;collocations';
const EXERCISE_DIMENSIONS='answer validity;distractor quality;ambiguity;Spanish prompt clarity;vocabulary alignment;exercise consistency';
function answerFor(exercise){
 if(exercise.type==='mc'&&Array.isArray(exercise.options)&&Number.isInteger(exercise.answer))return exercise.options[exercise.answer]??'';
 if(exercise.type==='order'&&Array.isArray(exercise.correctOrder))return exercise.correctOrder.join(' ');
 if(typeof exercise.modelAnswer==='string')return exercise.modelAnswer;
 return typeof exercise.answer==='string'?exercise.answer:'';
}
export function buildEnglishEditorialQueue(curricula){
 const rows=[];
 for(const curriculum of curricula)for(const [ui,unit] of curriculum.units.entries()){
  const level=curriculum.id,unitId=String(unit.id??''),unitTitle=String(unit.title??'');
  for(const [wi,word] of (unit.vocab??[]).entries()){
   if(!word||typeof word!=='object')continue;
   const missing=[];
   for(const field of ['id','target','esp','ex','exEsp'])if(typeof word[field]!=='string'||!word[field].trim())missing.push(field);
   const status=String(word.verification?.status??'unknown');
   rows.push({
    review_id:`${level}:${unitId}:vocab:${String(word.id??'missing-'+wi)}`,
    item_type:'vocabulary',review_status:'pending',review_confidence:'unassessed',editorial_status:'not_reviewed',
    review_dimensions:VOCAB_DIMENSIONS,reviewer:'',evidence_notes:'',proposed_correction:'',
    level,unit_id:unitId,unit_title:unitTitle,source_path:`${level}.units[${ui}].vocab[${wi}]`,
    vocab_id:String(word.id??''),english_form:String(word.target??''),spanish_gloss:String(word.esp??''),
    example_english:String(word.ex??''),example_spanish:String(word.exEsp??''),verification_status:status,
    exercise_type:'',prompt:'',canonical_answer:'',accepted_answers:'[]',options:'[]',linked_vocab_ids:'',
    candidate_flags:[...(status==='not_checked'?['verification_pending']:[]),...(missing.length?['missing_required_fields']:[])].join(';'),
    priority:missing.length?'P1':status==='not_checked'?'P2':'P3',
    priority_reason:missing.length?'missing_required_fields':status==='not_checked'?'pending_vocabulary_verification':'routine_editorial_review',
    missing_fields:missing.join(';')
   });
  }
  const collect=(exercises,prefix)=> (Array.isArray(exercises)?exercises:[]).forEach((exercise,ei)=>{
   if(!exercise||typeof exercise!=='object')return;
   const path=`${prefix}[${ei}]`,flags=[];
   const prompt=String(exercise.prompt??'').trim(),canonical=String(answerFor(exercise)??'').trim();
   if(!prompt)flags.push('missing_prompt');
   if(!canonical)flags.push('missing_canonical_answer');
   if(exercise.type==='mc')flags.push('distractor_quality_review');
   if(['write','translate_es_en'].includes(exercise.type))flags.push('open_response_review');
   const accepted=Array.isArray(exercise.acceptedAnswers)?exercise.acceptedAnswers.map(x=>typeof x==='string'?x:String(x?.text??'')):[];
   if(accepted.length)flags.push('accepted_alternatives_review');
   const linked=[...(typeof exercise.vocabId==='string'?[exercise.vocabId]:[]),...(Array.isArray(exercise.vocabIds)?exercise.vocabIds.filter(x=>typeof x==='string'):[])];
   const p1=flags.includes('missing_prompt')||flags.includes('missing_canonical_answer');
   rows.push({
    review_id:`${level}:${unitId}:exercise:${path.replace(/[^a-zA-Z0-9:_-]/g,'_')}`,
    item_type:'exercise',review_status:'pending',review_confidence:'unassessed',editorial_status:'not_reviewed',
    review_dimensions:EXERCISE_DIMENSIONS,reviewer:'',evidence_notes:'',proposed_correction:'',
    level,unit_id:unitId,unit_title:unitTitle,source_path:path,vocab_id:'',
    english_form:'',spanish_gloss:'',example_english:'',example_spanish:'',verification_status:'',
    exercise_type:String(exercise.type??''),prompt,canonical_answer:canonical,
    accepted_answers:JSON.stringify(accepted),options:JSON.stringify(Array.isArray(exercise.options)?exercise.options:[]),
    linked_vocab_ids:[...new Set(linked)].join(';'),candidate_flags:flags.join(';'),
    priority:p1?'P1':flags.length?'P2':'P3',
    priority_reason:p1?'structural_answer_or_prompt_review':flags.length?'editorial_ambiguity_or_distractor_review':'routine_exercise_review',
    missing_fields:''
   });
  });
  collect(unit.exercises,`${level}.units[${ui}].exercises`);
  (unit.lessons??[]).forEach((lesson,li)=>collect(lesson?.exercises,`${level}.units[${ui}].lessons[${li}].exercises`));
 }
 return rows;
}
export function toCsv(rows){
 const columns=rows.length?[...new Set(rows.flatMap(row=>Object.keys(row)))]:[];
 const cell=value=>{const text=String(value??'');return /[",\r\n]/.test(text)?'"'+text.replace(/"/g,'""')+'"':text;};
 return [columns.map(cell).join(','),...rows.map(row=>columns.map(key=>cell(row[key])).join(','))].join('\n')+'\n';
}
export function summarizeEnglishQueue(rows){
 const byLevel={},byType={},byPriority={},byVerification={};
 for(const row of rows){byLevel[row.level]=(byLevel[row.level]??0)+1;byType[row.item_type]=(byType[row.item_type]??0)+1;byPriority[row.priority]=(byPriority[row.priority]??0)+1;if(row.verification_status)byVerification[row.verification_status]=(byVerification[row.verification_status]??0)+1;}
 return {total_entries:rows.length,by_level:byLevel,by_item_type:byType,by_priority:byPriority,vocabulary_verification_status:byVerification,review_status:'pending',editorial_status:'not_reviewed',linguistic_certification:false};
}
async function main(){
 const args=process.argv.slice(2);let output='artifacts/en-editorial-review-queue.csv',summaryPath='artifacts/en-editorial-review-summary.json';
 for(let i=0;i<args.length;i++){if(args[i]==='--output')output=args[++i]??'';else if(args[i]==='--summary')summaryPath=args[++i]??'';else if(args[i]==='--help'||args[i]==='-h'){console.log('Usage: node scripts/build-en-editorial-review-queue.mjs [--output PATH] [--summary PATH]');return;}else throw new Error(`Unknown argument: ${args[i]}`);}
 if(!output)throw new Error('--output needs a path');const curricula=[];for(const level of ['A1','A2','B1'])curricula.push(await loadEnglishLevel(level));
 const rows=buildEnglishEditorialQueue(curricula),summary=summarizeEnglishQueue(rows);
 const csvPath=resolve(ROOT,output);await mkdir(dirname(csvPath),{recursive:true});await writeFile(csvPath,toCsv(rows),'utf8');
 if(summaryPath){const path=resolve(ROOT,summaryPath);await mkdir(dirname(path),{recursive:true});await writeFile(path,JSON.stringify(summary,null,2)+'\n','utf8');}
 console.log(JSON.stringify({...summary,output:csvPath,summary_path:summaryPath?resolve(ROOT,summaryPath):null},null,2));
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(fileURLToPath(import.meta.url)))main().catch(e=>{console.error('build-en-editorial-review-queue:',e.message);process.exitCode=1;});
