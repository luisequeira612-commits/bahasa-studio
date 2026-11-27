(function(root){
'use strict';
const mc=(word,prompt,options)=>({vocabId:word.id,type:'mc',prompt,options,answer:0,explanation:'Actividad de repaso; el vocabulario ya fue introducido.'});
const order=(word,prompt,sentence)=>{const words=sentence.split(' ');return {vocabId:word.id,type:'order',prompt,words,correctOrder:words.slice(),explanation:'Construye una frase con vocabulario conocido.'};};
const refs=[
{id:'en_a1_u13_v01',target:'wake up',esp:'despertarse'},
{id:'en_a1_u15_v01',target:'always',esp:'siempre'},
{id:'en_a1_u17_v01',target:'Monday',esp:'lunes'},
{id:'en_a1_u18_v01',target:'swim',esp:'nadar'},
{id:'en_a1_u19_v02',target:'music',esp:'música'},
{id:'en_a1_u20_v01',target:'want',esp:'querer'},
{id:'en_a1_u22_v01',target:'talk',esp:'hablar / conversar'},
{id:'en_a1_u23_v01',target:'shirt',esp:'camisa'},
{id:'en_a1_u24_v01',target:'street',esp:'calle'},
{id:'en_a1_u25_v01',target:'turn',esp:'girar / doblar'},
{id:'en_a1_u26_v02',target:'price',esp:'precio'},
{id:'en_a1_u27_v01',target:'bread',esp:'pan'},
{id:'en_a1_u29_v01',target:'menu',esp:'menú / carta'},
{id:'en_a1_u29_v04',target:'bill',esp:'cuenta'},
{id:'en_a1_u29_v22',target:'delicious',esp:'delicioso / deliciosa'},
{id:'en_a1_u7_v01',target:'this',esp:'este / esta / esto'},
{id:'en_a1_u8_v02',target:'red',esp:'rojo / roja'},
{id:'en_a1_u9_v01',target:'my',esp:'mi / mis'},
{id:'en_a1_u10_v01',target:'mother',esp:'madre'},
{id:'en_a1_u12_v01',target:'house',esp:'casa'},
{id:'en_a1_u13_v20',target:'early',esp:'temprano'},
{id:'en_a1_u1_v18',target:'listen',esp:'escuchar'},
{id:'en_a1_u25_v02',target:'left',esp:'izquierda'},
{id:'en_a1_u28_v01',target:'much',esp:'mucho / mucha'},
{id:'en_a1_u29_v08',target:'soup',esp:'sopa'},
{id:'en_a1_u25_v03',target:'right',esp:'derecha'}
];
const makeReview=(number,title,desc,grammar,trapTitle,trapDetail,specs,bankModels,bankPrompts)=>{
 const lessons=specs.map(spec=>{
  const chosen=spec[3].map(i=>refs[i]);
  return {title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:[],reviewVocabIds:chosen.map(w=>w.id),exercises:[
   mc(chosen[0],'Repasa «'+chosen[0].target+'».',[chosen[0].esp,chosen[1].esp,chosen[2].esp]),
   order(chosen[1],'Ordena la frase.',spec[4])
  ]};
 });
 const exercises=[];
 for(let i=0;i<5;i++)exercises.push(mc(refs[i],bankPrompts[i],[refs[i].esp,refs[(i+5)%refs.length].esp,refs[(i+10)%refs.length].esp]));
 for(let i=0;i<5;i++)exercises.push(order(refs[5+i],'Ordena la frase.',bankModels[i]));
 return {unitNumber:number,id:'en_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab:[],lessons,exercises};
};
const u31=makeReview(31,'Conversaciones cotidianas','Integra rutinas, preferencias, habilidades, direcciones, compras y situaciones en un restaurante.','Recupera estructuras de A1: presente simple, presente continuo, can, like/want, preguntas, imperativos y expresiones funcionales.','Elegir la estructura según la intención','Distingue hábitos (I work), acciones actuales (I am working), capacidad (I can work) y deseos (I want to work).',[
['Lección 1: Hablar de la rutina','Combina rutinas y expresiones de frecuencia y tiempo.','Presente simple para hábitos; adverbios de frecuencia antes del verbo principal.',[0,1,2,20],'I always wake up early.'],
['Lección 2: Gustos y planes','Habla de gustos, música y planes sencillos.','Like + sustantivo/-ing; want + to-infinitive.',[4,5,6,21],'I want to listen to music.'],
['Lección 3: Conversaciones en la ciudad','Pregunta por calles y da indicaciones.','WH + do/does para preguntas; imperativos para instrucciones.',[8,9,10,22],'Turn left at the street.'],
['Lección 4: Compras y alimentos','Pregunta precios y habla de alimentos.','How much para precio e incontables; some/any según el tipo de oración.',[10,11,23,13],'How much is the bread?'],
['Lección 5: En el restaurante','Lee el menú, pide y comenta la comida.','I’d like… para pedir; be + adjetivo para describir la comida.',[12,13,14,24],'The soup is delicious.']
],['I want music.','She is talking now.','The shirt is red.','The street is near the house.','Turn left at the street.'],[
'¿Qué significa «wake up»?','¿Qué significa «always»?','¿Qué significa «Monday»?','¿Qué significa «swim»?','¿Qué significa «music»?'
]);
const u32=makeReview(32,'Evaluación final A1','Comprueba de forma integrada la comprensión de estructuras y vocabulario del nivel A1. Incluye lectura breve, selección de respuestas y construcción guiada de frases.','Repasa be, artículos, demostrativos, posesivos, presente simple y continuo, do/does, can, want to, cantidades, ubicación y peticiones funcionales.','Evaluación limitada a los tipos existentes','El motor actual solo admite mc y order en este contrato. Esta unidad evalúa selección y construcción guiada; no registra audio ni califica respuestas orales o textos libres. La práctica de escucha y expresión oral/escrita abierta queda como actividad externa no puntuable.',[
['Lección 1: Comprensión de lectura','Interpreta información sencilla en un contexto cotidiano.','Lee el texto y localiza quién, dónde y cuándo; usa presente simple para hábitos.',[15,16,17,18,8],'My mother is at home.'],
['Lección 2: Gramática integrada','Distingue demostrativos, posesivos y presente simple.','Comprueba concordancia, artículos y orden básico de palabras.',[15,16,17,7],'This is my red shirt.'],
['Lección 3: Acciones y habilidades','Reconoce acciones actuales y capacidades.','Presente continuo = be + -ing; can + verbo base.',[0,3,6,7],'She is talking now.'],
['Lección 4: Situaciones prácticas','Resuelve situaciones de compras, ciudad y restaurante.','Usa preguntas de precio, imperativos y expresiones corteses.',[8,9,25,11],'Turn right at the street.'],
['Lección 5: Construcción de mensajes','Construye frases breves con vocabulario conocido.','Integra estructuras A1 sin introducir vocabulario nuevo.',[5,11,14,19],'I want bread.']
],['I want bread.','She is talking now.','He is wearing a shirt.','The street is near the house.','Turn right at the street.'],[
'Lee: «My mother is at home. The house is near the street.» ¿Dónde está la madre?',
'¿Qué significa «red»?','¿Qué significa «talk»?','¿Qué significa «street»?','¿Qué significa «menu»?'
]);
u32.exercises[0].options=['En casa','En la escuela','En la tienda'];
u32.exercises[0].explanation='El texto dice que la madre está en casa.';
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS.en=root.GUARDI_CURRICULUM_BLOCKS.en||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1=root.GUARDI_CURRICULUM_BLOCKS.en.A1||{};
root.GUARDI_CURRICULUM_BLOCKS.en.A1['31-32']={units:[u31,u32]};
})(typeof window!=='undefined'?window:globalThis);
