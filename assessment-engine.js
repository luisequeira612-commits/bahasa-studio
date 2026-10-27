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
  { id: 'a1-numbers-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '“Dua puluh satu” is which number?', options: ['12', '21', '100'], answer: 1, points: 1, explanation: 'Dua puluh satu means twenty-one: two tens and one.' },
  { id: 'a1-prices-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'At a market, the seller says “Ini kembaliannya, lima ribu rupiah.” What are they giving you?', options: ['A menu', 'Five thousand rupiah in change', 'A bus ticket'], answer: 1, points: 1, explanation: 'Kembalian means change returned after a payment.' },
  { id: 'a1-time-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'Baca: “Saya bekerja pada sore hari.” When does the speaker work?', options: ['In the morning', 'In the afternoon/evening', 'At midnight'], answer: 1, points: 1, explanation: 'Sore hari refers to the afternoon or early evening.' },
  { id: 'a1-weather-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '“Hari ini hujan” means…', options: ['It is raining today', 'The train is late', 'I am hungry today'], answer: 0, points: 1, explanation: 'Hari ini means today and hujan means rain or raining.' },
  { id: 'a1-transport-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'If someone says “Saya naik bus”, how are they travelling?', options: ['By bus', 'On foot', 'By boat'], answer: 0, points: 1, explanation: 'Naik bus means to take or ride a bus.' },
  { id: 'a1-location-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: 'Complete the location phrase: “Saya tinggal ___ Managua.”', options: ['di', 'bukan', 'berapa'], answer: 0, points: 1, explanation: 'The separate preposition di marks a location: di Managua.' },
  { id: 'a1-family-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'Which question asks someone’s name?', options: ['Siapa nama kamu?', 'Berapa harganya?', 'Cuaca cerah?'], answer: 0, points: 1, explanation: 'Siapa nama kamu? asks what someone’s name is.' },
  { id: 'a2-di-01', level: 'A2', skill: 'diPreposition', type: 'choice', prompt: 'Which spelling means “read at home”?', options: ['dibaca rumah', 'di baca rumah', 'dibaca di rumah'], answer: 2, points: 1, explanation: 'The passive prefix di- joins the verb; the preposition di is separate.' },
  { id: 'a2-passive-01', level: 'A2', skill: 'diPassive', type: 'choice', prompt: 'In “Buku itu dibaca Rina”, what is being read?', options: ['Rina', 'The book', 'The place'], answer: 1, points: 1, explanation: 'Buku itu is the affected item in this passive sentence.' },
  { id: 'a2-write-01', level: 'A2', skill: 'production', type: 'open', prompt: 'Describe a simple activity and where it happens. Include one natural active or passive sentence.', rubric: ['task-completion', 'intelligibility', 'target-pattern', 'relevant-vocabulary'], points: 4 },
  { id: 'b1-kan-i-01', level: 'B1', skill: 'kanI', type: 'choice', prompt: 'Choose the most context-appropriate completion: “Tolong ___ lampu itu untuk saya.” (turn the light on)', options: ['nyalakan', 'makanan', 'terlihat'], answer: 0, points: 1, explanation: 'Nyalakan is a natural imperative form for turning something on.' },
  { id: 'b1-voice-01', level: 'B1', skill: 'voice', type: 'choice', prompt: 'In “Surat itu ditulis oleh Dita”, who wrote the letter?', options: ['The letter', 'Dita', 'An unknown reader'], answer: 1, points: 1, explanation: 'Oleh Dita names the agent in this passive construction.' },
  { id: 'b1-write-01', level: 'B1', skill: 'production', type: 'open', prompt: 'Write a short paragraph describing a process or experience. Make clear who performs the main actions.', rubric: ['task-completion', 'cohesion', 'grammar-in-context', 'lexical-appropriacy'], points: 5 },
  { id: 'b2-register-01', level: 'B2', skill: 'register', type: 'choice', prompt: 'For a formal report, which opening is generally more suitable?', options: ['Gue mau cerita nih…', 'Laporan ini membahas…', 'Pokoknya begini…'], answer: 1, points: 1, explanation: 'Laporan ini membahas… is a more neutral/formal report opening.' },
  { id: 'b2-nominal-01', level: 'B2', skill: 'nominalization', type: 'choice', prompt: 'In “Kebersihan lingkungan perlu dijaga”, kebersihan refers most closely to…', options: ['cleanliness', 'to clean (imperative)', 'cleaned by someone'], answer: 0, points: 1, explanation: 'Kebersihan is a noun meaning cleanliness; affix meanings remain context-sensitive.' },
  { id: 'b2-write-01', level: 'B2', skill: 'production', type: 'open', prompt: 'Write a short, organized informational text for a specified audience. Use a suitable register and explain two meaningful language choices.', rubric: ['task-completion', 'cohesion', 'register', 'grammar-and-lexis'], points: 5 }
,
  { id: 'a1-comprehension-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'Baca: “Saya tinggal di Managua.” Where does the speaker live?', options: ['In Managua', 'In Jakarta', 'At school'], answer: 0, points: 1, explanation: 'Tinggal di means to live in a place.' },
  { id: 'a1-interaction-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'Which is a polite way to ask for tea?', options: ['Saya mau teh, tolong.', 'Teh kamu siapa?', 'Belum teh rumah.'], answer: 0, points: 1, explanation: 'Saya mau …, tolong is a common polite request.' },
  { id: 'a1-write-02', level: 'A1', skill: 'production', type: 'open', prompt: 'Write a short message greeting someone and asking how they are.', rubric: ['task-completion', 'intelligibility', 'greeting-appropriacy', 'basic-grammar'], points: 3 },
  { id: 'a2-context-01', level: 'A2', skill: 'context', type: 'choice', prompt: 'Choose the most natural response to “Terima kasih banyak.”', options: ['Sama-sama.', 'Selamat tidur, harga.', 'Saya dari buku.'], answer: 0, points: 1, explanation: 'Sama-sama is a natural response to thanks.' },
  { id: 'a2-men-01', level: 'A2', skill: 'meN', type: 'choice', prompt: 'Complete the sentence: “Setiap pagi, Rina ___ surat kabar.” (read)', options: ['membaca', 'dibaca', 'bacaan'], answer: 0, points: 1, explanation: 'Membaca is the active verb form used with Rina as the subject.' },
  { id: 'a2-write-02', level: 'A2', skill: 'production', type: 'open', prompt: 'Write two or three connected sentences about something you do every day and where you do it.', rubric: ['task-completion', 'cohesion', 'target-pattern', 'relevant-vocabulary'], points: 4 },
  { id: 'b1-reading-01', level: 'B1', skill: 'reading', type: 'choice', prompt: 'Baca: “Karena hujan deras, pertandingan ditunda sampai besok.” Why was the match postponed?', options: ['Because of heavy rain', 'Because the players arrived early', 'Because it was already tomorrow'], answer: 0, points: 1, explanation: 'Karena hujan deras gives the reason: heavy rain.' },
  { id: 'b1-derivation-01', level: 'B1', skill: 'derivation', type: 'choice', prompt: 'In “Pemerintah melakukan pembangunan jalan”, pembangunan most closely means…', options: ['the act/process of building', 'to build! (command)', 'already built by someone'], answer: 0, points: 1, explanation: 'Pembangunan is a noun referring to development or construction.' },
  { id: 'b1-write-02', level: 'B1', skill: 'production', type: 'open', prompt: 'Explain a small problem you solved. Use connected sentences and make the sequence of actions clear.', rubric: ['task-completion', 'cohesion', 'grammar-in-context', 'lexical-appropriacy'], points: 5 },
  { id: 'b2-reference-01', level: 'B2', skill: 'reference', type: 'choice', prompt: 'In “Rapat itu berlangsung dua jam. Kegiatan tersebut membahas anggaran”, what does kegiatan tersebut refer to?', options: ['The meeting mentioned earlier', 'The budget itself', 'Two hours in general'], answer: 0, points: 1, explanation: 'Tersebut refers back to the previously mentioned meeting/activity.' },
  { id: 'b2-kan-i-01', level: 'B2', skill: 'kanI', type: 'choice', prompt: 'Which sentence uses -i naturally to describe repeated action directed at a place?', options: ['Petugas mengunjungi beberapa desa.', 'Petugas desa mengunjungi.', 'Desa mengunjungi petugas beberapa.'], answer: 0, points: 1, explanation: 'Mengunjungi is a natural verb meaning to visit a place; affix choice depends on the verb and context.' },
  { id: 'b2-write-02', level: 'B2', skill: 'production', type: 'open', prompt: 'Write a short formal recommendation, give two reasons, and use clear references to the proposal you discuss.', rubric: ['task-completion', 'cohesion', 'register', 'grammar-and-lexis'], points: 5 }
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
      const hasResponse = typeof submitted === 'string' && submitted.trim().length > 0;
      if (!hasResponse) {
        status = 'unanswered';
      } else {
        reviewItems.push(item.id);
      }
      if (Object.prototype.hasOwnProperty.call(manualScores, item.id)) {
        const score = manualScores[item.id];
        if (!Number.isFinite(score) || score < 0 || score > item.points) {
          throw new RangeError('Manual score for ' + item.id + ' must be between 0 and ' + item.points);
        }
        if (hasResponse) {
          points = score;
          status = 'reviewed';
        }
      } else if (hasResponse) {
        status = 'needs-review';
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
