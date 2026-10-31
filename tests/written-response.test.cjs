'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const start=html.indexOf('const WrittenResponse = (() => {');
const endMarker='window.WrittenResponse = WrittenResponse;';
const end=html.indexOf(endMarker,start);
assert.ok(start>=0&&end>start,'written-response module must exist');
function makeStorage(initial='[]',fail=false){
 let value=initial;
 return{
  getItem(){if(fail)throw Error('blocked');return value;},
  setItem(_key,next){if(fail)throw Error('quota');value=next;},
  removeItem(){if(fail)throw Error('blocked');value=null;},
  get value(){return value;}
 };
}
function load(localStorage=makeStorage()){
 const sandbox={window:{localStorage,confirm:()=>true},Blob,
  URL:{createObjectURL:()=>'blob:test',revokeObjectURL(){}},
  document:{createElement:()=>({click(){},remove(){}}),body:{appendChild(){}}}};
 vm.runInNewContext(html.slice(start,end)+'\nwindow.WrittenResponse = WrittenResponse;',sandbox);
 return sandbox.window.WrittenResponse;
}
test('normalization handles case, spaces, punctuation and opening Spanish signs',()=>{
 const api=load();
 assert.equal(api.normalize('  BeRaPa   harganya?!  ','id'),'berapa harganya');
 assert.equal(api.normalize('¿ ¡HOLA,   MUNDO! .','es'),'hola mundo');
 assert.equal(api.normalize('“Halo”','id'),'halo');
 assert.equal(api.normalize('’Halo‘','id'),'halo');
});
test('Spanish answers accept omitted accents',()=>{
 const api=load();
 assert.equal(api.compare('arbol',{type:'translate_id_es',answer:'árbol'}).status,'correct');
});
test('approved accepted answers work but pending-review alternatives do not',()=>{
 const api=load();
 const ex={type:'translate_es_id',answer:'Terima kasih',acceptedAnswers:[
  {text:'Makasih',status:'pending-review'},{text:'Terima kasih',status:'approved'}]};
 assert.equal(api.compare('Makasih',ex).status,'incorrect');
 assert.equal(api.compare('terima kasih',ex).status,'correct');
});
test('one extra, missing or changed character is tolerated only in long words',()=>{
 const api=load(),ex={type:'translate_es_id',answer:'Berapa harganya?'};
 assert.equal(api.compare('Berapa harganyaa',ex).status,'typo');
 assert.equal(api.compare('Berapa hargany',ex).status,'typo');
 assert.equal(api.compare('Berapa harganxa',ex).status,'typo');
 assert.equal(api.compare('Kmu',{type:'translate_es_id',answer:'Kamu'}).status,'incorrect');
});
test('only exercise-declared optional words may be omitted',()=>{
 const api=load(),ex={type:'translate_es_id',answer:'Saya makan nasi',optionalWords:['saya']};
 assert.equal(api.compare('makan nasi',ex).status,'correct');
 assert.equal(api.compare('makan',ex).status,'incorrect');
});
test('missing required words, changed order and different vocabulary remain incorrect',()=>{
 const api=load(),ex={type:'translate_es_id',answer:'Saya tidak makan nasi'};
 assert.equal(api.compare('Saya tidak makan',ex).status,'incorrect');
 assert.equal(api.compare('Saya makan tidak nasi',ex).status,'incorrect');
 assert.equal(api.compare('Saya tidak minum nasi',ex).status,'incorrect');
});
test('correct results are not logged; rejected and typo-accepted results are',()=>{
 const api=load(makeStorage());
 const base={exerciseId:'a1_u1:l1:e2',unit:'a1_u1',unitTitle:'Saludos',lesson:'Lección 1',
  direction:'es→id',expectedAnswer:'Berapa harganya?',originalText:'Berapa harganyaa',normalizedText:'berapa harganyaa'};
 api.recordResult({status:'correct'},{...base,type:'rejected'});
 api.recordResult({status:'incorrect'},base);
 api.recordResult({status:'typo'},base);
 const entries=api.read();
 assert.equal(entries.length,2);
 assert.equal(entries[0].type,'rejected');
 assert.equal(entries[1].type,'accepted-typo');
 assert.equal(entries[0].unitTitle,'Saludos');
 assert.equal(entries[0].direction,'es→id');
});
test('exercise issue reports are stored in the existing response log and counted',()=>{
 const api=load(makeStorage());
 const issue={exerciseId:'a1_u1:lesson-1:exercise-2',unit:'a1_u1',unitTitle:'Saludos',
  lesson:'Lección 1',direction:'mc',expectedAnswer:'Hola',originalText:'¿Qué significa halo?',
  prompt:'¿Qué significa halo?',exerciseType:'mc',options:['Hola','Adiós']};
 api.recordIssue(issue);
 api.recordIssue(issue);
 const entries=api.read();
 assert.equal(entries.length,1);
 assert.equal(entries[0].type,'reported-issue');
 assert.equal(entries[0].issueCategory,'exercise-content');
 assert.equal(entries[0].count,2);
 assert.equal(entries[0].expectedAnswer,'Hola');
});

test('same exercise and rejected answer increments counter and updates date',()=>{
 const api=load(makeStorage());
 const item={exerciseId:'e1',unit:'a1_u1',lesson:'Lección 1',direction:'es→id',
  expectedAnswer:'Halo',originalText:'Hlao',normalizedText:'hlao',type:'rejected'};
 api.record(item);api.record({...item,originalText:' hlao '});
 assert.equal(api.read().length,1);
 assert.equal(api.read()[0].count,2);
 assert.equal(api.read()[0].originalText,' hlao ');
 assert.ok(api.read()[0].date);
});
test('local log keeps only the latest 300 entries',()=>{
 const api=load(makeStorage());
 for(let i=0;i<305;i++)api.record({exerciseId:'e'+i,unit:'a1_u1',lesson:'Lección 1',
  direction:'es→id',expectedAnswer:'x',originalText:'y',normalizedText:'y'+i,type:'rejected'});
 assert.equal(api.read().length,300);
 assert.equal(api.read()[0].exerciseId,'e5');
 assert.equal(api.read()[299].exerciseId,'e304');
});
test('storage errors never escape log methods',()=>{
 const api=load(makeStorage('[]',true));
 assert.doesNotThrow(()=>api.recordResult({status:'incorrect'},{exerciseId:'e1',normalizedText:'bad'}));
 assert.doesNotThrow(()=>api.read());
 assert.doesNotThrow(()=>api.clear());
});
test('UI wiring is separate from backups and keeps tap translation and SRS hooks',()=>{
 assert.match(html,/WrittenResponse\.compare\(originalText, ex\)/);
 assert.match(html,/WrittenResponse\.recordResult\(result, logEntry\)/);
 assert.match(html,/WrittenResponse\.recordIssue\(/);
 assert.match(html,/exercise-report-btn/);
 assert.match(html,/WrittenResponse\.exportLog\(\)/);
 assert.match(html,/WrittenResponse\.clearWithConfirmation\(\)/);
 assert.doesNotMatch(html,/putSetting\(['"]writtenAnswerReviewLog/);
 assert.doesNotMatch(html,/writtenAnswerReviewLog\s*:/);
 assert.match(html,/renderTapTranslationSentence/);
 assert.match(html,/SRSEngine\.recordAttempt/);
});
