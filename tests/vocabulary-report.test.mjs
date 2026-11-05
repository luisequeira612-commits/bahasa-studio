import test from 'node:test';
import assert from 'node:assert/strict';
import { buildVocabularyReport } from '../scripts/vocabulary-report.mjs';
const level=(id,units)=>({id,units}),unit=(id,vocab)=>({id,title:id,vocab});
test('report normalizes entries, first appearances, expressions, verification and baseline',()=>{
 const a1=level('A1',[unit('a1_u1',[{id:'1',idn:' Halo '},{id:'2',idn:'SELAMAT PAGI'},{id:'3',idn:'apa kabar?'}]),unit('a1_u2',[{id:'4',idn:'halo'},{id:'5',idn:'Makan'}])]);
 const a2=level('A2',[unit('a2_u1',[{id:'6',idn:'Halo'},{id:'7',idn:'terima kasih'}])]);
 const r=buildVocabularyReport({a1,a2,expectedTotal:4,a1Tracker:[{vocab_id:'1',KBBI_status:'not_checked'}],a2Tracker:[{vocab_id:'6',KBBI_status:'doubtful'}]});
 assert.match(r,/Total A1+A2 (unión).*\| 4 \|/);assert.match(r,/COINCIDE/);assert.match(r,/SÍ (<8)/);assert.match(r,/Expresiones de varias palabras/);assert.match(r,/doubtful/);assert.match(r,/Sin registro CSV/);assert.match(r,/falsos positivos/);
});
test('report flags mismatch against expected application total',()=>{
 const r=buildVocabularyReport({a1:level('A1',[unit('u1',[{id:'1',idn:'saya'}])]),a2:level('A2',[unit('u1',[{id:'2',idn:'dia'}])]),a1Tracker:[],a2Tracker:[],expectedTotal:801});
 assert.match(r,/DISCREPANCIA/);
});
