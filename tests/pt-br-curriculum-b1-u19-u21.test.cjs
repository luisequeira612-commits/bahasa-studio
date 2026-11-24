'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {test}=require('node:test');
const repo=path.join(__dirname,'..');
const managerSource=fs.readFileSync(path.join(repo,'language-manager.js'),'utf8');
const loaderSource=fs.readFileSync(path.join(repo,'curriculum-loader.js'),'utf8');
const b1Files=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js'];
const a2Files=['units-01-03.js','units-04-06.js','units-07-09.js','units-10-12.js','units-13-15.js','units-16-18.js','units-19-21.js','units-22-24.js','units-25-27.js','units-28-30.js'];
const a1Files=['units-01-06.js','units-07-12.js','units-13-18.js','units-19-21.js','units-22-24.js'];
const sources={
 './languages/pt-BR/curriculum/b1/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1/index.js'),'utf8'),
 './languages/pt-BR/curriculum/a2/index.js':fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2/index.js'),'utf8')
};
for(const file of b1Files)sources['./languages/pt-BR/curriculum/b1/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1',file),'utf8');
for(const file of a2Files)sources['./languages/pt-BR/curriculum/a2/'+file]=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');
function createPilot(){
 const window={localStorage:{getItem(){return 'id';},setItem(){}},document:{createElement(){return {};},head:{appendChild(script){const source=sources[script.src];if(!source){script.onerror();return;}vm.runInNewContext(source,sandbox);script.onload();}}}};
 const sandbox={window,Object,Map,Set,Promise,Error,String,Array,Number};
 vm.runInNewContext(managerSource,sandbox);vm.runInNewContext(loaderSource,sandbox);
 vm.runInNewContext(sources['./languages/pt-BR/curriculum/b1/index.js'],sandbox);
 return {window,loader:window.CurriculumLoader};
}
test('pt-BR B1 U19-U21 load as content while the incomplete course remains unavailable',async()=>{
 const {window,loader}=createPilot();
 assert.equal(window.LanguageManager.isSupported('pt-BR'),true);
 assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
 assert.equal(loader.resolve('pt-BR','B1'),null);
 const {units,totalUnits}=await loader.loadUnits('pt-BR','B1',[19,20,21]);
 assert.equal(totalUnits,36);assert.deepEqual(Array.from(units,u=>u.unitNumber),[19,20,21]);
 for(const unit of units){
  assert.equal(unit.vocab.length,10,unit.id);assert.equal(unit.lessons.length,5,unit.id);assert.equal(unit.exercises.length,10,unit.id);
  assert.equal(new Set(unit.vocab.map(word=>word.id)).size,10,unit.id);
  for(const word of unit.vocab){assert.equal(word.verification.status,'not_checked',word.id);assert.ok(word.ex&&word.exEsp,word.id);}
  assert.deepEqual([...unit.lessons.flatMap(lesson=>lesson.vocabIds)].sort(),[...unit.vocab.map(word=>word.id)].sort(),unit.id+' lessons must cover all ten terms exactly once');
  for(const lesson of unit.lessons){
   assert.equal(lesson.vocabIds.length,2,unit.id);
   const grammar=lesson.grammar.toLocaleLowerCase('pt-BR');
   for(const id of lesson.vocabIds){const word=unit.vocab.find(item=>item.id===id);assert.ok(word,id);assert.ok(grammar.includes(word.target.toLocaleLowerCase('pt-BR')),unit.id+' '+lesson.title+' must explain '+word.target);}
   assert.equal(lesson.exercises.length,2,unit.id);
  }
  for(const ex of [...unit.exercises,...unit.lessons.flatMap(lesson=>lesson.exercises)]){
   assert.equal(ex.type,'mc',unit.id);const word=unit.vocab.find(item=>item.id===ex.vocabId);assert.ok(word,ex.vocabId);
   assert.equal(ex.options.length,3,ex.vocabId);assert.equal(ex.options[ex.answer],word.esp,ex.vocabId);
  }
 }
});
test('B1 manifest publishes exactly U1-U27 of 36 and remains unavailable in the language selector',()=>{
 const {window}=createPilot(),manifest=window.GUARDI_CURRICULUM_MANIFESTS['pt-BR'].B1;
 assert.equal(manifest.totalUnits,36);assert.deepEqual(Array.from(manifest.publishedUnits),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]);
 assert.deepEqual(Array.from(manifest.blocks[4].units),[13,14,15]);assert.deepEqual(Array.from(manifest.blocks[5].units),[16,17,18]);assert.deepEqual(Array.from(manifest.blocks[6].units),[19,20,21]);assert.deepEqual(Array.from(manifest.blocks[7].units),[22,23,24]);assert.equal(window.LanguageManager.isAvailable('pt-BR'),false);
});
test('B1 U19-U21 review references resolve to existing A2 vocabulary IDs',async()=>{
 const {loader}=createPilot(),{units}=await loader.loadUnits('pt-BR','B1',[19,20,21]);
 const {units:a2}=await loader.loadUnits('pt-BR','A2',Array.from({length:30},(_,i)=>i+1));
 const ids=new Set(a2.flatMap(unit=>unit.vocab.map(word=>word.id)));
 for(const unit of units)for(const lesson of unit.lessons)for(const id of lesson.reviewVocabIds)assert.ok(ids.has(id),id);
});
test('B1 U19-U21 add no exact normalized vocabulary duplicates against A1, A2 or B1 U1-U18',()=>{
 const prior=[];
 for(const file of a1Files){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a1',file),'utf8');for(const match of source.matchAll(/v\('(?:[^']+)'\s*,\s*'([^']+)'/g))prior.push(match[1]);}
 for(const file of a2Files){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/a2',file),'utf8');for(const match of source.matchAll(/vocab\(\s*\d+\s*,\s*\d+\s*,\s*'([^']+)'/g))prior.push(match[1]);}
 const previous=[];
 for(const file of b1Files.slice(0,6)){const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1',file),'utf8');for(const match of source.matchAll(/vocab\(\d+,\d+,'([^']+)'/g))previous.push(match[1]);}
 const source=fs.readFileSync(path.join(repo,'languages/pt-BR/curriculum/b1/units-19-21.js'),'utf8');
 const added=[...source.matchAll(/vocab\(\d+,\d+,'([^']+)'/g)].map(match=>match[1]);
 const normalize=value=>value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
 const allPrior=new Set([...prior,...previous].map(normalize)),normalized=added.map(normalize);
 assert.equal(prior.length,540);assert.equal(previous.length,180);assert.equal(added.length,30);assert.equal(new Set(normalized).size,30);
 assert.deepEqual(normalized.filter(word=>allPrior.has(word)),[]);
});
test('service worker precaches B1 U1-U27 with cache v3.8.149',()=>{
 const source=fs.readFileSync(path.join(repo,'service-worker.js'),'utf8');
 assert.ok(source.includes("./languages/pt-BR/curriculum/b1/units-19-21.js"));assert.ok(source.includes("./languages/pt-BR/curriculum/b1/units-22-24.js"));
 assert.match(source,/bahasa-studio-v3\.8\.149/);
});
