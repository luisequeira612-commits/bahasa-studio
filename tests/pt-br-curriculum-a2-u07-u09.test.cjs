'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const sources={
 './languages/pt-BR/curriculum/a2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/index.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-01-03.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-01-03.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-04-06.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-04-06.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-07-09.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-07-09.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-10-12.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-10-12.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-13-15.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-13-15.js'),'utf8')
 ,'./languages/pt-BR/curriculum/a2/units-16-18.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-16-18.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-19-21.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-19-21.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-22-24.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-22-24.js'),'utf8')
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
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/a2/index.js'],sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('pt-BR A2 U7-U9 load through the offline loader while the language remains unavailable',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isSupported('pt-BR'),true);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 const {units,totalUnits}=await loader.loadUnits('pt-BR','A2',[7,8,9]);
 assert.equal(totalUnits,30);
 assert.deepEqual(Array.from(units,u=>u.unitNumber),[7,8,9]);
 assert.equal(loader.resolve('pt-BR','A2'),null);
 for(const unit of units){
  assert.equal(unit.vocab.length,10,unit.id);
  assert.equal(unit.lessons.length,5,unit.id);
  assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,10,unit.id);
  for(const word of unit.vocab) assert.equal(word.verification.status,'not_checked',word.id);
  const localIds=new Set(unit.vocab.map(word=>word.id));
  for(const lesson of unit.lessons){
   assert.ok(lesson.vocabIds.length>=2,unit.id);
   for(const id of lesson.vocabIds) assert.ok(localIds.has(id),unit.id+' invalid lesson vocabulary '+id);
   assert.equal(lesson.exercises.length,2,unit.id);
  }
  for(const exercise of [...unit.exercises,...unit.lessons.flatMap(lesson=>lesson.exercises)]){
   assert.equal(exercise.type,'mc',unit.id);
   const word=unit.vocab.find(item=>item.id===exercise.vocabId);
   assert.ok(word,unit.id+' exercise references missing vocabulary');
   assert.equal(exercise.options[exercise.answer],word.esp,unit.id+' incorrect answer mapping');
  }
 }
});
test('A2 manifest publishes U1-U30 as a partial level of thirty units',()=>{
 const {window}=createPilot();
 const manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].A2;
 assert.equal(manifest.totalUnits,30);
 assert.deepEqual(Array.from(manifest.publishedUnits),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
});
test('A2 U7-U9 review references resolve only to previously published A2 vocabulary',async()=>{
 const {loader}=createPilot();
 const {units}=await loader.loadUnits('pt-BR','A2',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
 for(let index=6;index<9;index++){
  const earlier=new Set(units.slice(0,index).flatMap(unit=>unit.vocab.map(word=>word.id)));
  for(const lesson of units[index].lessons) for(const id of lesson.reviewVocabIds) assert.ok(earlier.has(id),id);
 }
});
test('service worker precaches A2 U7-U9 using cache v3.8.147',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 assert.match(source,/units-07-09\.js/);
 assert.match(source,/curriculum\/a2\/index\.js/);
 assert.match(source,/bahasa-studio-v3\.8\.147/);
});
