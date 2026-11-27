import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEnglishEditorialQueue, summarizeEnglishQueue, toCsv } from '../scripts/build-en-editorial-review-queue.mjs';
import { loadEnglishLevel } from '../scripts/audit-en-curriculum-quality.mjs';

test('builds a pending review queue from every English en-US level', async () => {
  const curricula=[];
  for(const level of ['A1','A2','B1'])curricula.push(await loadEnglishLevel(level));
  const rows=buildEnglishEditorialQueue(curricula);
  const summary=summarizeEnglishQueue(rows);
  assert.equal(summary.total_entries,4922);
  assert.deepEqual(summary.by_level,{A1:1278,A2:1592,B1:2052});
  assert.deepEqual(summary.by_item_type,{vocabulary:2442,exercise:2480});
  assert.ok(rows.every(row=>row.review_status==='pending'&&row.editorial_status==='not_reviewed'&&row.review_confidence==='unassessed'));
  assert.equal(summary.linguistic_certification,false);
  assert.ok(rows.some(row=>row.item_type==='vocabulary'&&row.verification_status==='not_checked'));
  assert.ok(rows.some(row=>row.item_type==='exercise'&&row.candidate_flags.includes('distractor_quality_review')));
});

test('serializes commas, quotes and newlines as valid CSV', () => {
  assert.equal(toCsv([{term:'word, "example"\nnext'}]),'term\n"word, ""example""\nnext"\n');
});

test('does not mark vocabulary or exercises reviewed when queue is generated', () => {
  const rows=buildEnglishEditorialQueue([{id:'A1',units:[{id:'en_a1_u1',title:'Unit',vocab:[{id:'v1',target:'word',esp:'palabra',ex:'A word.',exEsp:'Una palabra.',verification:{status:'not_checked'}}],exercises:[{type:'mc',prompt:'Choose',vocabId:'v1',options:['palabra','libro'],answer:0}],lessons:[]}]}]);
  assert.equal(rows.length,2);
  assert.ok(rows.every(row=>row.review_status==='pending'&&row.editorial_status==='not_reviewed'));
});
