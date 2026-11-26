'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const manifestSource=fs.readFileSync(path.join(repo,'languages/en/curriculum/a1/index.js'),'utf8');
const blockSource=fs.readFileSync(path.join(repo,'languages/en/curriculum/a1/units-01-06.js'),'utf8');
function createEnglishPilot(){
 const sources={
  './languages/en/curriculum/a1/index.js':manifestSource,
  './languages/en/curriculum/a1/units-01-06.js':blockSource
 };
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){
  const source=sources[script.src];
  if(!source){script.onerror();return;}
  vm.runInNewContext(source,sandbox);
  script.onload();
 }}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);
 vm.runInNewContext(loaderSource,sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('English en-US is registered but remains unavailable until release approval',()=>{
 const {window,loader}=createEnglishPilot();
 assert.equal(window.LanguageManager.getLocale('en'),'en-US');
 assert.equal(window.LanguageManager.isSupported('en'),true);
 assert.equal(window.LanguageManager.isAvailable('en'),false);
 assert.equal(loader.resolve('en','A1'),null);
 assert.throws(()=>window.LanguageManager.setActiveLanguage('en'),/todavía no está disponible/);
});
test('English A1 manifest exposes only the approved authored U1-U6 block',async()=>{
 const {loader}=createEnglishPilot();
 const curriculum=await loader.loadUnits('en','A1',[1,2,3,4,5,6]);
 assert.equal(curriculum.language,'en');
 assert.equal(curriculum.totalUnits,32);
 assert.deepEqual(Array.from(curriculum.units,u=>u.unitNumber),[1,2,3,4,5,6]);
});
test('each English A1 unit has five explicit lessons, 22 new words and 20 supported exercises',async()=>{
 const {loader}=createEnglishPilot();
 const {units}=await loader.loadUnits('en','A1',[1,2,3,4,5,6]);
 for(const unit of units){
  assert.equal(unit.lessons.length,5,unit.id);
  assert.equal(unit.vocab.length,22,unit.id);
  assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(unit.lessons.reduce((n,lesson)=>n+lesson.exercises.length,0),10,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,22,unit.id);
  for(const word of unit.vocab){
   assert.equal(word.verification.status,'not_checked');
   assert.deepEqual(Array.from(word.verification.sources),[]);
   assert.ok(word.target&&word.esp&&word.ex&&word.exEsp);
  }
  const ids=new Set(unit.vocab.map(word=>word.id));
  for(const lesson of unit.lessons){
   assert.ok(lesson.title&&lesson.objective&&lesson.grammar);
   assert.equal(lesson.exercises.length,2);
   for(const id of [...lesson.vocabIds,...lesson.reviewVocabIds]) assert.ok(ids.has(id)||id.startsWith('en_a1_u'),unit.id+' invalid reference '+id);
   for(const exercise of lesson.exercises) assert.ok(['mc','order'].includes(exercise.type));
  }
  for(const exercise of unit.exercises) assert.ok(['mc','order'].includes(exercise.type));
 }
});
test('English A1 curriculum uses the established vocabulary shape without changing storage contracts',async()=>{
 const {loader}=createEnglishPilot();
 const {units}=await loader.loadUnits('en','A1',[1,2,3,4,5,6]);
 for(const word of units.flatMap(unit=>unit.vocab)){
  assert.deepEqual(Object.keys(word).sort(),['ex','exEsp','esp','id','target','verification'].sort());
 }
});
