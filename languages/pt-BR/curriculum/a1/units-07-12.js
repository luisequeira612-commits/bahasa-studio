(function(root){
'use strict';
const v=(id,target,esp,ex,exEsp)=>({id,target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const mc=(vocabId,prompt,options,answer)=>({vocabId,type:'mc',prompt,options,answer,explanation:'Práctica introductoria; pendiente de cotejo lingüístico.'});
const order=(vocabId,prompt,words,correctOrder)=>({vocabId,type:'order',prompt,words,correctOrder,explanation:'Orden básico de la frase.'});
const write=(vocabId,prompt,modelAnswer)=>({vocabId,type:'order',prompt,words:modelAnswer.replace(/[.!?]/g,'').split(' '),correctOrder:modelAnswer.replace(/[.!?]/g,'').split(' '),explanation:'Construye la frase con las palabras disponibles; el modelo no es la única respuesta posible.'});
const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});

const u4=[
v('ptbr_a1_u4_v01','família','familia','Minha família é grande.','Mi familia es grande.'),
v('ptbr_a1_u4_v02','mãe','madre','Minha mãe mora aqui.','Mi madre vive aquí.'),
v('ptbr_a1_u4_v03','pai','padre','Meu pai trabalha aqui.','Mi padre trabaja aquí.'),
v('ptbr_a1_u4_v04','irmão','hermano','Meu irmão estuda.','Mi hermano estudia.'),
v('ptbr_a1_u4_v05','irmã','hermana','Minha irmã estuda.','Mi hermana estudia.'),
v('ptbr_a1_u4_v06','filho','hijo','Meu filho mora aqui.','Mi hijo vive aquí.'),
v('ptbr_a1_u4_v07','filha','hija','Minha filha está aqui.','Mi hija está aquí.'),
v('ptbr_a1_u4_v08','meu / minha','mi','Meu pai e minha mãe estão aqui.','Mi padre y mi madre están aquí.'),
v('ptbr_a1_u4_v09','seu / sua','tu / su','Sua irmã está aqui.','Tu hermana está aquí.'),
v('ptbr_a1_u4_v10','quem','quién','Quem é ela?','¿Quién es ella?')
];

const u4Lessons=[
lesson('Lección 1: La familia','Reconoce palabras básicas para hablar de la familia.','Família es un sustantivo; mãe, pai, irmão e irmã nombran familiares cercanos.',u4.slice(0,7).map(x=>x.id),[],[
mc(u4[1].id,'¿Qué significa mãe?',['madre','hermana','hija'],0),
mc(u4[2].id,'¿Qué significa pai?',['padre','hijo','hermano'],0)
]),
lesson('Lección 2: Mi y tu','Usa meu/minha y seu/sua con familiares.','Meu y seu acompañan nombres masculinos; minha y sua acompañan nombres femeninos.',[u4[7].id,u4[8].id,u4[1].id,u4[2].id,u4[4].id],[],[
mc(u4[7].id,'Completa: ___ mãe.',['Meu','Minha','Seu'],1),
mc(u4[8].id,'Completa: ___ pai.',['Minha','Sua','Meu'],2)
]),
lesson('Lección 3: Quién es','Pregunta e identifica personas.','Quem significa «quién» y puede aparecer en preguntas como Quem é ela?', [u4[9].id,u4[0].id,u4[1].id,u4[2].id],[],[
mc(u4[9].id,'¿Qué significa quem?',['qué','quién','dónde'],1),
order(u4[9].id,'Ordena: «¿Quién es ella?».',['ela','é','Quem'],['Quem','é','ela'])
]),
lesson('Lección 4: Describir una familia','Combina ser, estar y posesivos para describir una familia.','Ser identifica: minha irmã é brasileira. Estar indica ubicación o estado: minha filha está aqui.',u4.map(x=>x.id),[],[
mc(u4[4].id,'Completa: Minha irmã ___ aqui.',['é','está','sou'],1),
mc(u4[2].id,'Completa: Meu pai ___ brasileiro.',['é','está','sou'],0)
]),
lesson('Lección 5: Repaso familiar','Produce frases sencillas sobre familiares.','Combina vocabulario familiar con meu/minha, seu/sua y las estructuras ya estudiadas.',u4.map(x=>x.id),[],[
write(u4[1].id,'Construye: «Mi madre está aquí».','Minha mãe está aqui.'),
mc(u4[6].id,'¿Qué significa filha?',['hija','hermana','madre'],0)
])
];

const unit4={
unitNumber:4,id:'ptbr_a1_u4',title:'Unidad 4: La familia y los posesivos',
desc:'Habla de familiares cercanos y usa posesivos básicos.',
grammar:'Meu/meu y minha; seu y sua. El posesivo concuerda con el sustantivo: meu pai, minha mãe.',
trap:{title:'Concordancia del posesivo',detail:'Meu acompaña nombres masculinos y minha nombres femeninos; seu y sua siguen la misma distinción.'},
vocab:u4,lessons:u4Lessons,
exercises:[
mc(u4[0].id,'¿Qué significa família?',['familia','hija','padre'],0),
mc(u4[1].id,'¿Qué significa mãe?',['madre','hermana','hija'],0),
mc(u4[2].id,'¿Qué significa pai?',['padre','hijo','hermano'],0),
mc(u4[3].id,'¿Qué significa irmão?',['hermano','padre','hijo'],0),
mc(u4[4].id,'¿Qué significa irmã?',['madre','hermana','hija'],1),
mc(u4[7].id,'Completa: ___ pai.',['Minha','Meu','Sua'],1),
mc(u4[7].id,'Completa: ___ mãe.',['Meu','Minha','Seu'],1),
mc(u4[9].id,'¿Qué significa quem?',['quién','dónde','qué'],0),
order(u4[9].id,'Ordena: «¿Quién es ella?».',['ela','é','Quem'],['Quem','é','ela']),
write(u4[0].id,'Construye una frase con família.','Minha família é grande.')
]
};

const u5=[
v('ptbr_a1_u5_v01','comer','comer','Eu como arroz.','Yo como arroz.'),
v('ptbr_a1_u5_v02','beber','beber','Eu bebo água.','Yo bebo agua.'),
v('ptbr_a1_u5_v03','água','agua','Eu bebo água.','Yo bebo agua.'),
v('ptbr_a1_u5_v04','arroz','arroz','Eu como arroz.','Yo como arroz.'),
v('ptbr_a1_u5_v05','pão','pan','Eu como pão.','Yo como pan.'),
v('ptbr_a1_u5_v06','café','café','Eu bebo café.','Yo bebo café.'),
v('ptbr_a1_u5_v07','leite','leche','Eu bebo leite.','Yo bebo leche.'),
v('ptbr_a1_u5_v08','fruta','fruta','Eu como fruta.','Yo como fruta.'),
v('ptbr_a1_u5_v09','gostar de','gustar de','Eu gosto de café.','Me gusta el café.'),
v('ptbr_a1_u5_v10','não','no / no...','Eu não bebo café.','No bebo café.')
];

const u5Lessons=[
lesson('Lección 1: Comer y beber','Reconoce verbos básicos para alimentos y bebidas.','Comer y beber se usan para hablar de acciones cotidianas: eu como, eu bebo.',u5.slice(0,8).map(x=>x.id),[],[
mc(u5[0].id,'¿Qué significa comer?',['comer','beber','gustar'],0),
mc(u5[1].id,'¿Qué significa beber?',['estudiar','beber','trabajar'],1)
]),
lesson('Lección 2: Alimentos y bebidas','Nombra alimentos y bebidas frecuentes.','Água, arroz, pão, café, leite y fruta forman un primer conjunto de vocabulario cotidiano.',u5.slice(2,8).map(x=>x.id),[],[
mc(u5[2].id,'¿Qué significa água?',['agua','arroz','leche'],0),
mc(u5[4].id,'¿Qué significa pão?',['café','pan','fruta'],1)
]),
lesson('Lección 3: Gustos','Expresa gustos sencillos.','Gosto de significa «me gusta / me gustan»; la preposición de forma parte de la estructura.',[u5[8].id,u5[5].id,u5[7].id],[],[
mc(u5[8].id,'Completa: Eu ___ de café.',['gosto','gosta','gostam'],0),
order(u5[8].id,'Ordena: «Me gusta el café».',['café','de','gosto','Eu'],['Eu','gosto','de','café'])
]),
lesson('Lección 4: Negación básica','Niega una acción o preferencia.','Não aparece normalmente antes del verbo: eu não bebo café.',[u5[9].id,u5[0].id,u5[1].id,u5[5].id],[],[
mc(u5[9].id,'¿Dónde va não?',['antes del verbo','después del verbo siempre','al final siempre'],0),
mc(u5[9].id,'Completa: Eu ___ bebo café.',['não','de','sou'],0)
]),
lesson('Lección 5: Repaso de comida','Combina acciones, alimentos, gustos y negación.','Usa comer, beber, gostar de y não en frases cortas.',u5.map(x=>x.id),[],[
write(u5[8].id,'Construye: «Me gusta el café».','Eu gosto de café.'),
mc(u5[3].id,'¿Qué significa arroz?',['arroz','agua','pan'],0)
])
];

const unit5={
unitNumber:5,id:'ptbr_a1_u5',title:'Unidad 5: Comida, bebida y gustos',
desc:'Habla de alimentos y bebidas y expresa gustos y negación.',
grammar:'Comer: eu como. Beber: eu bebo. Gostar de: eu gosto de. Negación: eu não + verbo.',
trap:{title:'No olvides de con gostar',detail:'La estructura básica es gostar de: Eu gosto de café.'},
vocab:u5,lessons:u5Lessons,
exercises:[
mc(u5[0].id,'¿Qué significa comer?',['comer','beber','gustar'],0),
mc(u5[1].id,'¿Qué significa beber?',['beber','comer','estudiar'],0),
mc(u5[2].id,'¿Qué significa água?',['agua','fruta','pan'],0),
mc(u5[3].id,'¿Qué significa arroz?',['café','arroz','leche'],1),
mc(u5[4].id,'¿Qué significa pão?',['pan','agua','fruta'],0),
mc(u5[8].id,'Completa: Eu ___ de música.',['gosto','gosta','gostam'],0),
mc(u5[8].id,'Completa: Eu gosto ___ café.',['a','de','em'],1),
mc(u5[9].id,'Completa: Eu ___ bebo café.',['não','sou','está'],0),
order(u5[8].id,'Ordena: «Me gusta el café».',['café','de','gosto','Eu'],['Eu','gosto','de','café']),
write(u5[9].id,'Construye una negación con beber y café.','Eu não bebo café.')
]
};

const u6=[
v('ptbr_a1_u6_v01','casa','casa','Minha casa é pequena.','Mi casa es pequeña.'),
v('ptbr_a1_u6_v02','quarto','habitación','Meu quarto é pequeno.','Mi habitación es pequeña.'),
v('ptbr_a1_u6_v03','cozinha','cocina','A cozinha está aqui.','La cocina está aquí.'),
v('ptbr_a1_u6_v04','banheiro','baño','O banheiro está aqui.','El baño está aquí.'),
v('ptbr_a1_u6_v05','grande','grande','Minha casa é grande.','Mi casa es grande.'),
v('ptbr_a1_u6_v06','pequeno / pequena','pequeño / pequeña','Meu quarto é pequeno.','Mi habitación es pequeña.'),
v('ptbr_a1_u6_v07','aqui','aquí','Minha casa está aqui.','Mi casa está aquí.'),
v('ptbr_a1_u6_v08','perto','cerca','A escola está perto.','La escuela está cerca.'),
v('ptbr_a1_u6_v09','longe','lejos','A escola está longe.','La escuela está lejos.'),
v('ptbr_a1_u6_v10','onde','dónde','Onde está o banheiro?','¿Dónde está el baño?')
];

const u6Lessons=[
lesson('Lección 1: La casa','Reconoce lugares básicos de una vivienda.','Casa, quarto, cozinha y banheiro nombran espacios cotidianos.',u6.slice(0,4).map(x=>x.id),[],[
mc(u6[0].id,'¿Qué significa casa?',['casa','cocina','baño'],0),
mc(u6[2].id,'¿Qué significa cozinha?',['habitación','cocina','casa'],1)
]),
lesson('Lección 2: Grande y pequeño','Describe espacios con adjetivos básicos.','Grande y pequeno/pequena deben concordar cuando corresponde: casa pequena, quarto pequeno.',[u6[4].id,u6[5].id,u6[0].id,u6[1].id],[],[
mc(u6[4].id,'¿Qué significa grande?',['grande','pequeño','cerca'],0),
mc(u6[5].id,'Completa: Minha casa é ___.',['pequeno','pequena','pequenos'],1)
]),
lesson('Lección 3: Ubicación','Indica dónde está algo.','Aqui expresa ubicación; estar puede combinarse con aqui: O banheiro está aqui.',[u6[6].id,u6[3].id,u6[0].id],[],[
mc(u6[6].id,'¿Qué significa aqui?',['aquí','lejos','dónde'],0),
order(u6[6].id,'Ordena: «El baño está aquí».',['aqui','está','banheiro','O'],['O','banheiro','está','aqui'])
]),
lesson('Lección 4: Cerca, lejos y dónde','Pregunta por lugares y describe distancia.','Onde pregunta por una ubicación; perto y longe expresan distancia.',[u6[7].id,u6[8].id,u6[9].id],[],[
mc(u6[9].id,'¿Qué significa onde?',['dónde','quién','qué'],0),
mc(u6[7].id,'¿Qué significa perto?',['lejos','cerca','aquí'],1)
]),
lesson('Lección 5: Repaso de la casa','Combina casa, posesivos, adjetivos y ubicación.','Usa meu/minha, grande/pequena y estar para describir espacios.',u6.map(x=>x.id),[],[
write(u6[0].id,'Construye: «Mi casa es pequeña».','Minha casa é pequena.'),
mc(u6[8].id,'Completa: A escola está ___.',['perto','quem','onde'],0)
])
];

const unit6={
unitNumber:6,id:'ptbr_a1_u6',title:'Unidad 6: La casa y las ubicaciones',
desc:'Describe espacios de la casa y pregunta o indica dónde están.',
grammar:'Grande/pequeno concuerdan con el sustantivo. Aqui indica ubicación; onde pregunta por ubicación; perto y longe expresan distancia.',
trap:{title:'Onde no es quem',detail:'Onde significa «dónde» y pregunta por lugares; quem significa «quién» y pregunta por personas.'},
vocab:u6,lessons:u6Lessons,
exercises:[
mc(u6[0].id,'¿Qué significa casa?',['casa','cocina','baño'],0),
mc(u6[1].id,'¿Qué significa quarto?',['cocina','habitación','casa'],1),
mc(u6[2].id,'¿Qué significa cozinha?',['cocina','baño','habitación'],0),
mc(u6[3].id,'¿Qué significa banheiro?',['casa','baño','cocina'],1),
mc(u6[4].id,'¿Qué significa grande?',['pequeño','grande','cerca'],1),
mc(u6[5].id,'Completa: Minha casa é ___.',['pequeno','pequena','pequenos'],1),
mc(u6[9].id,'¿Qué significa onde?',['quién','dónde','aquí'],1),
mc(u6[7].id,'¿Qué significa perto?',['cerca','lejos','grande'],0),
mc(u6[8].id,'¿Qué significa longe?',['aquí','cerca','lejos'],2),
order(u6[6].id,'Ordena: «El baño está aquí».',['aqui','está','banheiro','O'],['O','banheiro','está','aqui'])
]
};

root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1['07-12']={units:[unit4,unit5,unit6]};
})(typeof window!=='undefined'?window:globalThis);
