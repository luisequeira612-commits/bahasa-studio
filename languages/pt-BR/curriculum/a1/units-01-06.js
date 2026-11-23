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
