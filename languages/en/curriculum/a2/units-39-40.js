(function(root){
'use strict';
const mk=(n,rows)=>rows.map((r,i)=>({id:'en_a2_u'+n+'_v'+String(i+1).padStart(2,'0'),target:r[0],esp:r[1],ex:r[2],exEsp:r[3],verification:{status:'not_checked',sources:[]}}));
const mc=(w,p,o)=>({vocabId:w.id,type:'mc',prompt:p,options:o,answer:0,explanation:'Selecciona el significado correcto.'});
const order=(w,s)=>{const words=s.split(' ');return {vocabId:w.id,type:'order',prompt:'Ordena la frase.',words,correctOrder:words.slice(),explanation:'Ordena la frase y observa la estructura.'};};
const makeUnit=d=>{const words=mk(d.n,d.rows);const lessons=d.lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:[],exercises:[mc(words[s[3][0]],'¿Qué significa «'+words[s[3][0]].target+'»?',[words[s[3][0]].esp,'otra opción','una opción diferente']),order(words[s[3][1]],s[4])]}));const exercises=[];for(let i=0;i<5;i++)exercises.push(mc(words[i],'Elige la traducción de «'+words[i].target+'»',[words[i].esp,words[(i+7)%22].esp,words[(i+13)%22].esp]));for(let i=0;i<5;i++)exercises.push(order(words[5+i],d.bank[i]));return {unitNumber:d.n,id:'en_a2_u'+d.n,title:'Unidad '+d.n+': '+d.title,desc:d.desc,grammar:d.grammar,trap:{title:d.trap[0],detail:d.trap[1]},vocab:words,lessons,exercises};};
const data=[{n:39,title:'Relaciones sociales y phrasal verbs',desc:'Habla de amistades, invitaciones y planes sociales con phrasal verbs y patrones de gerundio e infinitivo.',grammar:'Algunos verbos van seguidos de gerundio: enjoy doing, look forward to seeing, cannot stand waiting. Otros usan to + infinitivo: decide to meet, hope to see. En los phrasal verbs separables, el pronombre suele ir entre verbo y partícula: cheer her up; turn it down.',trap:['Gerundio después de look forward to','En look forward to, la palabra to es una preposición: usa un sustantivo o verbo en -ing, no el infinitivo.'],rows:[
['get along with','llevarse bien con','I get along with my new neighbors.','Me llevo bien con mis nuevos vecinos.'],
['hang out','pasar el rato','We usually hang out after class.','Normalmente pasamos el rato después de clase.'],
['catch up with','ponerse al día con','I call my cousin to catch up with her.','Llamo a mi prima para ponerme al día con ella.'],
['look forward to','tener ganas de','I look forward to seeing you.','Tengo ganas de verte.'],
['take care of','cuidar de','Can you take care of the plants?','¿Puedes cuidar las plantas?'],
['run into','encontrarse con','I ran into an old friend yesterday.','Me encontré con un viejo amigo ayer.'],
['ask around','preguntar por ahí','Ask around before choosing a class.','Pregunta por ahí antes de elegir una clase.'],
['calm down','calmarse','Take a breath and calm down.','Respira hondo y cálmate.'],
['cheer up','animar','A funny message can cheer her up.','Un mensaje divertido puede animarla.'],
['give up','rendirse','Do not give up when learning feels difficult.','No te rindas cuando aprender parezca difícil.'],
['keep in touch','mantener el contacto','Let us keep in touch after the course.','Mantengamos el contacto después del curso.'],
['make friends','hacer amigos','It is easy to make friends in a club.','Es fácil hacer amigos en un club.'],
['invite over','invitar a casa','I will invite my classmates over on Saturday.','Invitaré a mis compañeros a casa el sábado.'],
['drop by','pasar por','You can drop by after work.','Puedes pasar después del trabajo.'],
['turn down','rechazar','She had to turn down the invitation.','Tuvo que rechazar la invitación.'],
['put off','posponer','Let us not put off the meeting.','No pospongamos la reunión.'],
['carry on','continuar','Please carry on with your story.','Por favor, continúa con tu historia.'],
['end up','terminar','We may end up at the same café.','Puede que terminemos en la misma cafetería.'],
['enjoy doing','disfrutar haciendo','I enjoy doing outdoor activities.','Disfruto haciendo actividades al aire libre.'],
['cannot stand','no soportar','I cannot stand waiting in long lines.','No soporto esperar en filas largas.'],
['decide to','decidir','They decided to meet after class.','Decidieron reunirse después de clase.'],
['hope to','esperar','I hope to see you soon.','Espero verte pronto.']],
lessons:[['Amistades y tiempo libre','Habla de relaciones y actividades con amigos.','Get along with, hang out y catch up with describen relaciones y encuentros.',[0,1,2,3],'We usually hang out after class.'],['Encontrarse y preguntar','Explica cómo encontrar a alguien o pedir información a otras personas.','Run into y ask around son phrasal verbs; calm down expresa tranquilizarse.',[4,5,6,7],'I ran into an old friend yesterday.'],['Ánimo y perseverancia','Anima a otras personas y habla de no abandonar una actividad.','Cheer up y give up son separables; el pronombre va en medio.',[8,9,10,11],'Do not give up when learning feels difficult.'],['Invitaciones y visitas','Invita a alguien y organiza visitas informales.','Invite someone over y drop by describen visitas sociales.',[12,13,14,15],'You can drop by after work.'],['Planes y preferencias','Expresa preferencias y decisiones sobre planes sociales.','Enjoy + -ing; cannot stand + -ing; decide/hope + to infinitive.',[16,17,18,19,20,21],'Let us not put off the meeting.']],
bank:['I ran into an old friend yesterday.','Ask around before choosing a class.','Take a breath and calm down.','A funny message can cheer her up.','Do not give up when learning feels difficult.']},
];
const units=data.map(makeUnit);
const mcReview=(id,target,translation)=>({vocabId:id,type:'mc',prompt:'¿Qué significa «'+target+'»?',options:[translation,'otra opción','una opción diferente'],answer:0,explanation:'Recupera vocabulario de unidades anteriores.'});
const orderReview=(id,s)=>{const words=s.split(' ');return {vocabId:id,type:'order',prompt:'Ordena la frase de repaso.',words,correctOrder:words.slice(),explanation:'Recupera una estructura ya estudiada.'};};
const reviewLessons=[
{title:'Transporte y horarios',objective:'Integra rutas, horarios y transporte.',grammar:'Preposiciones at/on y expresiones para abordar o bajar de un medio de transporte.',ids:[[31,1],[31,2],[31,6],[31,8]],model:'The departure board shows a delay.',target:'departure board',esp:'panel de salidas'},
{title:'Problemas de viaje',objective:'Solicita información y resuelve cambios de vuelo.',grammar:'Preguntas indirectas con orden afirmativo y peticiones corteses.',ids:[[32,1],[32,14],[32,10],[32,20]],model:'My flight has been cancelled.',target:'cancelled flight',esp:'vuelo cancelado'},
{title:'Salud y cuidados',objective:'Describe molestias y cuidados básicos.',grammar:'Have got/has got, should y need to para síntomas y recomendaciones.',ids:[[33,1],[33,14],[33,6],[33,18]],model:'Cover the cut with a gauze pad.',target:'gauze pad',esp:'gasa'},
{title:'Tareas domésticas',objective:'Describe tareas habituales en casa.',grammar:'Phrasal verbs separables y posición del pronombre.',ids:[[34,1],[34,14],[34,6],[34,18]],model:'Take out the trash every evening.',target:'take out the trash',esp:'sacar la basura'},
{title:'Experiencias y relaciones',objective:'Integra experiencias personales y planes sociales.',grammar:'Present perfect ever/never y verbos seguidos de gerundio o infinitivo.',ids:[[36,4],[36,18],[39,4],[39,11]],model:'I have never travelled alone.',target:'travel alone',esp:'viajar solo'}
];
const lessons=reviewLessons.map(l=>({title:l.title,objective:l.objective,grammar:l.grammar,vocabIds:[],reviewVocabIds:l.ids.map(([u,i])=>'en_a2_u'+u+'_v'+String(i).padStart(2,'0')),exercises:[mcReview('en_a2_u'+l.ids[0][0]+'_v'+String(l.ids[0][1]).padStart(2,'0'),l.target,l.esp),orderReview('en_a2_u'+l.ids[1][0]+'_v'+String(l.ids[1][1]).padStart(2,'0'),l.model)]}));
const idOf=([u,i])=>'en_a2_u'+u+'_v'+String(i).padStart(2,'0');const bank=[];for(const l of reviewLessons)bank.push(mcReview(idOf(l.ids[0]),l.target,l.esp));for(const l of reviewLessons)bank.push(orderReview(idOf(l.ids[1]),l.model));
units.push({unitNumber:40,id:'en_a2_u40',title:'Unidad 40: Evaluación final A2',desc:'Comprueba la integración de los contenidos de A2 en situaciones de viaje, salud, tareas domésticas, experiencias y relaciones. No introduce vocabulario nuevo.',grammar:'Recuperación integrada de los contenidos A2: pasado, futuro, modales, present perfect, preguntas indirectas, relativas y phrasal verbs.',trap:{title:'Elegir la estructura según el contexto',detail:'Distingue el pasado simple del present perfect, formula preguntas indirectas y usa phrasal verbs y peticiones corteses en situaciones cotidianas.'},vocab:[],lessons,exercises:bank});
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};root.GUARDI_CURRICULUM_BLOCKS.en.A2=root.GUARDI_CURRICULUM_BLOCKS.en.A2||{};root.GUARDI_CURRICULUM_BLOCKS.en.A2['39-40']={units};
})(typeof window!=='undefined'?window:globalThis);
