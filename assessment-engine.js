'use strict';

// Pure assessment logic. Results are deliberately returned in memory only:
// this module does not touch IndexedDB, SRS records, or backup data.

const LEVELS = Object.freeze({
  A1: { passPercent: 80, minSkillPercent: 60, skills: ['vocabulary', 'grammar', 'comprehension', 'interaction', 'production'] },
  A2: { passPercent: 80, minSkillPercent: 60, skills: ['context', 'meN', 'diPassive', 'diPreposition', 'production'] },
  B1: { passPercent: 80, minSkillPercent: 60, skills: ['reading', 'voice', 'kanI', 'derivation', 'production'] },
  B2: { passPercent: 80, minSkillPercent: 60, skills: ['register', 'kanI', 'nominalization', 'reference', 'production'] }
});

// Initial, deliberately small item bank. These are implementation examples,
// not a validated or complete exam; open production prompts require human review.
const ITEM_BANK = Object.freeze([
  { id: 'a1-negation-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: 'Pilih kalimat yang benar untuk menyangkal identitas: “Saya ___ guru.”', options: ['tidak', 'bukan', 'belum'], answer: 1, points: 1, explanation: 'Bukan commonly negates a noun phrase such as a profession.' },
  { id: 'a1-vocab-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '“Terima kasih” means…', options: ['Please', 'Thank you', 'Excuse me'], answer: 1, points: 1, explanation: 'Terima kasih is a common expression of thanks.' },
  { id: 'a1-write-01', level: 'A1', skill: 'production', type: 'open', prompt: 'Write 3–5 simple Indonesian sentences introducing yourself and one daily activity.', rubric: ['task-completion', 'intelligibility', 'basic-grammar', 'relevant-vocabulary'], points: 4 },
  { id: 'a2-di-01', level: 'A2', skill: 'diPreposition', type: 'choice', prompt: 'Which spelling means “read at home”?', options: ['dibaca rumah', 'di baca rumah', 'dibaca di rumah'], answer: 2, points: 1, explanation: 'The passive prefix di- joins the verb; the preposition di is separate.' },
  { id: 'a2-passive-01', level: 'A2', skill: 'diPassive', type: 'choice', prompt: 'In “Buku itu dibaca Rina”, what is being read?', options: ['Rina', 'The book', 'The place'], answer: 1, points: 1, explanation: 'Buku itu is the affected item in this passive sentence.' },
  { id: 'a2-write-01', level: 'A2', skill: 'production', type: 'open', prompt: 'Describe a simple activity and where it happens. Include one natural active or passive sentence.', rubric: ['task-completion', 'intelligibility', 'target-pattern', 'relevant-vocabulary'], points: 4 },
  { id: 'b1-kan-i-01', level: 'B1', skill: 'kanI', type: 'choice', prompt: 'Choose the most context-appropriate completion: “Tolong ___ lampu itu untuk saya.” (turn the light on)', options: ['nyalakan', 'makanan', 'terlihat'], answer: 0, points: 1, explanation: 'Nyalakan is a natural imperative form for turning something on.' },
  { id: 'b1-voice-01', level: 'B1', skill: 'voice', type: 'choice', prompt: 'In “Surat itu ditulis oleh Dita”, who wrote the letter?', options: ['The letter', 'Dita', 'An unknown reader'], answer: 1, points: 1, explanation: 'Oleh Dita names the agent in this passive construction.' },
  { id: 'b1-write-01', level: 'B1', skill: 'production', type: 'open', prompt: 'Write a short paragraph describing a process or experience. Make clear who performs the main actions.', rubric: ['task-completion', 'cohesion', 'grammar-in-context', 'lexical-appropriacy'], points: 5 },
  { id: 'b2-register-01', level: 'B2', skill: 'register', type: 'choice', prompt: 'For a formal report, which opening is generally more suitable?', options: ['Gue mau cerita nih…', 'Laporan ini membahas…', 'Pokoknya begini…'], answer: 1, points: 1, explanation: 'Laporan ini membahas… is a more neutral/formal report opening.' },
  { id: 'b2-nominal-01', level: 'B2', skill: 'nominalization', type: 'choice', prompt: 'In “Kebersihan lingkungan perlu dijaga”, kebersihan refers most closely to…', options: ['cleanliness', 'to clean (imperative)', 'cleaned by someone'], answer: 0, points: 1, explanation: 'Kebersihan is a noun meaning cleanliness; affix meanings remain context-sensitive.' },
  { id: 'b2-write-01', level: 'B2', skill: 'production', type: 'open', prompt: 'Write a short, organized informational text for a specified audience. Use a suitable register and explain two meaningful language choices.', rubric: ['task-completion', 'cohesion', 'register', 'grammar-and-lexis'], points: 5 }
]);

function getAssessment(level, { excludeIds = [], limit = Infinity } = {}) {
  if (!Object.prototype.hasOwnProperty.call(LEVELS, level)) throw new RangeError('Unknown assessment level: ' + level);
  const excluded = new Set(excludeIds);
  return ITEM_BANK.filter(item => item.level === level && !excluded.has(item.id)).slice(0, limit)
    .map(item => ({ ...item, options: item.options ? [...item.options] : undefined, rubric: item.rubric ? [...item.rubric] : undefined }));
}

function scoreAssessment(level, answers, { manualScores = {} } = {}) {
  const config = LEVELS[level];
  if (!config) throw new RangeError('Unknown assessment level: ' + level);
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) throw new TypeError('answers must be an object keyed by item ID');

  const items = ITEM_BANK.filter(item => item.level === level);
  let earned = 0;
  let possible = 0;
  const skills = {};
  const reviewItems = [];
  const itemResults = [];

  for (const item of items) {
    const submitted = answers[item.id];
    possible += item.points;
    skills[item.skill] ||= { earned: 0, possible: 0 };
    skills[item.skill].possible += item.points;
    let points = 0;
    let status = 'incorrect';

    if (item.type === 'choice') {
      if (Number.isInteger(submitted) && submitted === item.answer) {
        points = item.points;
        status = 'correct';
      } else if (submitted === undefined || submitted === null || submitted === '') {
        status = 'unanswered';
      }
    } else {
      reviewItems.push(item.id);
      if (Object.prototype.hasOwnProperty.call(manualScores, item.id)) {
        const score = manualScores[item.id];
        if (!Number.isFinite(score) || score < 0 || score > item.points) {
          throw new RangeError('Manual score for ' + item.id + ' must be between 0 and ' + item.points);
        }
        points = score;
        status = 'reviewed';
      } else {
        status = hasResponse ? 'needs-review' : 'unanswered';
      }
    }

    earned += points;
    skills[item.skill].earned += points;
    itemResults.push({ id: item.id, skill: item.skill, points, possible: item.points, status });
  }

  const percent = possible ? Math.round((earned / possible) * 100) : 0;
  const skillResults = Object.fromEntries(Object.entries(skills).map(([skill, score]) => {
    const skillPercent = score.possible ? Math.round((score.earned / score.possible) * 100) : 0;
    return [skill, { ...score, percent: skillPercent, meetsMinimum: skillPercent >= config.minSkillPercent }];
  }));
  const openPending = reviewItems.filter(id => !Object.prototype.hasOwnProperty.call(manualScores, id));
  const meetsSkillMinimums = Object.values(skillResults).every(skill => skill.meetsMinimum);
  return {
    level, earned, possible, percent,
    provisionalPass: percent >= config.passPercent && meetsSkillMinimums && openPending.length === 0,
    thresholds: { overallPercent: config.passPercent, perSkillPercent: config.minSkillPercent, validated: false },
    skills: skillResults,
    items: itemResults,
    openItemsPendingReview: openPending
  };
}

const BahasaAssessment = { LEVELS, ITEM_BANK, getAssessment, scoreAssessment };
if (typeof module !== 'undefined' && module.exports) module.exports = BahasaAssessment;
if (typeof globalThis !== 'undefined') globalThis.BahasaAssessment = BahasaAssessment;
