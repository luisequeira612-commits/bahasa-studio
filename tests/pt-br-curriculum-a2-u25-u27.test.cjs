'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const blockFiles=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js'];
const sources={'./languages/pt-BR/curriculum/a2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/index.js'),'utf8')};
for(const file of blockFiles)sources['./languages/pt-BR/curriculum/a2/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');
function createPilot(){
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){const source=sources[script.src];if(!source){script.onerror();return;}vm.runInNewContext(source,sandbox);script.onload();}}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);vm.runInNewContext(loaderSource,sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/a2/index.js'],sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('pt-BR A2 U25-U27 load offline with ten vocabulary entries, five lessons and ten MC exercises per unit',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isSupported('pt-BR'),true);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 const {units,totalUnits}=await loader.loadUnits('pt-BR','A2',[25,26,27]);
 assert.equal(totalUnits,30);assert.deepEqual(Array.from(units,u=>u.unitNumber),[25,26,27]);
 assert.equal(loader.resolve('pt-BR','A2'),null);
 for(const unit of units){
  assert.equal(unit.vocab.length,10,unit.id);assert.equal(unit.lessons.length,5,unit.id);assert.equal(unit.exercises.length,10,unit.id);
  const localIds=new Set(unit.vocab.map(word=>word.id));assert.equal(localIds.size,10,unit.id);
  for(const word of unit.vocab){assert.equal(word.verification.status,'not_checked',word.id);assert.ok(word.ex&&word.exEsp,word.id);}
  for(const lesson of unit.lessons){
   assert.equal(lesson.vocabIds.length,2,unit.id);for(const id of lesson.vocabIds)assert.ok(localIds.has(id),id);
   assert.equal(lesson.exercises.length,2,unit.id);
   const explanation=lesson.grammar.toLocaleLowerCase('pt-BR');
   for(const id of lesson.vocabIds){const word=unit.vocab.find(item=>item.id===id);assert.ok(explanation.includes(word.target.toLocaleLowerCase('pt-BR')),unit.id+' '+lesson.title+' must explain '+word.target);}
  }
  for(const ex of [...unit.exercises,...unit.lessons.flatMap(lesson=>lesson.exercises)]){
   assert.equal(ex.type,'mc',unit.id);const word=unit.vocab.find(item=>item.id===ex.vocabId);assert.ok(word,ex.vocabId);
   assert.equal(ex.options.length,3,ex.vocabId);assert.equal(ex.options[ex.answer],word.esp,ex.vocabId);
  }
 }
});
test('A2 manifest publishes U1-U30 as a partial level of thirty units',()=>{
 const {window}=createPilot(),manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].A2;
 assert.equal(manifest.totalUnits,30);assert.deepEqual(Array.from(manifest.publishedUnits),Array.from({length:30},(_,i)=>i+1));
 assert.ok(manifest.blocks.some(block=>block.id==='25-27'&&block.units.join(',')==='25,26,27'));
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
});
test('U25-U27 review references resolve only to previously published A2 vocabulary',async()=>{
 const {loader}=createPilot(),{units}=await loader.loadUnits('pt-BR','A2',Array.from({length:27},(_,i)=>i+1));
 for(let index=24;index<27;index++){
  const earlier=new Set(units.slice(0,index).flatMap(unit=>unit.vocab.map(word=>word.id)));
  for(const lesson of units[index].lessons)for(const id of lesson.reviewVocabIds)assert.ok(earlier.has(id),id);
 }
});
test('U25-U27 introduce no exact normalized vocabulary duplicates against A1 and prior A2',()=>{
 const a1Files=['units-01-06.js','units-07-12.js','units-13-18.js','units-19-21.js','units-22-24.js'];
 const targets=[];
 for(const file of a1Files){
  const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1',file),'utf8');
  for(const match of source.matchAll(/v\('(?:[^']+)'\s*,\s*'([^']+)'/g))targets.push(match[1]);
 }
 for(const file of blockFiles){
  const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');
  for(const match of source.matchAll(/vocab\(\s*\d+\s*,\s*\d+\s*,\s*'([^']+)'/g))targets.push(match[1]);
 }
 const normalize=value=>value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
 const previous=targets.slice(0,-30).map(normalize),added=targets.slice(-30).map(normalize);
 assert.equal(added.length,30);assert.equal(new Set(added).size,30);assert.deepEqual(added.filter(word=>previous.includes(word)),[]);
});
test('service worker precaches A2 U25-U27 with cache v3.8.160',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 assert.match(source,/units-25-27\.js/);assert.match(source,/curriculum\/a2\/index\.js/);assert.match(source,/bahasa-studio-v3\.8\.160/);
});
