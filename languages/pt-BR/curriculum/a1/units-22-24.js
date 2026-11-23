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
 return {unitNumber:number,id:'ptbr_a1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab,lessons,exercises:vocab.map((word,index)=>mc(word.id,'¿Qué significa '+word.target+'?',[word.esp,vocab[(index+3)%10].esp,vocab[(index+6)%10].esp],0))};
};
const u22=[
v('ptbr_a1_u22_v01','professor / professora','profesor / profesora','A professora começa a aula.','La profesora comienza la clase.'),
v('ptbr_a1_u22_v02','aluno / aluna','alumno / alumna','O aluno estuda português.','El alumno estudia portugués.'),
v('ptbr_a1_u22_v03','aula','clase','A aula começa às oito.','La clase comienza a las ocho.'),
v('ptbr_a1_u22_v04','caderno','cuaderno','Meu caderno está na mochila.','Mi cuaderno está en la mochila.'),
v('ptbr_a1_u22_v05','lápis','lápiz','Eu escrevo com lápis.','Escribo con lápiz.'),
v('ptbr_a1_u22_v06','caneta','bolígrafo','A caneta é azul.','El bolígrafo es azul.'),
v('ptbr_a1_u22_v07','papel','papel','Preciso de uma folha de papel.','Necesito una hoja de papel.'),
v('ptbr_a1_u22_v08','aprender','aprender','Quero aprender português.','Quiero aprender portugués.'),
v('ptbr_a1_u22_v09','ensinar','enseñar','O professor vai ensinar hoje.','El profesor va a enseñar hoy.'),
v('ptbr_a1_u22_v10','pergunta','pregunta','Tenho uma pergunta.','Tengo una pregunta.')
];
const u23=[
v('ptbr_a1_u23_v01','profissão','profesión','Qual é a sua profissão?','¿Cuál es tu profesión?'),
v('ptbr_a1_u23_v02','motorista','conductor / conductora','O motorista trabalha cedo.','El conductor trabaja temprano.'),
v('ptbr_a1_u23_v03','cozinheiro / cozinheira','cocinero / cocinera','A cozinheira prepara o almoço.','La cocinera prepara el almuerzo.'),
v('ptbr_a1_u23_v04','vendedor / vendedora','vendedor / vendedora','O vendedor atende o cliente.','El vendedor atiende al cliente.'),
v('ptbr_a1_u23_v05','enfermeiro / enfermeira','enfermero / enfermera','A enfermeira trabalha no hospital.','La enfermera trabaja en el hospital.'),
v('ptbr_a1_u23_v06','escritório','oficina / despacho','Meu pai trabalha em um escritório.','Mi padre trabaja en una oficina.'),
v('ptbr_a1_u23_v07','chefe','jefe / jefa','Minha chefe chega às nove.','Mi jefa llega a las nueve.'),
v('ptbr_a1_u23_v08','colega','compañero / compañera','Meu colega trabalha comigo.','Mi compañero trabaja conmigo.'),
v('ptbr_a1_u23_v09','cliente','cliente','O cliente faz uma pergunta.','El cliente hace una pregunta.'),
v('ptbr_a1_u23_v10','empresa','empresa','Ela trabalha em uma empresa.','Ella trabaja en una empresa.')
];
const u24=[
v('ptbr_a1_u24_v01','telefone','teléfono','Meu telefone está aqui.','Mi teléfono está aquí.'),
v('ptbr_a1_u24_v02','celular','móvil / celular','Meu celular está sem bateria.','Mi móvil está sin batería.'),
v('ptbr_a1_u24_v03','número','número','Qual é o seu número?','¿Cuál es tu número?'),
v('ptbr_a1_u24_v04','mensagem','mensaje','Recebi uma mensagem.','Recibí un mensaje.'),
v('ptbr_a1_u24_v05','ligar','llamar por teléfono','Vou ligar para minha mãe.','Voy a llamar a mi madre.'),
v('ptbr_a1_u24_v06','enviar','enviar','Quero enviar uma mensagem.','Quiero enviar un mensaje.'),
v('ptbr_a1_u24_v07','responder','responder','Posso responder agora.','Puedo responder ahora.'),
v('ptbr_a1_u24_v08','contato','contacto','Salvei seu contato.','Guardé tu contacto.'),
v('ptbr_a1_u24_v09','chamada','llamada','A chamada terminou.','La llamada terminó.'),
v('ptbr_a1_u24_v10','urgente','urgente','Esta mensagem é urgente.','Este mensaje es urgente.')
];
const unit22=makeUnit(22,'En el aula','Habla de personas, materiales y acciones básicas del entorno de estudio.',
'Professor y aluno; aula y materiales; aprender y ensinar; ter uma pergunta; escribir con lápis o caneta.',
'Professor y aluno','Professor nombra a quien enseña y aluno a quien aprende. Lápis es invariable en plural en la forma lápis.',
u22,[
['Lección 1: Personas en clase','Identifica al profesor y al alumno.','Professor y professora; aluno y aluna cambian según el género gramatical.',[0,1],[]],
['Lección 2: La clase','Habla de una clase y de una pregunta.','A aula y uma pergunta son expresiones frecuentes para participar en clase.',[2,9],[]],
['Lección 3: Cuaderno y lápiz','Reconoce materiales de estudio.','Caderno, lápis y caneta nombran materiales escolares.',[3,4],[]],
['Lección 4: Escribir y aprender','Nombra materiales y acciones de aprendizaje.','Aprender puede ir seguido directamente de un idioma: aprender português.',[5,7],[]],
['Lección 5: Enseñar','Habla de enseñar y preguntar.','Ensinar es enseñar; tenho uma pergunta sirve para introducir una consulta.',[8,9],[]]
]);
const unit23=makeUnit(23,'Profesiones y trabajo','Reconoce profesiones y personas habituales en un entorno laboral.',
'Profissão; nombres de ocupaciones; trabalhar em + lugar; meu/minha para hablar de compañeros y responsables.',
'Profissão y profissional','Profissão nombra una ocupación. Los nombres de profesiones suelen variar en masculino y femenino; algunas formas como motorista no cambian.',
u23,[
['Lección 1: Profesión y conductor','Pregunta por una profesión y reconoce una ocupación.','Qual é a sua profissão? pregunta por la ocupación de una persona.',[0,1],[]],
['Lección 2: Cocinar y vender','Nombra dos ocupaciones.','Cozinheiro/cozinheira y vendedor/vendedora presentan formas masculinas y femeninas.',[2,3],[]],
['Lección 3: En el hospital','Reconoce una profesión de salud.','Enfermeiro y enfermeira son formas masculina y femenina.',[4,5],['ptbr_a1_u18_v05']],
['Lección 4: Jefes y compañeros','Habla de personas del trabajo.','Chefe y colega pueden referirse a personas de distintos géneros.',[6,7],[]],
['Lección 5: Clientes y empresas','Nombra personas y lugares de trabajo.','Trabalhar em uma empresa indica el lugar donde alguien trabaja.',[8,9],['ptbr_a1_u8_v03']]
]);
const unit24=makeUnit(24,'Teléfono y mensajes','Intercambia información sencilla mediante llamadas y mensajes.',
'Telefone y celular; preguntar por un número; ligar para alguém; enviar y responder mensagens.',
'Ligar y enviar','Ligar para alguien significa llamar por teléfono. Enviar una mensagem es mandar un mensaje escrito.',
u24,[
['Lección 1: Teléfono y celular','Reconoce dispositivos para comunicarse.','Telefone y celular son dos palabras comunes para teléfono y móvil.',[0,1],[]],
['Lección 2: Números y contactos','Pregunta por un número y guarda un contacto.','Qual é o seu número? es una pregunta directa y habitual.',[2,7],[]],
['Lección 3: Mensajes','Habla de recibir y enviar mensajes.','Mensagem es femenino: uma mensagem; enviar una mensagem expresa la acción de mandarla.',[3,5],[]],
['Lección 4: Llamar y responder','Describe una llamada y una respuesta.','Ligar para + persona indica a quién llamas; responder puede usarse sin objeto explícito.',[4,6],[]],
['Lección 5: Una llamada urgente','Reconoce una llamada y una situación urgente.','Urgente mantiene la misma forma para masculino y femenino: um aviso urgente, uma mensagem urgente.',[8,9],[]]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A1['22-24']={units:[unit22,unit23,unit24]};
})(typeof window!=='undefined'?window:globalThis);
