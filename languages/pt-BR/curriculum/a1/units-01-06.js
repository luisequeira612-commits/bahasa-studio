(function(root){
'use strict';
const v=(id,target,esp,ex,exEsp)=>({id,target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const mc=(vocabId,prompt,options,answer)=>({vocabId,type:'mc',prompt,options,answer,explanation:'Práctica introductoria; pendiente de cotejo lingüístico.'});
const match=(prompt,pairs)=>({type:'match',prompt,pairs});
const order=(vocabId,prompt,words,correctOrder)=>({vocabId,type:'order',prompt,words,correctOrder,explanation:'Orden básico de la frase.'});
const write=(vocabId,prompt,modelAnswer)=>({vocabId,type:'write',prompt,hint:'Escribe una frase propia y compárala con el modelo.',modelAnswer,explanation:'El modelo no es la única respuesta posible.'});
const u1=[
v('ptbr_a1_u1_v01','eu','yo','Eu sou Ana.','Yo soy Ana.'),
v('ptbr_a1_u1_v02','você','tú / usted','Você é Luis.','Tú eres Luis.'),
v('ptbr_a1_u1_v03','ele / ela','él / ella','Ela é Ana.','Ella es Ana.'),
v('ptbr_a1_u1_v04','olá','hola','Olá, eu sou Ana.','Hola, soy Ana.'),
v('ptbr_a1_u1_v05','oi','hola informal','Oi, você é Luis?','Hola, ¿eres Luis?'),
v('ptbr_a1_u1_v06','bom dia','buenos días','Bom dia!','¡Buenos días!'),
v('ptbr_a1_u1_v07','boa tarde','buenas tardes','Boa tarde!','¡Buenas tardes!'),
v('ptbr_a1_u1_v08','boa noite','buenas noches','Boa noite!','¡Buenas noches!'),
v('ptbr_a1_u1_v09','tchau','adiós','Tchau, Ana!','¡Adiós, Ana!'),
v('ptbr_a1_u1_v10','obrigado / obrigada','gracias','Obrigado pela ajuda.','Gracias por la ayuda.')
];

const u2=[
v('ptbr_a1_u2_v01','estar','estar','Eu estou bem.','Estoy bien.'),
v('ptbr_a1_u2_v02','estou','estoy','Eu estou aqui.','Estoy aquí.'),
v('ptbr_a1_u2_v03','está','estás / está','Você está aqui.','Estás aquí.'),
v('ptbr_a1_u2_v04','brasileiro','brasileño','Ele é brasileiro.','Él es brasileño.'),
v('ptbr_a1_u2_v05','brasileira','brasileña','Ela é brasileira.','Ella es brasileña.'),
v('ptbr_a1_u2_v06','nicaraguense','nicaragüense','Eu sou nicaraguense.','Soy nicaragüense.'),
v('ptbr_a1_u2_v07','mexicano','mexicano','Ele é mexicano.','Él es mexicano.'),
v('ptbr_a1_u2_v08','mexicana','mexicana','Ela é mexicana.','Ella es mexicana.'),
v('ptbr_a1_u2_v09','o','el (artículo)','O brasileiro fala português.','El brasileño habla portugués.'),
v('ptbr_a1_u2_v10','a','la (artículo)','A brasileira fala português.','La brasileña habla portugués.'),
v('ptbr_a1_u2_v11','os','los (artículo)','Os brasileiros moram aqui.','Los brasileños viven aquí.'),
v('ptbr_a1_u2_v12','as','las (artículo)','As brasileiras moram aqui.','Las brasileñas viven aquí.')
];

const u3=[
v('ptbr_a1_u3_v01','falar','hablar','Eu falo português.','Yo hablo portugués.'),
v('ptbr_a1_u3_v02','estudar','estudiar','Você estuda português.','Tú estudias portugués.'),
v('ptbr_a1_u3_v03','trabalhar','trabajar','Ela trabalha aqui.','Ella trabaja aquí.'),
v('ptbr_a1_u3_v04','morar','vivir / residir','Eu moro aqui.','Yo vivo aquí.'),
v('ptbr_a1_u3_v05','gostar','gustar','Eu gosto de música.','Me gusta la música.'),
v('ptbr_a1_u3_v06','embaraçada','avergonzada / incómoda','Estou embaraçada.','Estoy avergonzada.'),
v('ptbr_a1_u3_v07','embaraçado','avergonzado / incómodo','Ele está embaraçado.','Él está avergonzado.'),
v('ptbr_a1_u3_v08','grávida','embarazada','Ela está grávida.','Ella está embarazada.')
];

const numbers='um,dois,três,quatro,cinco,seis,sete,oito,nove,dez,onze,doze,treze,quatorze,quinze,dezesseis,dezessete,dezoito,dezenove,vinte'.split(',');
const numberVocab=numbers.map((target,index)=>v('ptbr_a1_u3_n'+String(index+1).padStart(2,'0'),target,String(index+1),target+'!',String(index+1)));

const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});
const u1Lessons=[
lesson('Lección 1: Saludos cotidianos','Reconoce saludos de mañana, tarde y noche.','Olá y oi son saludos generales; bom dia, boa tarde y boa noite dependen del momento.',u1.slice(3,8).map(x=>x.id),[],[
match('Empareja cada saludo con su significado.',[{left:'bom dia',right:'buenos días'},{left:'boa tarde',right:'buenas tardes'},{left:'boa noite',right:'buenas noches'}]),
mc(u1[4].id,'¿Cuál es un saludo informal?', ['oi','tchau','obrigado'],0)
]),
lesson('Lección 2: Pronombres','Distingue eu, você y ele/ela.','Eu habla de quien habla; você se dirige a la otra persona y usa forma verbal de tercera persona.',u1.slice(0,3).map(x=>x.id),[],[
match('Relaciona los pronombres.',[{left:'eu',right:'yo'},{left:'você',right:'tú / usted'},{left:'ela',right:'ella'}]),
mc(u1[1].id,'¿Qué pronombre significa «tú / usted»?',['eu','você','ela'],1)
]),
lesson('Lección 3: El verbo ser','Forma presentaciones con ser.','En presente: eu sou; você é; ele/ela é. La forma de você coincide con la tercera persona.',[u1[0].id,u1[1].id,u1[2].id],[],[
mc(u1[1].id,'Completa: Você ___ Luis.',['sou','é','somos'],1),
order(u1[0].id,'Ordena: «Yo soy Ana».',['Ana','sou','Eu'],['Eu','sou','Ana'])
]),
lesson('Lección 4: Un primer diálogo','Comprende un intercambio breve de presentación.','Lee el diálogo y reconoce quién saluda y quién se presenta; no se reproduce audio en este piloto.',u1.map(x=>x.id),[],[
mc(u1[3].id,'Lee: «Oi! Eu sou Ana. Você é Luis?» ¿Qué ocurre?',['Ana se presenta y pregunta el nombre','Ana se despide','Ana da las gracias'],0)
]),
lesson('Lección 5: Repaso y producción','Combina saludos, pronombres y ser en una presentación.','Usa un saludo, un pronombre y la forma correcta de ser.',u1.map(x=>x.id),[],[
write(u1[0].id,'Escribe una presentación breve con eu y ser.','Eu sou Ana.'),
mc(u1[9].id,'¿Qué expresión se usa para dar las gracias?',['tchau','obrigado / obrigada','boa noite'],1)
])
];
const unit1={
unitNumber:1,id:'ptbr_a1_u1',title:'Unidad 1: Saludos, pronombres y ser',
desc:'Saluda, reconoce eu y você y preséntate con el verbo ser.',
grammar:'Ser en presente: eu sou; você é; ele/ela é. En portugués brasileño, você lleva la forma verbal de tercera persona.',
trap:{title:'Atención a você',detail:'Aunque você se traduce como «tú», se dice você é, no você és.'},
vocab:u1,lessons:u1Lessons,
exercises:[
mc(u1[0].id,'¿Qué significa eu?',['yo','tú','ella'],0),
mc(u1[1].id,'¿Qué pronombre significa «tú / usted»?',['eu','você','ele'],1),
mc(u1[1].id,'Completa: Você ___ Luis.',['sou','é','são'],1),
mc(u1[3].id,'¿Qué significa olá?',['adiós','hola','gracias'],1),
mc(u1[5].id,'¿Qué saludo corresponde a la mañana?',['boa noite','bom dia','boa tarde'],1),
mc(u1[6].id,'¿Qué significa boa tarde?',['buenas tardes','buenas noches','buenos días'],0),
mc(u1[8].id,'¿Qué significa tchau?',['hola','gracias','adiós'],2),
mc(u1[9].id,'¿Qué expresión da las gracias?',['obrigado / obrigada','oi','olá'],0),
order(u1[0].id,'Ordena: «Yo soy Ana».',['Ana','sou','Eu'],['Eu','sou','Ana']),
write(u1[1].id,'Escribe una frase de presentación con você.','Você é Luis.')
]
};
