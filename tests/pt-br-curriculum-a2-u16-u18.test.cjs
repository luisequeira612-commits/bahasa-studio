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
 './languages/pt-BR/curriculum/a2/units-13-15.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-13-15.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-16-18.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-16-18.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-19-21.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-19-21.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/units-22-24.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/units-22-24.js'),'utf8')
};
function createPilot(){
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){const source=sources[script.src];if(!source){script.onerror();return;}vm.runInNewContext(source,sandbox);script.onload();}}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);vm.runInNewContext(loaderSource,sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/a2/index.js'],sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('pt-BR A2 U16-U18 load through the offline loader while the language remains unavailable',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isSupported('pt-BR'),true);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 const {units,totalUnits}=await loader.loadUnits('pt-BR','A2',[16,17,18]);
 assert.equal(totalUnits,30);assert.deepEqual(Array.from(units,u=>u.unitNumber),[16,17,18]);
 assert.equal(loader.resolve('pt-BR','A2'),null);
 for(const unit of units){
  assert.equal(unit.vocab.length,10,unit.id);assert.equal(unit.lessons.length,5,unit.id);assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(new Set(unit.vocab.map(w=>w.id)).size,10,unit.id);
  for(const word of unit.vocab)assert.equal(word.verification.status,'not_checked',word.id);
  const localIds=new Set(unit.vocab.map(w=>w.id));
  for(const lesson of unit.lessons){assert.equal(lesson.vocabIds.length,2,unit.id);for(const id of lesson.vocabIds)assert.ok(localIds.has(id),id);assert.equal(lesson.exercises.length,2,unit.id);}
  for(const ex of [...unit.exercises,...unit.lessons.flatMap(l=>l.exercises)]){assert.equal(ex.type,'mc',unit.id);const word=unit.vocab.find(w=>w.id===ex.vocabId);assert.ok(word,ex.vocabId);assert.equal(ex.options[ex.answer],word.esp,ex.vocabId);}
 }
});
test('A2 manifest publishes U1-U30 as a partial level of thirty units',()=>{
 const {window}=createPilot(),manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].A2;
 assert.equal(manifest.totalUnits,30);assert.deepEqual(Array.from(manifest.publishedUnits),Array.from({length:30},(_,i)=>i+1));
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
});
test('A2 U16-U18 review references resolve only to previously published A2 vocabulary',async()=>{
 const {loader}=createPilot(),{units}=await loader.loadUnits('pt-BR','A2',Array.from({length:24},(_,i)=>i+1));
 for(let index=15;index<18;index++){const earlier=new Set(units.slice(0,index).flatMap(u=>u.vocab.map(w=>w.id)));for(const lesson of units[index].lessons)for(const id of lesson.reviewVocabIds)assert.ok(earlier.has(id),id);}
});
test('service worker precaches A2 U16-U18 using cache v3.8.152',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 assert.match(source,/units-16-18\.js/);assert.match(source,/curriculum\/a2\/index\.js/);assert.match(source,/bahasa-studio-v3\.8\.151/);
});
