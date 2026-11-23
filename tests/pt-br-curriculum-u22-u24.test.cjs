'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const manifestSource=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/index.js'),'utf8');
const sources={
 './languages/pt-BR/curriculum/a1/index.js':manifestSource,
 './languages/pt-BR/curriculum/a1/units-01-06.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/units-01-06.js'),'utf8'),
 './languages/pt-BR/curriculum/a1/units-07-12.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/units-07-12.js'),'utf8'),
 './languages/pt-BR/curriculum/a1/units-13-18.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/units-13-18.js'),'utf8'),
 './languages/pt-BR/curriculum/a1/units-22-24.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/units-22-24.js'),'utf8')
};
function createPilot(){
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){
  const source=sources[script.src];
  if(!source){script.onerror();return;}
  vm.runInNewContext(source,sandbox);
  script.onload();
 }}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);
 vm.runInNewContext(loaderSource,sandbox);
 vm.runInNewContext(manifestSource,sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('pt-BR A1 U22-U24 load as a non-selectable offline pilot with complete lesson contracts',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 const {units,totalUnits}=await loader.loadUnits('pt-BR','A1',[22,23,24]);
 assert.equal(totalUnits,24);
 assert.deepEqual(Array.from(units,u=>u.unitNumber),[22,23,24]);
 assert.deepEqual(Array.from(units,u=>u.vocab.length),[10,10,10]);
 for(const unit of units){
  assert.equal(unit.lessons.length,5,unit.id);
  assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,10,unit.id);
  for(const word of unit.vocab) assert.equal(word.verification.status,'not_checked',word.id);
  const localIds=new Set(unit.vocab.map(word=>word.id));
  for(const lesson of unit.lessons){
   assert.equal(lesson.vocabIds.length>=2,true,unit.id);
   for(const id of lesson.vocabIds) assert.ok(localIds.has(id),unit.id+' invalid lesson vocabulary '+id);
   for(const id of lesson.reviewVocabIds) assert.match(id,/^ptbr_a1_u\d+_/,unit.id+' invalid review reference '+id);
   assert.equal(lesson.exercises.length,2,unit.id);
  }
  for(const exercise of [...unit.exercises,...unit.lessons.flatMap(lesson=>lesson.exercises)]){
   assert.ok(['mc','order'].includes(exercise.type),unit.id+' unsupported exercise type');
   assert.ok(unit.vocab.some(word=>word.id===exercise.vocabId),unit.id+' exercise references missing vocabulary');
  }
 }
 assert.equal(loader.resolve('pt-BR','A1'),null);
});
test('pt-BR A1 manifest publishes exactly U1-U24 while keeping A1 incomplete',()=>{
 const {window}=createPilot();
 const manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].A1;
 assert.equal(manifest.totalUnits,24);
 assert.deepEqual(Array.from(manifest.publishedUnits),Array.from({length:24},(_,index)=>index+1));
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
});
test('service worker precaches the U22-U24 curriculum block',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 assert.match(source,/units-22-24\.js/);
 assert.match(source,/bahasa-studio-v3.8.137/);
});
