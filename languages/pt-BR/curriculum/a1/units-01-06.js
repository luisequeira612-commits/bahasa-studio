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
