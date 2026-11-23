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
const blockSource=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1/units-01-06.js'),'utf8');

function createPilot(){
 const sources={
  './languages/pt-BR/curriculum/a1/index.js':manifestSource,
  './languages/pt-BR/curriculum/a1/units-01-06.js':blockSource
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

test('pt-BR A1 pilot loads U1-U3 without making the incomplete course selectable',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 assert.equal(loader.resolve('pt-BR','A1'),null);
 const curriculum=await loader.loadUnits('pt-BR','A1',[1,2,3]);
 assert.equal(curriculum.language,'pt-BR');
 assert.equal(curriculum.totalUnits,24);
 assert.deepEqual(Array.from(curriculum.units,u=>u.unitNumber),[1,2,3]);
 await assert.rejects(loader.load('pt-BR','A1'),/no está disponible/);
});

test('each pilot unit has five explicit lessons and valid vocabulary references',async()=>{
 const {loader}=createPilot();
 const {units}=await loader.loadUnits('pt-BR','A1',[1,2,3]);
 const allIds=new Set(units.flatMap(unit=>unit.vocab.map(word=>word.id)));
 for(const unit of units){
  assert.equal(unit.lessons.length,5,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,unit.vocab.length,unit.id);
  for(const lesson of unit.lessons){
   for(const id of [...lesson.vocabIds,...lesson.reviewVocabIds]) assert.ok(allIds.has(id),unit.id+' missing '+id);
  }
  for(const word of unit.vocab) assert.equal(word.verification.status,'not_checked');
 }
});

test('U3 teaches numbers 1-20 and recycles exactly two U1 questions',async()=>{
 const {loader}=createPilot();
 const {units}=await loader.loadUnits('pt-BR','A1',[1,2,3]);
 const [u1,,u3]=units;
 const numberWords=u3.vocab.filter(word=>word.id.startsWith('ptbr_a1_u3_n'));
 assert.equal(numberWords.length,20);
 assert.equal(numberWords[0].target,'um');
 assert.equal(numberWords[19].target,'vinte');
 const priorIds=new Set(u1.vocab.map(word=>word.id));
 assert.deepEqual(u3.exercises.filter(ex=>priorIds.has(ex.vocabId)).map(ex=>ex.vocabId),[
  'ptbr_a1_u1_v01','ptbr_a1_u1_v02'
 ]);
 assert.ok(u3.lessons[4].reviewVocabIds.includes('ptbr_a1_u1_v01'));
 assert.ok(u3.lessons[4].reviewVocabIds.includes('ptbr_a1_u1_v02'));
});

test('pilot exercises remain text-only and do not request or reference Portuguese audio',async()=>{
 const {loader}=createPilot();
 const {units}=await loader.loadUnits('pt-BR','A1',[1,2,3]);
 for(const unit of units){
  for(const ex of [...unit.exercises,...unit.lessons.flatMap(lesson=>lesson.exercises)]){
   assert.notEqual(ex.type,'listen');
   assert.equal(Object.hasOwn(ex,'audioText'),false);
  }
 }
});

test('service worker precaches the Portuguese manifest and pilot block',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 const sandbox={self:{location:{origin:'https://example.test'},addEventListener(){}},URL,Set,Map,Promise};
 vm.runInNewContext(source,sandbox);
 const assets=vm.runInNewContext('ASSETS',sandbox);
 assert.ok(assets.includes('./languages/pt-BR/curriculum/a1/index.js'));
 assert.ok(assets.includes('./languages/pt-BR/curriculum/a1/units-01-06.js'));
});
