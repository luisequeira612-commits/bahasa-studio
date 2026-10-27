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
  { id: 'a1-negation-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: 'Completa la negación: «Ini ___ buku» (Esto no es un libro).', options: ['bukan', 'tidak', 'rumah'], answer: 0, points: 1, explanation: 'Bukan niega un nombre o una identidad; aquí significa «no es un libro».' },
  { id: 'a1-vocab-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '¿Qué significa «Terima kasih»?', options: ['Por favor', 'Disculpe', 'Gracias'], answer: 2, points: 1, explanation: 'Terima kasih es una expresión habitual para dar las gracias.' },
  { id: 'a1-write-01', level: 'A1', skill: 'production', type: 'open', prompt: 'Escribe de 3 a 5 frases sencillas en indonesio para presentarte y mencionar una actividad diaria.', rubric: ['cumplimiento-de-la-tarea', 'claridad', 'gramática-básica', 'vocabulario-relevante'], points: 4 },
  { id: 'a1-numbers-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '«Dua puluh satu» corresponde a qué número?', options: ['12', '21', '100'], answer: 1, points: 1, explanation: 'Dua puluh satu significa veintiuno: dos decenas y una unidad.' },
  { id: 'a1-prices-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'En el mercado, el vendedor dice «Harganya lima ribu rupiah». ¿Qué precio indica?', options: ['5.000 rupias', '10.000 rupias', '21.000 rupias'], answer: 0, points: 1, explanation: 'Harganya significa «su precio» y lima ribu rupiah son 5.000 rupias.' },
  { id: 'a1-time-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'Lee: «Saya tidur malam hari». ¿Cuándo duerme la persona?', options: ['Por la mañana', 'A mediodía', 'Por la noche'], answer: 2, points: 1, explanation: 'Malam hari significa «por la noche»; se evita evaluar la palabra «pada», que no se ha enseñado como vocabulario.' },
  { id: 'a1-weather-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '¿Qué significa «Hari ini hujan»?', options: ['El tren llega tarde', 'Hoy llueve', 'Hoy tengo hambre'], answer: 1, points: 1, explanation: 'Hari ini significa «hoy» y hujan significa «lluvia» o «está lloviendo».' },
  { id: 'a1-transport-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'Si alguien dice «Saya naik bus», ¿cómo viaja?', options: ['A pie', 'En autobús', 'En barco'], answer: 1, points: 1, explanation: 'Naik bus significa viajar o ir en autobús.' },
  { id: 'a1-location-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: 'Completa la frase de ubicación: «Saya tinggal ___ Managua».', options: ['di', 'bukan', 'berapa'], answer: 0, points: 1, explanation: 'La preposición separada di indica ubicación: di Managua.' },
  { id: 'a1-family-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'En «Ini ibu saya», ¿quién es la persona mencionada?', options: ['Mi amiga', 'Mi madre', 'Mi profesora'], answer: 1, points: 1, explanation: 'Ibu significa «madre»; el ejemplo evalúa vocabulario de familia de la unidad 5.' },
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
  { id: 'a1-comprehension-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: '¿Qué significa «Ini rumah saya»?', options: ['Esta es mi casa', 'Este es mi autobús', 'Esta es mi madre'], answer: 0, points: 1, explanation: 'Ini significa «este/esta» y rumah significa «casa».' },
  { id: 'a1-interaction-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: '¿Cuál es una forma sencilla y cortés de pedir té?', options: ['¿Quién es tu té?', 'Todavía no té casa.', 'Saya mau teh, tolong.'], answer: 2, points: 1, explanation: 'Saya mau teh, tolong significa «Quiero té, por favor».' },
  { id: 'a1-age-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: '¿Qué significa «Berapa umur kamu?»?', options: ['¿Cuántos años tienes?', '¿Cómo te llamas?', '¿Cuánto cuesta?'], answer: 0, points: 1, explanation: 'Berapa umur kamu? es la pregunta de edad practicada en la unidad 4.' },
  { id: 'a1-routine-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: '¿Qué significa «Saya bangun pagi»?', options: ['Me ducho', 'Me levanto por la mañana', 'Me voy a dormir'], answer: 1, points: 1, explanation: 'Bangun pagi significa «levantarse por la mañana», contenido de la unidad 12.' },
  { id: 'a1-ini-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: '¿Qué significa «Ini keluarga saya»?', options: ['Esta es mi casa', 'Este es mi amigo', 'Esta es mi familia'], answer: 2, points: 1, explanation: 'Ini introduce algo o a alguien; keluarga saya significa «mi familia».' },
  { id: 'a1-write-02', level: 'A1', skill: 'production', type: 'open', prompt: 'Escribe un mensaje breve en indonesio para saludar a alguien y preguntarle cómo está.', rubric: ['cumplimiento-de-la-tarea', 'claridad', 'adecuación-del-saludo', 'gramática-básica'], points: 3 },
  { id: 'a1-actions-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: '¿Qué significa «Saya pergi»?', options: ['Voy', 'Vengo', 'Estoy contento'], answer: 0, points: 1, explanation: 'Pergi significa ir; Saya pergi = voy.' },
  { id: 'a1-preferences-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: '¿Qué expresa «Saya suka teh»?', options: ['Quiero café', 'Me gusta el té', 'Puedo ir'], answer: 1, points: 1, explanation: 'Suka expresa gusto o preferencia.' },
  { id: 'a1-questions-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: '¿Qué pregunta sirve para saber cuándo viene alguien?', options: ['Siapa nama kamu?', 'Berapa harganya?', 'Kapan kamu datang?'], answer: 2, points: 1, explanation: 'Kapan pregunta por el momento: cuándo.' },
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
