(function(root){
'use strict';
const v=(id,target,esp,ex,exEsp)=>({id,target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const mc=(vocabId,prompt,options,answer)=>({vocabId,type:'mc',prompt,options,answer,explanation:'Práctica introductoria; pendiente de cotejo lingüístico.'});
const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,vocab,specs)=>{
 const lessons=specs.map(spec=>lesson(spec[0],spec[1],spec[2],spec[3].map(i=>vocab[i].id),spec[4],[
  mc(vocab[spec[3][0]].id,'¿Qué significa '+vocab[spec[3][0]].target+'?',[vocab[spec[3][0]].esp,vocab[(spec[3][0]+3)%10].esp,vocab[(spec[3][0]+6)%10].esp],0),
  mc(vocab[spec[3][1]].id,'¿Qué significa '+vocab[spec[3][1]].target+'?',[vocab[spec[3][1]].esp,vocab[(spec[3][1]+2)%10].esp,vocab[(spec[3][1]+5)%10].esp],0)
 ]));
 return {unitNumber:number,id:'ptbr_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab,lessons,exercises:vocab.map(word=>mc(word.id,'¿Qué significa '+word.target+'?',[word.esp,'otra palabra','otra expresión'],0))};
};
const u19=[
v('ptbr_a1_u19_v01','mês','mes','Este mês é especial.','Este mes es especial.'),
v('ptbr_a1_u19_v02','ano','año','O ano tem doze meses.','El año tiene doce meses.'),
v('ptbr_a1_u19_v03','janeiro','enero','Janeiro é um mês quente.','Enero es un mes caluroso.'),
v('ptbr_a1_u19_v04','fevereiro','febrero','Meu aniversário é em fevereiro.','Mi cumpleaños es en febrero.'),
v('ptbr_a1_u19_v05','março','marzo','Março vem depois de fevereiro.','Marzo viene después de febrero.'),
v('ptbr_a1_u19_v06','abril','abril','Abril vem depois de março.','Abril viene después de marzo.'),
v('ptbr_a1_u19_v07','maio','mayo','Maio vem antes de junho.','Mayo viene antes de junio.'),
v('ptbr_a1_u19_v08','junho','junio','Junho é um mês do ano.','Junio es un mes del año.'),
v('ptbr_a1_u19_v09','aniversário','cumpleaños','Hoje é meu aniversário.','Hoy es mi cumpleaños.'),
v('ptbr_a1_u19_v10','data','fecha','Qual é a data de hoje?','¿Cuál es la fecha de hoy?')
];
const u20=[
v('ptbr_a1_u20_v01','restaurante','restaurante','O restaurante está aberto.','El restaurante está abierto.'),
v('ptbr_a1_u20_v02','cardápio','menú','O cardápio está na mesa.','El menú está en la mesa.'),
v('ptbr_a1_u20_v03','mesa','mesa','Uma mesa para duas pessoas, por favor.','Una mesa para dos personas, por favor.'),
v('ptbr_a1_u20_v04','pedir','pedir','Quero pedir água.','Quiero pedir agua.'),
v('ptbr_a1_u20_v05','prato','plato','Este prato é muito bom.','Este plato está muy bueno.'),
v('ptbr_a1_u20_v06','almoço','almuerzo','O almoço está pronto.','El almuerzo está listo.'),
v('ptbr_a1_u20_v07','jantar','cena','O jantar é às oito.','La cena es a las ocho.'),
v('ptbr_a1_u20_v08','garçom / garçonete','camarero / camarera','O garçom trouxe o cardápio.','El camarero trajo el menú.'),
v('ptbr_a1_u20_v09','conta','cuenta','A conta, por favor.','La cuenta, por favor.'),
v('ptbr_a1_u20_v10','sobremesa','postre','Quero uma sobremesa.','Quiero un postre.')
];
const u21=[
v('ptbr_a1_u21_v01','limpar','limpiar','Eu preciso limpar a casa.','Necesito limpiar la casa.'),
v('ptbr_a1_u21_v02','lavar','lavar','Eu vou lavar a roupa.','Voy a lavar la ropa.'),
v('ptbr_a1_u21_v03','cozinhar','cocinar','Ela gosta de cozinhar.','A ella le gusta cocinar.'),
v('ptbr_a1_u21_v04','arrumar','ordenar / arreglar','Vou arrumar a sala.','Voy a ordenar la sala.'),
v('ptbr_a1_u21_v05','ajudar','ayudar','Eu ajudo minha família.','Ayudo a mi familia.'),
v('ptbr_a1_u21_v06','varrer','barrer','Eu vou varrer o chão.','Voy a barrer el suelo.'),
v('ptbr_a1_u21_v07','guardar','guardar','Vou guardar os livros.','Voy a guardar los libros.'),
v('ptbr_a1_u21_v08','organizar','organizar','Nós vamos organizar a cozinha.','Vamos a organizar la cocina.'),
v('ptbr_a1_u21_v09','chão','suelo','O chão está limpo.','El suelo está limpio.'),
v('ptbr_a1_u21_v10','tarefa','tarea','Esta tarefa é fácil.','Esta tarea es fácil.')
];
const unit19=makeUnit(19,'Meses, fechas y cumpleaños','Habla de meses del año, fechas sencillas y cumpleaños.',
'Mês y ano; nombres de meses; em + mes para situar una fecha; meu aniversário y a data de hoje.',
'Em fevereiro, no mês de fevereiro','Para indicar el mes se usa em: em fevereiro. Aniversário significa cumpleaños; data significa fecha.',
u19,[
['Lección 1: Mes y año','Reconoce las palabras para mes y año.','Mês es masculino y ano también: o mês, o ano.',[0,1],[]],
['Lección 2: Primeros meses','Nombra enero y febrero.','Los nombres de los meses se escriben con minúscula en portugués.',[2,3],[]],
['Lección 3: Marzo y abril','Continúa la secuencia de meses.','Março y abril aparecen en expresiones temporales sencillas.',[4,5],[]],
['Lección 4: Mayo y junio','Reconoce otros meses del año.','Se usa em antes del mes: em maio, em junho.',[6,7],[]],
['Lección 5: Fechas y cumpleaños','Habla de una fecha personal.','Meu aniversário y qual é a data? sirven para preguntar y hablar de fechas.',[8,9],['ptbr_a1_u12_v10']]
]);
const unit20=makeUnit(20,'En el restaurante','Pide comida, consulta el menú y solicita la cuenta con cortesía.',
'Restaurante y cardápio; pedir algo; almoço y jantar; expresiones breves de cortesía y solicitud.',
'Pedir y perguntar','Pedir significa solicitar algo. Para solicitar la cuenta se puede decir: A conta, por favor.',
u20,[
['Lección 1: El restaurante y el menú','Reconoce el lugar y el menú.','Restaurante y cardápio son sustantivos masculinos: o restaurante, o cardápio.',[0,1],[]],
['Lección 2: Una mesa, por favor','Solicita una mesa de manera sencilla.','Uma mesa para duas pessoas, por favor es una petición cortés y breve.',[2,7],[]],
['Lección 3: Pedir comida','Usa pedir para solicitar algo.','Quero pedir + sustantivo expresa lo que deseas solicitar.',[3,4],['ptbr_a1_u5_v01']],
['Lección 4: Almuerzo y cena','Distingue dos comidas del día.','Almoço es almuerzo y jantar, como sustantivo, es cena.',[5,6],['ptbr_a1_u7_v05','ptbr_a1_u7_v06']],
['Lección 5: La cuenta y el postre','Solicita la cuenta y reconoce el postre.','A conta, por favor es una fórmula útil para pedir la cuenta.',[8,9],['ptbr_a1_u10_v08']]
]);
const unit21=makeUnit(21,'Tareas domésticas','Habla de tareas sencillas y de ayudar en casa.',
'Verbos de tareas domésticas; precisar de + infinitivo; ir + infinitivo para planes próximos; objetos y lugares como complemento.',
'Arrumar no siempre es arreglar','Arrumar puede significar ordenar o arreglar según el contexto. Lavar a roupa y varrer o chão nombran tareas concretas.',
u21,[
['Lección 1: Limpiar y lavar','Nombra tareas básicas de limpieza.','Limpar y lavar son infinitivos; preciso limpar expresa una necesidad.',[0,1],['ptbr_a1_u18_v10']],
['Lección 2: Cocinar y ordenar','Habla de cocinar y ordenar espacios.','Cozinhar y arrumar pueden aparecer después de gostar de o ir a.',[2,3],['ptbr_a1_u5_v09']],
['Lección 3: Ayudar en casa','Expresa que ayudas a alguien.','Ajudar puede combinarse con una persona o con una tarea.',[4,9],['ptbr_a1_u4_v05']],
['Lección 4: Barrer y guardar','Nombra acciones domésticas concretas.','Varrer o chão y guardar os livros son combinaciones de verbo y complemento.',[5,6],[]],
['Lección 5: Organizar la casa','Combina verbos y objetos de la casa.','Organizar la cozinha y deixar o chão limpo son ejemplos de tareas domésticas.',[7,8],['ptbr_a1_u6_v03']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1['19-21']={units:[unit19,unit20,unit21]};
})(typeof window!=='undefined'?window:globalThis);
