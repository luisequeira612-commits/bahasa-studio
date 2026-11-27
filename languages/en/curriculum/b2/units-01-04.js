(function(root){
'use strict';
const vocab=[
["have a track record","tener una trayectoria demostrable","The team has a track record of delivering projects on time.","El equipo tiene una trayectoria demostrable de entregar proyectos a tiempo."],
["ongoing","en curso","The investigation is still ongoing.","La investigación sigue en curso."],
["to date","hasta la fecha","To date, we have received more than 200 applications.","Hasta la fecha, hemos recibido más de 200 solicitudes."],
["so far","hasta ahora","So far, the results have been encouraging.","Hasta ahora, los resultados han sido alentadores."],
["recently","recientemente","She has recently taken on a leadership role.","Ella ha asumido recientemente un puesto de liderazgo."],
["lately","últimamente","I've been sleeping poorly lately.","Últimamente he estado durmiendo mal."],
["over the past decade","durante la última década","Over the past decade, the city has changed considerably.","Durante la última década, la ciudad ha cambiado considerablemente."],
["since then","desde entonces","He joined the company in 2020 and has led the team since then.","Se incorporó a la empresa en 2020 y ha dirigido el equipo desde entonces."],
["as of now","hasta el momento","As of now, no major issues have emerged.","Hasta el momento no han surgido problemas importantes."],
["to undergo","someterse a / experimentar","The building has undergone extensive renovations.","El edificio ha experimentado amplias renovaciones."],
["to evolve","evolucionar","Our approach has evolved over time.","Nuestro enfoque ha evolucionado con el tiempo."],
["to expand","ampliarse / expandir","The company has expanded into three new markets.","La empresa se ha expandido a tres mercados nuevos."],
["to address","abordar","We have addressed the main concerns.","Hemos abordado las principales preocupaciones."],
["to achieve","lograr","The project has achieved most of its goals.","El proyecto ha logrado la mayoría de sus objetivos."],
["to fall behind","quedarse rezagado","We have fallen behind schedule this month.","Nos hemos retrasado este mes."],
["to make progress","progresar","The researchers have been making steady progress.","Los investigadores han estado progresando de forma constante."],
["to work toward","trabajar para conseguir","They have been working toward a solution for months.","Llevan meses trabajando para conseguir una solución."],
["to remain","seguir / permanecer","The issue has remained unresolved.","El problema sigue sin resolverse."],
["to experience","experimentar","The region has experienced rapid growth.","La región ha experimentado un crecimiento rápido."],
["to demonstrate","demostrar","The latest figures have demonstrated a clear improvement.","Las últimas cifras han demostrado una mejora clara."]
].map((r,i)=>({id:"en_b2_u1_v"+String(i+1).padStart(2,"0"),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:"not_checked",sources:[]}}));
const lessons=[
{title:"Resultados y experiencias acumuladas",objective:"Distingue experiencias y resultados conectados con el presente de hechos situados en un pasado terminado.",grammar:"Present perfect simple: have/has + past participle. Úsalo para experiencias sin fecha concreta y resultados relevantes ahora. Con un momento pasado terminado, usa past simple.",ids:[0,1,2,3],sentences:["The team has addressed the main concerns.","So far, the results have been encouraging."]},
{title:"Duración y actividad reciente",objective:"Explica cuánto tiempo lleva desarrollándose una actividad y qué evidencia deja en el presente.",grammar:"Present perfect continuous: have/has been + -ing. Destaca duración o actividad repetida; el simple suele destacar resultado, cantidad o estado.",ids:[4,5,6,7],sentences:["I've been sleeping poorly lately.","Researchers have been making steady progress."]},
{title:"Cambios y evolución",objective:"Describe procesos de cambio que comenzaron antes y siguen siendo relevantes.",grammar:"El present perfect simple suele presentar el cambio como hecho o resultado; el continuous enfoca el proceso. Since marca el inicio; over the past decade indica un periodo que llega al presente.",ids:[8,9,10,11],sentences:["The building has undergone extensive renovations.","Our approach has evolved over time."]},
{title:"Logros, objetivos y dificultades",objective:"Comunica avances, objetivos alcanzados y retrasos con precisión.",grammar:"Usa el simple para logros y resultados; el continuous para esfuerzos en desarrollo. No combines present perfect con fechas pasadas cerradas.",ids:[12,13,14,15],sentences:["The project has achieved most of its goals.","We have fallen behind schedule this month."]},
{title:"Síntesis y contraste temporal",objective:"Integra ambas formas al resumir tendencias y situaciones que continúan.",grammar:"Contrasta I have worked here for five years (hecho/estado) con I have been working on this report all morning (actividad). Los verbos de estado suelen preferir el simple.",ids:[16,17,18,19],sentences:["They have been working toward a solution for months.","The region has experienced rapid growth."]}
];
const mc=(w,opts)=>({vocabId:w.id,type:"mc",prompt:"¿Qué significa «"+w.target+"»?",options:opts,answer:0,explanation:"Elige la equivalencia que corresponde al contexto."});
const order=(w,s)=>{const words=s.split(" ");return {vocabId:w.id,type:"order",prompt:"Ordena la frase.",words,correctOrder:words.slice(),explanation:"Reconstruye la frase y observa el uso del tiempo verbal."};};
const lessonData=lessons.map((l,i)=>({title:l.title,objective:l.objective,grammar:l.grammar,vocabIds:l.ids.map(n=>vocab[n].id),reviewVocabIds:[],exercises:[mc(vocab[l.ids[0]],[vocab[l.ids[0]].esp,vocab[(l.ids[0]+5)%20].esp,vocab[(l.ids[0]+9)%20].esp]),order(vocab[l.ids[1]],l.sentences[0])]}));
const exercises=[];
for(let i=0;i<10;i++){const w=vocab[i];exercises.push(i%2===0?mc(w,[w.esp,vocab[(i+6)%20].esp,vocab[(i+12)%20].esp]):order(w,lessons[Math.floor(i/2)].sentences[i%2]));}
const unit={unitNumber:1,id:"en_b2_u1",title:"Unidad 1: Resultados, duración y evolución",desc:"Explica experiencias, resultados y procesos que conectan el pasado con el presente en contextos personales, académicos y profesionales.",grammar:"Contraste avanzado entre present perfect simple y present perfect continuous; uso de for, since, lately, recently, so far y periodos que llegan al presente.",trap:{title:"Resultado frente a actividad",detail:"I have written three reports (resultado/cantidad). I have been writing reports all morning (actividad/duración). No uses present perfect con un momento pasado terminado: I finished it yesterday, no I have finished it yesterday."},vocab:vocab,lessons:lessonData,exercises:exercises};
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2=root.GUARDI_CURRICULUM_BLOCKS.en.B2||{};
root.GUARDI_CURRICULUM_BLOCKS.en.B2["01-04"]={units:[unit]};
})(typeof window!=="undefined"?window:globalThis);
