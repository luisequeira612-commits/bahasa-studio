'use strict';

// Pure assessment logic. Results are deliberately returned in memory only:
// this module does not touch IndexedDB, SRS records, or backup data.

const LEVELS = Object.freeze({
  A1: { passPercent: 80, minSkillPercent: 60, skills: ['vocabulary', 'grammar', 'comprehension', 'interaction', 'production'] },
  A2: { passPercent: 80, minSkillPercent: 60, skills: ['context', 'meN', 'diPassive', 'diPreposition', 'production'] },
  B1: { passPercent: 80, minSkillPercent: 60, skills: ['reading', 'comprehension', 'voice', 'kanI', 'derivation', 'register', 'interaction', 'production'] },
  B2: { passPercent: 80, minSkillPercent: 60, skills: ['register', 'kanI', 'nominalization', 'reference', 'production'] }
});

// Initial, deliberately small item bank. These are implementation examples,
// not a validated or complete exam; open production prompts require human review.
const ITEM_BANK = Object.freeze([
  { id: 'a1-negation-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: 'Completa la negación: «Ini ___ buku» (Esto no es un libro).', options: ['bukan', 'tidak', 'rumah'], answer: 0, points: 1, explanation: 'Bukan niega un nombre o una identidad; aquí significa «no es un libro».' },
  { id: 'a1-vocab-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '¿Qué significa «Terima kasih»?', options: ['Por favor', 'Disculpe', 'Gracias'], answer: 2, points: 1, explanation: 'Terima kasih es una expresión habitual para dar las gracias.' },
  { id: 'a1-write-01', level: 'A1', skill: 'production', type: 'open', prompt: 'Escribe de 3 a 5 frases sencillas en indonesio para presentarte y mencionar una actividad diaria.', rubric: ['cumplimiento-de-la-tarea', 'claridad', 'gramática-básica', 'vocabulario-relevante'], points: 4, writingGuide: ['Incluye tu nombre y de dónde eres.', 'Añade una actividad que haces cada día.', 'Usa frases breves con vocabulario que ya conoces.'], selfCheck: ['¿Incluí mi nombre y mi origen?', '¿Mencioné una actividad cotidiana?', '¿Cada frase comunica una idea completa?', '¿Revisé el orden de las palabras?'], modelAnswer: 'Nama saya Ana. Saya dari Nikaragua. Saya belajar bahasa Indonesia setiap hari.', rubricDescriptions: { 'cumplimiento-de-la-tarea': 'Incluye la presentación personal y una actividad cotidiana.', claridad: 'El sentido de las frases se entiende; no se exige una formulación única.', 'gramática-básica': 'Usa estructuras sencillas de forma comprensible, aunque haya errores menores.', 'vocabulario-relevante': 'Elige palabras relacionadas con la presentación y la rutina.' } },
  { id: 'a1-numbers-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '«Dua puluh satu» corresponde a qué número?', options: ['12', '21', '100'], answer: 1, points: 1, explanation: 'Dua puluh satu significa veintiuno: dos decenas y una unidad.' },
  { id: 'a1-prices-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'En el mercado, el vendedor dice «Harganya lima ribu rupiah». ¿Qué precio indica?', options: ['5.000 rupias', '10.000 rupias', '21.000 rupias'], answer: 0, points: 1, explanation: 'Harganya significa «su precio» y lima ribu rupiah son 5.000 rupias.' },
  { id: 'a1-time-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'Lee: «Saya tidur malam hari». ¿Cuándo duerme la persona?', options: ['Por la mañana', 'A mediodía', 'Por la noche'], answer: 2, points: 1, explanation: 'Malam hari significa «por la noche»; se evita evaluar la palabra «pada», que no se ha enseñado como vocabulario.' },
  { id: 'a1-weather-01', level: 'A1', skill: 'vocabulary', type: 'choice', prompt: '¿Qué significa «Hari ini hujan»?', options: ['El tren llega tarde', 'Hoy llueve', 'Hoy tengo hambre'], answer: 1, points: 1, explanation: 'Hari ini significa «hoy» y hujan significa «lluvia» o «está lloviendo».' },
  { id: 'a1-transport-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: 'Si alguien dice «Saya naik bus», ¿cómo viaja?', options: ['A pie', 'En autobús', 'En barco'], answer: 1, points: 1, explanation: 'Naik bus significa viajar o ir en autobús.' },
  { id: 'a1-location-01', level: 'A1', skill: 'grammar', type: 'choice', prompt: 'Completa la frase de ubicación: «Saya tinggal ___ Managua».', options: ['di', 'bukan', 'berapa'], answer: 0, points: 1, explanation: 'La preposición separada di indica ubicación: di Managua.' },
  { id: 'a1-family-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: 'En «Ini ibu saya», ¿quién es la persona mencionada?', options: ['Mi amiga', 'Mi madre', 'Mi profesora'], answer: 1, points: 1, explanation: 'Ibu significa «madre»; el ejemplo evalúa vocabulario de familia de la unidad 5.' },
  { id: 'a1-listen-01', level: 'A1', skill: 'comprehension', type: 'listen', prompt: 'Escucha la frase en indonesio y escribe exactamente lo que oyes.', audioText: 'Saya tinggal di Managua', answer: 'Saya tinggal di Managua', points: 2, explanation: 'Saya tinggal di Managua significa «Vivo en Managua». La transcripción se compara de forma normalizada, sin exigir mayúsculas ni puntuación.' },
  { id: 'a1-speak-01', level: 'A1', skill: 'production', type: 'speak', prompt: 'Preséntate en voz alta en indonesio. Di tu nombre y de dónde eres; después, añade una actividad cotidiana.', rubric: ['cumplimiento-de-la-tarea', 'claridad', 'gramática-básica', 'vocabulario-relevante'], points: 4 },
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
  { id: 'a1-write-02', level: 'A1', skill: 'production', type: 'open', prompt: 'Escribe un mensaje breve en indonesio: saluda a alguien y pregúntale cómo está. Puedes añadir cómo estás tú.', rubric: ['cumplimiento-de-la-tarea', 'adecuación-del-saludo', 'gramática-básica'], points: 3, writingGuide: ['Empieza con un saludo apropiado.', 'Pregunta Apa kabar? para saber cómo está la otra persona.', 'Si quieres, añade una respuesta breve sobre ti.'], selfCheck: ['¿Mi mensaje contiene un saludo?', '¿Hice una pregunta sobre cómo está la otra persona?', '¿Usé una expresión adecuada para la situación?'], modelAnswer: 'Halo, apa kabar? Saya baik, terima kasih.', rubricDescriptions: { 'cumplimiento-de-la-tarea': 'El mensaje saluda y pregunta cómo está la otra persona.', 'adecuación-del-saludo': 'El saludo resulta adecuado para un intercambio cotidiano sencillo.', 'gramática-básica': 'La pregunta y la respuesta usan estructuras comprensibles de nivel inicial.' } },
  { id: 'a1-write-03', level: 'A1', skill: 'production', type: 'open', prompt: 'Escribe un mensaje de 3 a 4 frases a un amigo para proponer una actividad sencilla. Saluda, di qué te gusta hacer, invita a la actividad y pregunta si quiere acompañarte.', rubric: ['cumplimiento-de-la-tarea', 'claridad', 'coherencia', 'vocabulario-relevante'], points: 4, writingGuide: ['Saluda a tu amigo.', 'Di una actividad que te gusta usando Saya suka ...', 'Haz una invitación sencilla con Ayo ... bersama ...', 'Pregunta si quiere participar; puedes usar Kamu mau?'], selfCheck: ['¿Saludé a la persona?', '¿Dije qué actividad me gusta?', '¿Hice una invitación y una pregunta?', '¿Mis frases aparecen en un orden fácil de seguir?'], modelAnswer: 'Halo, apa kabar? Saya suka makan nasi goreng. Ayo makan bersama besok. Kamu mau?', rubricDescriptions: { 'cumplimiento-de-la-tarea': 'Incluye saludo, preferencia, invitación y pregunta.', claridad: 'La intención de invitar a la otra persona se entiende.', coherencia: 'Las frases siguen un orden lógico para un mensaje breve.', 'vocabulario-relevante': 'Usa expresiones pertinentes para gustos, actividades e invitaciones.' } },
  { id: 'a1-actions-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: '¿Qué significa «Saya pergi»?', options: ['Voy', 'Vengo', 'Estoy contento'], answer: 0, points: 1, explanation: 'Pergi significa ir; Saya pergi = voy.' },
  { id: 'a1-preferences-01', level: 'A1', skill: 'interaction', type: 'choice', prompt: '¿Qué expresa «Saya suka teh»?', options: ['Quiero café', 'Me gusta el té', 'Puedo ir'], answer: 1, points: 1, explanation: 'Suka expresa gusto o preferencia.' },
  { id: 'a1-questions-01', level: 'A1', skill: 'comprehension', type: 'choice', prompt: '¿Qué pregunta sirve para saber cuándo viene alguien?', options: ['Siapa nama kamu?', 'Berapa harganya?', 'Kapan kamu datang?'], answer: 2, points: 1, explanation: 'Kapan pregunta por el momento: cuándo.' },
  { id: 'a2-context-01', level: 'A2', skill: 'context', type: 'choice', prompt: 'Choose the most natural response to “Terima kasih banyak.”', options: ['Sama-sama.', 'Selamat tidur, harga.', 'Saya dari buku.'], answer: 0, points: 1, explanation: 'Sama-sama is a natural response to thanks.' },
  { id: 'a2-men-01', level: 'A2', skill: 'meN', type: 'choice', prompt: 'Complete the sentence: “Setiap pagi, Rina ___ surat kabar.” (read)', options: ['membaca', 'dibaca', 'bacaan'], answer: 0, points: 1, explanation: 'Membaca is the active verb form used with Rina as the subject.' },
  { id: 'a2-write-02', level: 'A2', skill: 'production', type: 'open', prompt: 'Write two or three connected sentences about something you do every day and where you do it.', rubric: ['task-completion', 'cohesion', 'target-pattern', 'relevant-vocabulary'], points: 4 },
  { id: 'b1-reading-01', level: 'B1', skill: 'reading', type: 'choice', prompt: 'Baca: “Karena hujan deras, pertandingan ditunda sampai besok.” Why was the match postponed?', options: ['Because of heavy rain', 'Because the players arrived early', 'Because it was already tomorrow'], answer: 0, points: 1, explanation: 'Karena hujan deras gives the reason: heavy rain.' },
  { id: 'b1-derivation-01', level: 'B1', skill: 'derivation', type: 'choice', prompt: 'In “Pemerintah melakukan pembangunan jalan”, pembangunan most closely means…', options: ['the act/process of building', 'to build! (command)', 'already built by someone'], answer: 0, points: 1, explanation: 'Pembangunan is a noun referring to development or construction.' },
  { id: 'b1-write-02', level: 'B1', skill: 'production', type: 'open', prompt: 'Explain a small problem you solved. Use connected sentences and make the sequence of actions clear.', rubric: ['task-completion', 'cohesion', 'grammar-in-context', 'lexical-appropriacy'], points: 5 },
  { id: 'b1-connectors-01', level: 'B1', skill: 'reading', type: 'choice', prompt: 'En «Meskipun hujan, mereka tetap pergi», ¿qué significa «meskipun»?', options: ['Aunque', 'Sin embargo', 'Por lo tanto'], answer: 0, points: 1, explanation: 'Meskipun introduce una relación de concesión: aunque llueva, la acción continúa.' },
  { id: 'b1-report-01', level: 'B1', skill: 'reading', type: 'choice', prompt: 'Lee: «Menurut laporan itu, jumlah pengunjung meningkat». ¿Qué indica «meningkat»?', options: ['Que el número aumenta', 'Que el número disminuye', 'Que el informe se publicó'], answer: 0, points: 1, explanation: 'Meningkat describe un aumento.' },
  { id: 'b1-process-01', level: 'B1', skill: 'voice', type: 'choice', prompt: 'En «Data diproses oleh komputer», ¿qué recibe la acción?', options: ['Los datos', 'La computadora', 'El proceso'], answer: 0, points: 1, explanation: 'Data es el elemento procesado; oleh komputer identifica al agente.' },
  { id: 'b1-opinion-01', level: 'B1', skill: 'reading', type: 'choice', prompt: '¿Qué significa «pendapat» en una conversación sobre propuestas?', options: ['Opinión', 'Precio', 'Horario'], answer: 0, points: 1, explanation: 'Pendapat se refiere a una opinión o punto de vista.' },
  { id: 'b1-formal-01', level: 'B1', skill: 'register', type: 'choice', prompt: '¿Qué tono aporta «mohon» a una petición?', options: ['Cortés o formal', 'Enfadado', 'Informal y familiar'], answer: 0, points: 1, explanation: 'Mohon se usa en peticiones corteses o formales.' },
  { id: 'b1-interaction-01', level: 'B1', skill: 'interaction', type: 'choice', prompt: '¿Qué expresión sirve para pedir que repitan algo?', options: ['Maaf, bisa diulangi?', 'Saya setuju.', 'Selamat malam.'], answer: 0, points: 1, explanation: 'Bisa diulangi? pide una repetición para aclarar el mensaje.' },
  { id: 'b1-speaking-01', level: 'B1', skill: 'interaction', type: 'speak', prompt: 'Responde oralmente a una propuesta: pide una aclaración si hace falta, expresa tu postura y propone una alternativa.', rubric: ['interaction', 'clarity', 'repair-strategy', 'lexical-appropriacy'], points: 5 },
  { id: 'b1-integrated-01', level: 'B1', skill: 'production', type: 'open', prompt: 'Resume una experiencia o un texto breve en un párrafo conectado. Explica el propósito, presenta una idea principal y termina con una conclusión.', rubric: ['task-completion', 'cohesion', 'reference', 'grammar-in-context'], points: 5 },
  { id: 'b1-listening-01', level: 'B1', skill: 'comprehension', type: 'listen', prompt: 'Escucha la frase y escribe qué condición se menciona.', audioText: 'Meskipun hujan deras, kegiatan tetap berlangsung.', answer: 'Hujan deras', points: 1, explanation: 'Hujan deras indica la condición: lluvia intensa.' },
  { id: 'b1-reading-main-01', level: 'B1', skill: 'reading', type: 'choice', readingText: 'Selama tiga bulan terakhir, sebuah kelompok warga di Bandung mengadakan program membaca di taman kota. Setiap Sabtu pagi, para relawan membawa buku anak-anak dan menyediakan waktu untuk membaca bersama. Menurut laporan panitia, jumlah peserta meningkat dari dua puluh orang pada bulan pertama menjadi empat puluh orang pada bulan ketiga. Meskipun cuaca kadang-kadang tidak mendukung, kegiatan tetap berlangsung karena warga dapat menggunakan aula kecil di dekat taman. Panitia berencana mengadakan pelatihan bagi relawan baru agar kegiatan dapat berjalan lebih teratur.', prompt: 'Lee el texto y elige la idea principal.', options: ['Un programa de lectura comunitario crece y se adapta a las condiciones del tiempo.', 'Los residentes quieren cerrar el parque de Bandung.', 'Los voluntarios solo llevan libros para adultos.'], answer: 0, points: 1, explanation: 'El texto describe el crecimiento del programa y cómo se mantiene cuando el clima no ayuda.' },
  { id: 'b1-reading-detail-01', level: 'B1', skill: 'reading', type: 'choice', readingText: 'Selama tiga bulan terakhir, sebuah kelompok warga di Bandung mengadakan program membaca di taman kota. Setiap Sabtu pagi, para relawan membawa buku anak-anak dan menyediakan waktu untuk membaca bersama. Menurut laporan panitia, jumlah peserta meningkat dari dua puluh orang pada bulan pertama menjadi empat puluh orang pada bulan ketiga. Meskipun cuaca kadang-kadang tidak mendukung, kegiatan tetap berlangsung karena warga dapat menggunakan aula kecil di dekat taman. Panitia berencana mengadakan pelatihan bagi relawan baru agar kegiatan dapat berjalan lebih teratur.', prompt: 'Según el texto, ¿cuántas personas participaron en el tercer mes?', options: ['Veinte', 'Treinta', 'Cuarenta'], answer: 2, points: 1, explanation: 'El informe indica que los participantes pasaron de veinte a cuarenta.' },
  { id: 'b1-reading-inference-01', level: 'B1', skill: 'reading', type: 'choice', readingText: 'Selama tiga bulan terakhir, sebuah kelompok warga di Bandung mengadakan program membaca di taman kota. Setiap Sabtu pagi, para relawan membawa buku anak-anak dan menyediakan waktu untuk membaca bersama. Menurut laporan panitia, jumlah peserta meningkat dari dua puluh orang pada bulan pertama menjadi empat puluh orang pada bulan ketiga. Meskipun cuaca kadang-kadang tidak mendukung, kegiatan tetap berlangsung karena warga dapat menggunakan aula kecil di dekat taman. Panitia berencana mengadakan pelatihan bagi relawan baru agar kegiatan dapat berjalan lebih teratur.', prompt: '¿Por qué se menciona el aula pequeña cerca del parque?', options: ['Porque permite continuar la actividad cuando el clima no acompaña.', 'Porque allí se venden los libros.', 'Porque reemplaza a los voluntarios.'], answer: 0, points: 1, explanation: 'El aula ofrece un lugar alternativo para mantener la actividad con mal tiempo.' },
  { id: 'b2-reference-01', level: 'B2', skill: 'reference', type: 'choice', prompt: 'In “Rapat itu berlangsung dua jam. Kegiatan tersebut membahas anggaran”, what does kegiatan tersebut refer to?', options: ['The meeting mentioned earlier', 'The budget itself', 'Two hours in general'], answer: 0, points: 1, explanation: 'Tersebut refers back to the previously mentioned meeting/activity.' },
  { id: 'b2-kan-i-01', level: 'B2', skill: 'kanI', type: 'choice', prompt: 'Which sentence uses -i naturally to describe repeated action directed at a place?', options: ['Petugas mengunjungi beberapa desa.', 'Petugas desa mengunjungi.', 'Desa mengunjungi petugas beberapa.'], answer: 0, points: 1, explanation: 'Mengunjungi is a natural verb meaning to visit a place; affix choice depends on the verb and context.' },
  { id: 'b2-write-02', level: 'B2', skill: 'production', type: 'open', prompt: 'Write a short formal recommendation, give two reasons, and use clear references to the proposal you discuss.', rubric: ['task-completion', 'cohesion', 'register', 'grammar-and-lexis'], points: 5 },

  // Coverage expansion for A1 units 18–23. Written-choice items only;
  // they do not claim to assess listening or spontaneous speaking.
  { id: 'a1-u18-01', level: 'A1', skill: 'grammar', type: 'choice', unit: 'a1_u18', objective: 'Reconocer que ini/itu siguen al sustantivo cuando funcionan como demostrativos.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Cómo se dice «este libro» usando el demostrativo después del sustantivo?', options: ['Ini buku', 'Buku ini', 'Buku sini'], answer: 1, points: 1, explanation: 'En buku ini, el demostrativo ini aparece después del sustantivo.' },
  { id: 'a1-u18-02', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u18', objective: 'Distinguir kita, que incluye a la persona que escucha, de kami.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Si quieres decir «nosotros, incluyéndote a ti», ¿qué pronombre eliges?', options: ['Kami', 'Mereka', 'Kita'], answer: 2, points: 1, explanation: 'Kita incluye a quien escucha; kami lo excluye.' },
  { id: 'a1-u19-01', level: 'A1', skill: 'interaction', type: 'choice', unit: 'a1_u19', objective: 'Reconocer una petición sencilla de comida en un restaurante.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'En un restaurante, ¿qué frase significa «Pido arroz frito»?', options: ['Saya pesan nasi goreng.', 'Saya di nasi goreng.', 'Nasi goreng saya tidur.'], answer: 0, points: 1, explanation: 'Saya pesan nasi goreng expresa que pides arroz frito.' },
  { id: 'a1-u19-02', level: 'A1', skill: 'interaction', type: 'choice', unit: 'a1_u19', objective: 'Identificar una petición sencilla de la cuenta.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué frase usarías para pedir la cuenta?', options: ['Saya minta tagihan.', 'Saya makan tagihan.', 'Tagihan saya enak.'], answer: 0, points: 1, explanation: 'Saya minta tagihan significa «Pido la cuenta».' },
  { id: 'a1-u20-01', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u20', objective: 'Distinguir los adjetivos murah y mahal en contexto.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Si algo cuesta poco y es barato, ¿qué palabra lo describe?', options: ['Mahal', 'Murah', 'Kantong'], answer: 1, points: 1, explanation: 'Murah significa barato/a; mahal significa caro/a.' },
  { id: 'a1-u20-02', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u20', objective: 'Interpretar una frase de compra con cantidad.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué quiere comprar la persona en «Saya mau satu kilo apel»?', options: ['Una bolsa de plátanos', 'Un kilo de manzanas', 'Una tienda'], answer: 1, points: 1, explanation: 'Satu kilo apel significa un kilo de manzanas.' },
  { id: 'a1-u21-01', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u21', objective: 'Comprender una expresión sencilla de dolor.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Si alguien dice «Saya sakit kepala», ¿qué le ocurre?', options: ['Tiene dolor de cabeza', 'Tiene hambre', 'Está en el mercado'], answer: 0, points: 1, explanation: 'Sakit kepala expresa dolor de cabeza.' },
  { id: 'a1-u21-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u21', objective: 'Reconocer la palabra dokter en una situación cotidiana.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿A quién indica la palabra «dokter»?', options: ['A un medicamento', 'A un médico o una médica', 'A una parte del cuerpo'], answer: 1, points: 1, explanation: 'Dokter significa médico/a.' },
  { id: 'a1-u22-01', level: 'A1', skill: 'grammar', type: 'choice', unit: 'a1_u22', objective: 'Reconocer el orden sustantivo + color.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué expresión significa «chaqueta roja»?', options: ['Merah jaket', 'Jaket merah', 'Jaket biru'], answer: 1, points: 1, explanation: 'En esta expresión, el color aparece después del sustantivo: jaket merah.' },
  { id: 'a1-u22-02', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u22', objective: 'Interpretar una frase sencilla sobre ropa y color.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Saya pakai kaus putih»?', options: ['Llevo una camiseta blanca', 'Compro una chaqueta roja', 'Llevo zapatos negros'], answer: 0, points: 1, explanation: 'Saya pakai significa «llevo puesto/uso»; kaus putih es camiseta blanca.' },
  { id: 'a1-u23-01', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u23', objective: 'Comprender una frase de existencia con ada.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué indica «Di dapur ada kulkas»?', options: ['En la cocina hay una nevera', 'La nevera está en el mercado', 'La cocina está limpia'], answer: 0, points: 1, explanation: 'Di dapur sitúa la frase en la cocina y ada kulkas indica que hay una nevera.' },
  { id: 'a1-u23-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u23', objective: 'Distinguir los adjetivos bersih y kotor.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Si una habitación está limpia, ¿qué palabra la describe?', options: ['Kotor', 'Bersih', 'Dinding'], answer: 1, points: 1, explanation: 'Bersih significa limpio/a; kotor significa sucio/a.' },
  { id: 'a1-u24-01', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u24', objective: 'Comprender una frase sencilla sobre una actividad de estudio.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué hace la persona en «Saya membaca buku»?', options: ["Lee un libro","Escribe una tarea","Borra la pizarra"], answer: 0, points: 1, explanation: 'Membaca buku significa leer un libro.' },
  { id: 'a1-u24-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u24', objective: 'Reconocer el vocabulario escolar guru.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «guru»?', options: ["Alumno/a","Profesor/a o docente","Lápiz"], answer: 1, points: 1, explanation: 'Guru significa profesor/a o docente.' },
  { id: 'a1-u25-01', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u25', objective: 'Reconocer el vocabulario de aficiones hobi.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «hobi»?', options: ["Afición o pasatiempo","Fin de semana","Música"], answer: 0, points: 1, explanation: 'Hobi significa afición o pasatiempo.' },
  { id: 'a1-u25-02', level: 'A1', skill: 'interaction', type: 'choice', unit: 'a1_u25', objective: 'Expresar que una actividad gusta usando suka + verbo.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Saya suka berenang»?', options: ["Me gusta nadar","Quiero comprar pescado","Estoy aprendiendo a escribir"], answer: 0, points: 1, explanation: 'Saya suka berenang significa «Me gusta nadar».' },
  { id: 'a1-u26-01', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u26', objective: 'Reconocer una indicación de dirección belok kiri.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «belok kiri»?', options: ["Sigue recto","Gira a la derecha","Gira a la izquierda"], answer: 2, points: 1, explanation: 'Belok kiri significa «Gira a la izquierda».' },
  { id: 'a1-u26-02', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u26', objective: 'Interpretar una indicación breve para llegar a un lugar.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Vas caminando y lees «Jalan lurus». ¿Qué debes hacer?', options: ["Girar a la izquierda","Seguir recto","Volver al hotel"], answer: 1, points: 1, explanation: 'Jalan lurus es la indicación «Sigue recto».' },
  { id: 'a1-u27-01', level: 'A1', skill: 'interaction', type: 'choice', unit: 'a1_u27', objective: 'Reconocer una invitación sencilla con ayo.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué propone alguien al decir «Ayo makan!»?', options: ["¡Vamos a comer!","¡Vamos a dormir!","¡Vamos a estudiar!"], answer: 0, points: 1, explanation: 'Ayo introduce una invitación o propuesta; makan significa comer.' },
  { id: 'a1-u27-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u27', objective: 'Reconocer una expresión temporal lusa.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Si algo ocurrirá «lusa», ¿cuándo ocurrirá?', options: ["Ayer","Pasado mañana","Esta noche"], answer: 1, points: 1, explanation: 'Lusa significa pasado mañana.' },
  { id: 'a1-u28-01', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u28', objective: 'Comprender una frase sencilla sobre destino de viaje.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Adónde va la persona en «Saya pergi ke bandara»?', options: ["Al aeropuerto","Al hotel","Al mercado"], answer: 0, points: 1, explanation: 'Pergi ke bandara significa ir al aeropuerto.' },
  { id: 'a1-u28-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u28', objective: 'Reconocer el vocabulario de viaje paspor.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «paspor»?', options: ["Billete","Maleta","Pasaporte"], answer: 2, points: 1, explanation: 'Paspor significa pasaporte.' },
  { id: 'a1-u29-01', level: 'A1', skill: 'grammar', type: 'choice', unit: 'a1_u29', objective: 'Interpretar una frase de hábito con selalu.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Saya selalu belajar»?', options: ["A veces estudio","Siempre estudio","Rara vez estudio"], answer: 1, points: 1, explanation: 'Selalu significa siempre; Saya selalu belajar es «Siempre estudio».' },
  { id: 'a1-u29-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u29', objective: 'Reconocer el adverbio de frecuencia kadang-kadang.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «kadang-kadang»?', options: ["Siempre","Nunca","A veces"], answer: 2, points: 1, explanation: 'Kadang-kadang significa a veces.' },
  { id: 'a1-u30-01', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u30', objective: 'Reconocer una expresión cortés para pedir paso.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Permisi, boleh lewat?»?', options: ["Con permiso, ¿puedo pasar?","Perdón, no entiendo","Gracias, hasta luego"], answer: 0, points: 1, explanation: 'Permisi se usa para pedir paso o llamar la atención con cortesía.' },
  { id: 'a1-u30-02', level: 'A1', skill: 'interaction', type: 'choice', unit: 'a1_u30', objective: 'Pedir que alguien repita algo usando tolong ulangi.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: 'Si no has oído bien, ¿qué frase puedes usar para pedir que repitan?', options: ["Saya selalu belajar.","Tolong ulangi.","Sampai jumpa."], answer: 1, points: 1, explanation: 'Tolong ulangi significa «Por favor, repítalo».' },
  { id: 'a1-u31-01', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u31', objective: 'Comprender una descripción física sencilla.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Dia tinggi»?', options: ["Es joven","Es amable","Él/ella es alto/a"], answer: 2, points: 1, explanation: 'Tinggi significa alto/a; dia puede referirse a él o ella.' },
  { id: 'a1-u31-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u31', objective: 'Reconocer el adjetivo ramah en una descripción.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «ramah»?', options: ["Amable o simpático/a","Alto/a","Cansado/a"], answer: 0, points: 1, explanation: 'Ramah significa amable o simpático/a.' },
  { id: 'a1-u32-01', level: 'A1', skill: 'interaction', type: 'choice', unit: 'a1_u32', objective: 'Elegir un saludo para preguntar cómo está otra persona.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué expresión usarías para preguntar «¿Qué tal?»?', options: ["Sama-sama","Apa kabar?","Sampai jumpa"], answer: 1, points: 1, explanation: 'Apa kabar? es una pregunta común para saber cómo está alguien.' },
  { id: 'a1-u32-02', level: 'A1', skill: 'vocabulary', type: 'choice', unit: 'a1_u32', objective: 'Reconocer una respuesta habitual al agradecimiento.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Sama-sama»?', options: ["De nada","Ten cuidado","Bienvenido/a"], answer: 0, points: 1, explanation: 'Sama-sama es una respuesta habitual a terima kasih (gracias).' },

  { id: 'a1-u08-01', level: 'A1', skill: 'comprehension', type: 'choice', unit: 'a1_u8', objective: 'Comprender una frase sobre la frecuencia de una actividad cotidiana.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Qué significa «Saya belajar setiap hari»?', options: ['Estudio todos los días', 'Hoy estudio', 'Mañana trabajo'], answer: 0, points: 1, explanation: 'Setiap hari significa todos los días; belajar significa estudiar o aprender.' },
  { id: 'a1-u08-02', level: 'A1', skill: 'grammar', type: 'choice', unit: 'a1_u8', objective: 'Interpretar una frase con un adverbio temporal al inicio.', modality: 'written-choice', reviewStatus: 'pilot-unreviewed', prompt: '¿Cuándo trabaja la persona en «Besok saya bekerja»?', options: ['Ayer', 'Mañana', 'Todos los días'], answer: 1, points: 1, explanation: 'Besok significa mañana; saya bekerja significa trabajo.' },
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
    } else if (item.type === 'listen') {
      const normalize = value => String(value || '').toLocaleLowerCase('id-ID')
        .normalize('NFD').replace(/\p{M}/gu, '')
        .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
      if (typeof submitted !== 'string' || !submitted.trim()) {
        status = 'unanswered';
      } else if (normalize(submitted) === normalize(item.answer)) {
        points = item.points;
        status = 'correct';
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
