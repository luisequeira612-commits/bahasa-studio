'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');

const repo=path.join(__dirname,'..');
const a1Files=['units-01-06.js','units-07-12.js','units-13-18.js','units-19-21.js','units-22-24.js'];
const b1Files=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js','units-28-30.js','units-31-33.js','units-34-36.js'];
const a2Files=[
 'units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js',
 'units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js','units-28-30.js'
];
const b2Files=[
 'units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js',
 'units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js','units-28-30.js',
 'units-31-33.js','units-34-36.js','units-37-40.js'
];
const sources={
 './languages/pt-BR/curriculum/a1/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/index.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/index.js'),'utf8'),
 './languages/pt-BR/curriculum/b1/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1/index.js'),'utf8'),
 './languages/pt-BR/curriculum/b2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b2/index.js'),'utf8')
};
for(const file of a1Files)sources['./languages/pt-BR/curriculum/a1/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1',file),'utf8');
for(const file of a2Files)sources['./languages/pt-BR/curriculum/a2/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');
for(const file of b1Files)sources['./languages/pt-BR/curriculum/b1/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1',file),'utf8');
for(const file of b2Files)sources['./languages/pt-BR/curriculum/b2/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b2',file),'utf8');

function createPilot(){
 const window={
  localStorage:{getItem(){return 'id';},setItem(){}},
  document:{createElement(){return {};},head:{appendChild(script){
   const source=sources[script.src];
   if(!source){script.onerror();return;}
   vm.runInNewContext(source,sandbox);
   script.onload();
  }}}
 };
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(fs.readFileSync(path.join(repo,'language-manager.js'),'utf8'),sandbox);
 vm.runInNewContext(fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8'),sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/a1/index.js'],sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/a2/index.js'],sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/b1/index.js'],sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/b2/index.js'],sandbox);
 return {window,loader:window.CurriculumLoader};
}
function normalize(value){
 return String(value??'').normalize('NFD').replace(/\p{M}/gu,'')
  .toLocaleLowerCase('pt-BR').replace(/[^\p{L}\p{N}]+/gu,' ')
  .trim().replace(/\s+/g,' ');
}
function assertExercise(exercise,unit,wordById,pathLabel){
 assert.ok(typeof exercise.prompt==='string'&&exercise.prompt.trim(),pathLabel+' prompt');
 assert.ok(typeof exercise.explanation==='string'&&exercise.explanation.trim(),pathLabel+' explanation');
 const word=wordById.get(exercise.vocabId);
 assert.ok(word,pathLabel+' vocabulary reference '+exercise.vocabId);
 assert.ok(exercise.prompt.includes(word.target),pathLabel+' prompt must identify target '+word.target);
 if(exercise.type==='mc'){
  assert.ok(Array.isArray(exercise.options),pathLabel+' options array');
  assert.equal(exercise.options.length,3,pathLabel+' option count');
  assert.ok(exercise.options.every(option=>typeof option==='string'&&option.trim()),pathLabel+' non-empty options');
  assert.equal(new Set(exercise.options.map(normalize)).size,3,pathLabel+' distinct options');
  assert.ok(Number.isInteger(exercise.answer)&&exercise.answer>=0&&exercise.answer<3,pathLabel+' answer index');
  assert.equal(exercise.options[exercise.answer],word.esp,pathLabel+' keyed answer');
 }else if(exercise.type==='order'){
  const expected=word.ex.replace(/[.,!?;:]/g,'').trim().split(/\s+/).filter(Boolean);
  assert.deepEqual(Array.from(exercise.correctOrder),expected,pathLabel+' correct sentence order');
  assert.deepEqual(Array.from(exercise.words).sort(),expected.slice().sort(),pathLabel+' order token inventory');
  assert.notDeepEqual(Array.from(exercise.words),expected,pathLabel+' order tokens must be shuffled');
 }else{
  assert.fail(pathLabel+' unsupported exercise type '+exercise.type);
 }
}

test('pt-BR B2 manifest declares exactly U1-U40 across the 13 authored blocks',()=>{
 const {window}=createPilot();
 const manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].B2;
 assert.equal(manifest.totalUnits,40);
 assert.deepEqual(Array.from(manifest.publishedUnits),Array.from({length:40},(_,i)=>i+1));
 assert.deepEqual(Array.from(manifest.blocks.flatMap(block=>Array.from(block.units))),Array.from({length:40},(_,i)=>i+1));
 assert.deepEqual(Array.from(manifest.blocks,block=>block.path),b2Files.map(file=>'./languages/pt-BR/curriculum/b2/'+file));
});

test('all 40 PT-BR B2 units have complete structure, lesson coverage and valid exercises',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isSupported('pt-BR'),true);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 assert.equal(loader.resolve('pt-BR','B2'),null);
 const numbers=Array.from({length:40},(_,i)=>i+1);
 const [{units,totalUnits},{units:a2Units},{units:a1Units},{units:b1Units}]=await Promise.all([
  loader.loadUnits('pt-BR','B2',numbers),
  loader.loadUnits('pt-BR','A2',Array.from({length:30},(_,i)=>i+1)),
  loader.loadUnits('pt-BR','A1',Array.from({length:24},(_,i)=>i+1)),
  loader.loadUnits('pt-BR','B1',Array.from({length:36},(_,i)=>i+1))
 ]);
 assert.equal(totalUnits,40);
 assert.deepEqual(Array.from(units,unit=>unit.unitNumber),numbers);
 const a2Ids=new Set(a2Units.flatMap(unit=>unit.vocab.map(word=>word.id)));
 const previousTargets=new Map();
 for(const [level,priorUnits] of [['A1',a1Units],['A2',a2Units],['B1',b1Units]])for(const priorUnit of priorUnits)for(const priorWord of priorUnit.vocab){
  const key=normalize(priorWord.target);
  if(!previousTargets.has(key))previousTargets.set(key,level+'.'+priorUnit.id);
 }
 const globalIds=new Set(),globalTargets=new Map(),globalExamples=new Map(),priorLevelDuplicates=[];
 let lessonCount=0,vocabCount=0,exerciseCount=0;

 for(const unit of units){
  const unitPath='B2.U'+unit.unitNumber;
  assert.equal(unit.id,'ptbr_b2_u'+unit.unitNumber,unitPath+' id');
  assert.ok(unit.title&&unit.desc&&unit.grammar,unitPath+' metadata');
  assert.ok(unit.trap&&unit.trap.title&&unit.trap.detail,unitPath+' trap');
  assert.equal(unit.vocab.length,10,unitPath+' vocabulary count');
  assert.equal(unit.lessons.length,5,unitPath+' lesson count');
  assert.equal(unit.exercises.length,10,unitPath+' unit exercise count');
  if(unit.unitNumber>=31){
   assert.ok(unit.exercises.every(exercise=>exercise.type==='order'),unitPath+' unit bank uses sentence-order tasks');
   assert.ok(unit.lessons.flatMap(lesson=>lesson.exercises).every(exercise=>exercise.type==='mc'),unitPath+' lesson bank retains contextual MC practice');
  }
  const wordById=new Map(unit.vocab.map(word=>[word.id,word]));
  assert.equal(wordById.size,10,unitPath+' unique local IDs');
  const introduced=[];
  for(let i=0;i<unit.vocab.length;i++){
   const word=unit.vocab[i],wordPath=unitPath+'.vocab['+i+']';
   const expectedId='ptbr_b2_u'+unit.unitNumber+'_v'+String(i+1).padStart(2,'0');
   assert.equal(word.id,expectedId,wordPath+' canonical ID');
   assert.ok(typeof word.target==='string'&&word.target.trim(),wordPath+' target');
   assert.ok(typeof word.esp==='string'&&word.esp.trim(),wordPath+' Spanish gloss');
   assert.ok(typeof word.ex==='string'&&word.ex.trim(),wordPath+' Portuguese example');
   assert.ok(typeof word.exEsp==='string'&&word.exEsp.trim(),wordPath+' Spanish example');
   assert.equal(word.verification?.status,'not_checked',wordPath+' review status');
   assert.ok(Array.isArray(word.verification?.sources),wordPath+' sources');
   assert.equal(word.verification.sources.length,0,wordPath+' unverified sources');
   assert.ok(!globalIds.has(word.id),wordPath+' globally unique ID');
   globalIds.add(word.id);vocabCount++;
   const targetKey=normalize(word.target),exampleKey=normalize(word.ex);
   if(previousTargets.has(targetKey))priorLevelDuplicates.push(wordPath+' repeats prior-level term '+previousTargets.get(targetKey));
   assert.ok(!globalTargets.has(targetKey),wordPath+' duplicate target with '+globalTargets.get(targetKey));
   assert.ok(!globalExamples.has(exampleKey),wordPath+' duplicate example with '+globalExamples.get(exampleKey));
   globalTargets.set(targetKey,wordPath);globalExamples.set(exampleKey,wordPath);
  }

  for(let i=0;i<unit.exercises.length;i++){
   const exercise=unit.exercises[i];
   assertExercise(exercise,unit,wordById,unitPath+'.exercises['+i+']');
   introduced.push(exercise.vocabId);exerciseCount++;
  }
  assert.deepEqual([...introduced].sort(),[...wordById.keys()].sort(),unitPath+' unit exercises cover each vocabulary item once');

  const lessonCoverage=[];
  for(let i=0;i<unit.lessons.length;i++){
   const lesson=unit.lessons[i],lessonPath=unitPath+'.lessons['+i+']';
   assert.ok(lesson.title&&lesson.objective&&lesson.grammar,lessonPath+' metadata');
   assert.equal(lesson.vocabIds.length,2,lessonPath+' new vocabulary count');
   assert.equal(new Set(lesson.vocabIds).size,2,lessonPath+' distinct new vocabulary');
   assert.equal(lesson.exercises.length,2,lessonPath+' exercise count');
   for(const id of lesson.vocabIds){
    const word=wordById.get(id);
    assert.ok(word,lessonPath+' missing new vocabulary '+id);
    assert.ok(lesson.grammar.toLocaleLowerCase('pt-BR').includes(word.target.toLocaleLowerCase('pt-BR')),
      lessonPath+' must explicitly explain '+word.target);
    lessonCoverage.push(id);
   }
   for(const id of lesson.reviewVocabIds??[]){
    assert.ok(a2Ids.has(id),lessonPath+' review ID must resolve to A2: '+id);
    assert.ok(!lesson.vocabIds.includes(id),lessonPath+' cannot mark new vocabulary as review: '+id);
   }
   const lessonExerciseIds=[];
   for(let j=0;j<lesson.exercises.length;j++){
    const exercise=lesson.exercises[j];
    assertExercise(exercise,unit,wordById,lessonPath+'.exercises['+j+']');
    lessonExerciseIds.push(exercise.vocabId);exerciseCount++;
   }
   assert.deepEqual([...lessonExerciseIds].sort(),[...lesson.vocabIds].sort(),lessonPath+' exercises match its two new terms');
   lessonCount++;
  }
  assert.deepEqual([...lessonCoverage].sort(),[...wordById.keys()].sort(),unitPath+' five lessons cover all ten new terms exactly once');
 }
 assert.equal(lessonCount,200);
 assert.equal(vocabCount,400);
 assert.equal(exerciseCount,800);
 assert.equal(globalIds.size,400);
 assert.equal(globalTargets.size,400);
 assert.equal(globalExamples.size,400);
 assert.deepEqual(priorLevelDuplicates,[],'B2 must not repeat A1/A2/B1 terms: '+priorLevelDuplicates.join('; '));
});
