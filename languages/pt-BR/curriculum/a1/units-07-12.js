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


const u7=[
v('ptbr_a1_u7_v01','acordar','despertarse','Eu acordo cedo.','Me despierto temprano.'),
v('ptbr_a1_u7_v02','levantar','levantarse','Eu levanto às sete.','Me levanto a las siete.'),
v('ptbr_a1_u7_v03','tomar banho','ducharse / bañarse','Eu tomo banho de manhã.','Me ducho por la mañana.'),
v('ptbr_a1_u7_v04','manhã','mañana','De manhã eu estudo.','Por la mañana estudio.'),
v('ptbr_a1_u7_v05','tarde','tarde','À tarde eu trabalho.','Por la tarde trabajo.'),
v('ptbr_a1_u7_v06','noite','noche','À noite eu descanso.','Por la noche descanso.'),
v('ptbr_a1_u7_v07','hoje','hoy','Hoje eu estudo.','Hoy estudio.'),
v('ptbr_a1_u7_v08','cedo','temprano','Eu acordo cedo.','Me despierto temprano.'),
v('ptbr_a1_u7_v09','todos os dias','todos los días','Eu estudo todos os dias.','Estudio todos los días.'),
v('ptbr_a1_u7_v10','descansar','descansar','Eu descanso à noite.','Descanso por la noche.')
];

const u7Lessons=[
lesson('Lección 1: La rutina de la mañana','Reconoce acciones básicas de la mañana.','Acordar, levantar y tomar banho describen acciones habituales; con eu aparecen como eu acordo, eu levanto, eu tomo.',u7.slice(0,4).map(x=>x.id),[],[
mc(u7[0].id,'¿Qué significa acordar?',['despertarse','descansar','trabajar'],0),
mc(u7[2].id,'¿Qué significa tomar banho?',['comer','ducharse / bañarse','estudiar'],1)
]),
lesson('Lección 2: Mañana, tarde y noche','Distingue partes básicas del día.','De manhã, à tarde y à noite sitúan acciones en distintos momentos del día.',u7.slice(3,6).map(x=>x.id),[],[
mc(u7[3].id,'¿Qué significa manhã?',['noche','mañana','tarde'],1),
mc(u7[5].id,'Completa: Eu descanso ___ noite.',['de','à','em'],1)
]),
lesson('Lección 3: Hoy y temprano','Habla de cuándo ocurre una acción.','Hoje significa «hoy» y cedo significa «temprano».', [u7[6].id,u7[7].id,u7[0].id],[],[
mc(u7[6].id,'¿Qué significa hoje?',['ayer','hoy','mañana'],1),
mc(u7[7].id,'¿Qué significa cedo?',['tarde','temprano','noche'],1)
]),
lesson('Lección 4: Todos los días','Expresa hábitos cotidianos.','Todos os dias presenta una frecuencia habitual: Eu estudo todos os dias.',[u7[8].id,u7[9].id,u7[6].id],[],[
mc(u7[8].id,'¿Qué significa todos os dias?',['todos los días','esta noche','por la mañana'],0),
order(u7[8].id,'Ordena: «Estudio todos los días».',['todos','os','dias','Eu','estudo'],['Eu','estudo','todos','os','dias'])
]),
lesson('Lección 5: Repaso de la rutina','Combina acciones y momentos del día en frases cortas.','Usa verbos de rutina con expresiones temporales básicas.',u7.map(x=>x.id),[u6[6].id],[ 
write(u7[0].id,'Construye: «Me despierto temprano».','Eu acordo cedo.'),
mc(u7[9].id,'¿Qué significa descansar?',['descansar','levantarse','despertarse'],0)
])
];

const unit7={
unitNumber:7,id:'ptbr_a1_u7',title:'Unidad 7: Rutina diaria y momentos del día',
desc:'Habla de acciones cotidianas y sitúalas en el día.',
grammar:'Acordar, levantar, tomar banho y descansar; de manhã, à tarde, à noite; hoje, cedo y todos os dias.',
trap:{title:'Atenção a à noite',detail:'En la expresión temporal fija se usa à noite: Eu descanso à noite.'},
vocab:u7,lessons:u7Lessons,
exercises:[
mc(u7[0].id,'¿Qué significa acordar?',['despertarse','descansar','levantarse'],0),
mc(u7[1].id,'¿Qué significa levantar?',['levantarse','ducharse','trabajar'],0),
mc(u7[2].id,'¿Qué significa tomar banho?',['comer','ducharse / bañarse','dormir'],1),
mc(u7[3].id,'¿Qué significa manhã?',['mañana','tarde','noche'],0),
mc(u7[4].id,'¿Qué significa tarde?',['noche','tarde','mañana'],1),
mc(u7[5].id,'¿Qué significa noite?',['mañana','tarde','noche'],2),
mc(u7[6].id,'¿Qué significa hoje?',['ayer','hoy','mañana'],1),
mc(u7[7].id,'¿Qué significa cedo?',['temprano','tarde','hoy'],0),
mc(u7[8].id,'Completa: Eu estudo ___ os dias.',['todos','à','de'],0),
write(u7[9].id,'Construye una frase con descansar y à noite.','Eu descanso à noite.')
]
};

const u8=[
v('ptbr_a1_u8_v01','ir','ir','Eu vou ao mercado.','Voy al mercado.'),
v('ptbr_a1_u8_v02','mercado','mercado','Eu vou ao mercado.','Voy al mercado.'),
v('ptbr_a1_u8_v03','escola','escuela','A escola fica perto.','La escuela queda cerca.'),
v('ptbr_a1_u8_v04','trabalho','trabajo / lugar de trabajo','Eu vou ao trabalho.','Voy al trabajo.'),
v('ptbr_a1_u8_v05','rua','calle','A rua é grande.','La calle es grande.'),
v('ptbr_a1_u8_v06','esquerda','izquierda','Vire à esquerda.','Gira a la izquierda.'),
v('ptbr_a1_u8_v07','direita','derecha','Vire à direita.','Gira a la derecha.'),
v('ptbr_a1_u8_v08','frente','frente / delante','A escola fica na frente.','La escuela queda delante.'),
v('ptbr_a1_u8_v09','ônibus','autobús','Eu vou de ônibus.','Voy en autobús.'),
v('ptbr_a1_u8_v10','carro','coche / carro','Eu vou de carro.','Voy en coche.')
];

const u8Lessons=[
lesson('Lección 1: Ir a lugares','Usa ir para hablar de desplazamientos sencillos.','Ir en presente con eu: eu vou. En frases de destino se combina aquí con ao: vou ao mercado.',[u8[0].id,u8[1].id,u8[2].id,u8[3].id],[],[
mc(u8[0].id,'¿Qué significa ir?',['ir','venir','quedarse'],0),
mc(u8[1].id,'Completa: Eu vou ___ mercado.',['ao','à','em'],0)
]),
lesson('Lección 2: Lugares cotidianos','Nombra lugares básicos de la vida diaria.','Mercado, escola, trabalho y rua aparecen en frases simples de ubicación o destino.',u8.slice(1,5).map(x=>x.id),[],[
mc(u8[2].id,'¿Qué significa escola?',['mercado','escuela','calle'],1),
mc(u8[3].id,'¿Qué significa trabalho?',['escuela','trabajo / lugar de trabajo','autobús'],1)
]),
lesson('Lección 3: Izquierda y derecha','Reconoce direcciones básicas.','Esquerda y direita aparecen en instrucciones cortas como vire à esquerda / à direita.',[u8[5].id,u8[6].id],[],[
mc(u8[5].id,'¿Qué significa esquerda?',['derecha','izquierda','delante'],1),
mc(u8[6].id,'¿Qué significa direita?',['izquierda','delante','derecha'],2)
]),
lesson('Lección 4: Delante y transporte','Describe una ubicación y un medio de transporte.','Na frente expresa posición; de ônibus y de carro expresan el medio de transporte.',[u8[7].id,u8[8].id,u8[9].id],[],[
mc(u8[7].id,'¿Qué significa frente en A escola fica na frente?',['delante','detrás','cerca'],0),
mc(u8[8].id,'¿Cómo se dice «en autobús»?',['de carro','de ônibus','à esquerda'],1)
]),
lesson('Lección 5: Repaso de lugares','Combina ir, lugares, direcciones y transporte.','Usa vou, destinos y expresiones básicas de orientación.',u8.map(x=>x.id),[u7[8].id],[ 
write(u8[0].id,'Construye: «Voy al mercado».','Eu vou ao mercado.'),
mc(u8[9].id,'¿Cómo se dice «en coche»?',['de carro','de ônibus','na frente'],0)
])
];

const unit8={
unitNumber:8,id:'ptbr_a1_u8',title:'Unidad 8: Lugares, direcciones y transporte',
desc:'Habla de destinos cotidianos, direcciones básicas y medios de transporte.',
grammar:'Ir: eu vou. Destino: vou ao mercado. Direcciones: esquerda, direita, frente. Transporte: de ônibus, de carro.',
trap:{title:'Vou ao mercado',detail:'Con mercado se usa la contracción ao: Eu vou ao mercado.'},
vocab:u8,lessons:u8Lessons,
exercises:[
mc(u8[0].id,'¿Qué significa ir?',['ir','venir','vivir'],0),
mc(u8[1].id,'¿Qué significa mercado?',['mercado','escuela','calle'],0),
mc(u8[2].id,'¿Qué significa escola?',['trabajo','escuela','mercado'],1),
mc(u8[3].id,'¿Qué significa trabalho?',['autobús','trabajo / lugar de trabajo','derecha'],1),
mc(u8[5].id,'¿Qué significa esquerda?',['derecha','izquierda','delante'],1),
mc(u8[6].id,'¿Qué significa direita?',['izquierda','derecha','mercado'],1),
mc(u8[7].id,'¿Qué significa frente?',['detrás','delante','izquierda'],1),
mc(u8[8].id,'¿Cómo se dice «en autobús»?',['de carro','de ônibus','ao mercado'],1),
mc(u8[9].id,'¿Cómo se dice «en coche»?',['de carro','de ônibus','à direita'],0),
order(u8[0].id,'Ordena: «Voy al mercado».',['mercado','vou','Eu','ao'],['Eu','vou','ao','mercado'])
]
};

const u9=[
v('ptbr_a1_u9_v01','tempo','tiempo / clima','O tempo está bom.','Hace buen tiempo.'),
v('ptbr_a1_u9_v02','sol','sol','Tem sol hoje.','Hay sol hoy.'),
v('ptbr_a1_u9_v03','chuva','lluvia','Tem chuva hoje.','Hay lluvia hoy.'),
v('ptbr_a1_u9_v04','quente','caliente / caluroso','Hoje está quente.','Hoy hace calor.'),
v('ptbr_a1_u9_v05','frio','frío','Hoje está frio.','Hoy hace frío.'),
v('ptbr_a1_u9_v06','calor','calor','Eu sinto calor.','Siento calor.'),
v('ptbr_a1_u9_v07','cansado / cansada','cansado / cansada','Eu estou cansado.','Estoy cansado.'),
v('ptbr_a1_u9_v08','feliz','feliz','Eu estou feliz.','Estoy feliz.'),
v('ptbr_a1_u9_v09','triste','triste','Eu estou triste.','Estoy triste.'),
v('ptbr_a1_u9_v10','porque','porque','Estou feliz porque estou aqui.','Estoy feliz porque estoy aquí.')
];

const u9Lessons=[
lesson('Lección 1: El tiempo y el clima','Reconoce vocabulario básico sobre el clima.','Tempo puede referirse al tiempo atmosférico; sol y chuva nombran fenómenos frecuentes.',u9.slice(0,3).map(x=>x.id),[],[
mc(u9[0].id,'¿Qué significa tempo en contexto meteorológico?',['tiempo / clima','sol','lluvia'],0),
mc(u9[2].id,'¿Qué significa chuva?',['frío','lluvia','calor'],1)
]),
lesson('Lección 2: Calor y frío','Describe condiciones sencillas del tiempo.','Quente y frio se combinan con estar para describir condiciones: está quente, está frio.',[u9[3].id,u9[4].id,u9[5].id],[],[
mc(u9[3].id,'¿Qué significa quente?',['frío','caluroso','triste'],1),
mc(u9[4].id,'¿Qué significa frio?',['feliz','frío','calor'],1)
]),
lesson('Lección 3: Estados personales','Expresa estados y emociones básicas.','Cansado/cansada, feliz y triste funcionan con estar: estou feliz, estou triste.',[u9[6].id,u9[7].id,u9[8].id],[],[
mc(u9[7].id,'Completa: Eu estou ___.',['feliz','felizes','felizmente'],0),
mc(u9[8].id,'¿Qué significa triste?',['triste','cansado','caluroso'],0)
]),
lesson('Lección 4: Explicar una razón','Une una emoción con una causa sencilla.','Porque introduce una causa: Estou feliz porque estou aqui.',[u9[9].id,u9[7].id,u9[6].id],[],[
mc(u9[9].id,'¿Qué significa porque?',['aunque','porque','dónde'],1),
order(u9[9].id,'Ordena: «Estoy feliz porque estoy aquí».',['porque','feliz','aqui','Estou','estou'],['Estou','feliz','porque','estou','aqui'])
]),
lesson('Lección 5: Repaso del clima y estados','Combina clima, estados y una razón breve.','Integra estar, vocabulario meteorológico y porque en frases cortas.',u9.map(x=>x.id),[u8[0].id],[ 
write(u9[7].id,'Construye: «Estoy feliz».','Eu estou feliz.'),
mc(u9[4].id,'Completa: Hoje está ___.',['frio','feliz','porque'],0)
])
];

const unit9={
unitNumber:9,id:'ptbr_a1_u9',title:'Unidad 9: Clima, estados y razones',
desc:'Describe el tiempo, expresa estados básicos y explica una razón sencilla.',
grammar:'Está quente/frio para condiciones; estou cansado/feliz/triste para estados personales; porque introduce una razón.',
trap:{title:'Quente y calor',detail:'Quente describe una condición («está quente»); calor es un sustantivo («sinto calor»).'},
vocab:u9,lessons:u9Lessons,
exercises:[
mc(u9[0].id,'¿Qué significa tempo en contexto meteorológico?',['tiempo / clima','tiempo verbal','hora'],0),
mc(u9[1].id,'¿Qué significa sol?',['sol','lluvia','frío'],0),
mc(u9[2].id,'¿Qué significa chuva?',['calor','lluvia','sol'],1),
mc(u9[3].id,'Completa: Hoje está ___.',['quente','quentes','quentei'],0),
mc(u9[4].id,'¿Qué significa frio?',['calor','frío','feliz'],1),
mc(u9[6].id,'¿Qué significa cansado?',['cansado','feliz','triste'],0),
mc(u9[7].id,'¿Qué significa feliz?',['triste','feliz','caluroso'],1),
mc(u9[8].id,'¿Qué significa triste?',['feliz','triste','frío'],1),
mc(u9[9].id,'¿Qué significa porque?',['porque','dónde','quién'],0),
order(u9[9].id,'Ordena: «Estoy feliz porque estoy aquí».',['porque','feliz','aqui','Estou','estou'],['Estou','feliz','porque','estou','aqui'])
]
};

root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1['07-12']={units:[unit4,unit5,unit6,unit7,unit8,unit9]};
})(typeof window!=='undefined'?window:globalThis);
