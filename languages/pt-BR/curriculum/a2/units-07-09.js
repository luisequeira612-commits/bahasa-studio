(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const lesson=(spec,words)=>({
 title:spec[0],objective:spec[1],grammar:spec[2],
 vocabIds:spec[3].map(n=>words[n].id),reviewVocabIds:spec[4]||[],
 exercises:[makeExercise(words,spec[3][0]),makeExercise(words,spec[3][1])]
});
const makeExercise=(words,index)=>{
 const correct=words[index], candidates=[correct.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];
 const answer=index%3, options=candidates.slice(3-answer).concat(candidates.slice(0,3-answer));
 return {vocabId:correct.id,type:'mc',prompt:'¿Qué significa «'+correct.target+'»?',options,answer,explanation:'Relaciona la expresión con su significado en español.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>lesson(spec,words)),
 exercises:words.map((word,index)=>makeExercise(words,index))
});
const u7=[
vocab(7,1,'ter que','tener que','Tenho que terminar o relatório hoje.','Tengo que terminar el informe hoy.'),
vocab(7,2,'dever','deber','Você deve descansar um pouco.','Deberías descansar un poco.'),
vocab(7,3,'precisar','necesitar','Preciso estudar para a prova.','Necesito estudiar para el examen.'),
vocab(7,4,'obrigatório','obligatorio','O uso do crachá é obrigatório.','El uso de la credencial es obligatorio.'),
vocab(7,5,'permitido','permitido','É permitido entrar por aqui.','Está permitido entrar por aquí.'),
vocab(7,6,'proibido','prohibido','É proibido estacionar nesta rua.','Está prohibido estacionar en esta calle.'),
vocab(7,7,'prazo','plazo / fecha límite','O prazo termina na sexta-feira.','El plazo termina el viernes.'),
vocab(7,8,'entregar','entregar','Vou entregar o formulário amanhã.','Voy a entregar el formulario mañana.'),
vocab(7,9,'faltar','faltar / ausentarse','Não posso faltar à reunião.','No puedo faltar a la reunión.'),
vocab(7,10,'cumprir','cumplir','Precisamos cumprir as regras.','Necesitamos cumplir las reglas.')
];
const u8=[
vocab(8,1,'primeiro','primero','Primeiro, precisamos comprar os bilhetes.','Primero, necesitamos comprar los billetes.'),
vocab(8,2,'em seguida','a continuación','Em seguida, vamos pegar o ônibus.','A continuación, vamos a tomar el autobús.'),
vocab(8,3,'depois','después','Depois, fazemos o check-in.','Después, hacemos el registro de entrada.'),
vocab(8,4,'enquanto','mientras','Enquanto você espera, vou ligar para o hotel.','Mientras esperas, voy a llamar al hotel.'),
vocab(8,5,'por isso','por eso','O trem atrasou; por isso, chegamos tarde.','El tren se retrasó; por eso llegamos tarde.'),
vocab(8,6,'então','entonces','Está chovendo, então vamos ficar aqui.','Está lloviendo, entonces nos quedaremos aquí.'),
vocab(8,7,'porém','sin embargo','Queria viajar, porém não tenho tempo.','Quería viajar, sin embargo no tengo tiempo.'),
vocab(8,8,'além disso','además','O quarto é grande; além disso, é silencioso.','La habitación es grande; además, es silenciosa.'),
vocab(8,9,'finalmente','finalmente / por fin','Finalmente, encontramos o endereço.','Finalmente, encontramos la dirección.'),
vocab(8,10,'apesar de','a pesar de','Apesar da chuva, saímos cedo.','A pesar de la lluvia, salimos temprano.')
];
const u9=[
vocab(9,1,'passagem','billete / pasaje','Comprei uma passagem para Belo Horizonte.','Compré un billete para Belo Horizonte.'),
vocab(9,2,'bagagem','equipaje','Minha bagagem está muito pesada.','Mi equipaje está muy pesado.'),
vocab(9,3,'hospedagem','alojamiento','Ainda precisamos reservar a hospedagem.','Todavía necesitamos reservar el alojamiento.'),
vocab(9,4,'reserva','reserva','Tenho uma reserva para duas noites.','Tengo una reserva para dos noches.'),
vocab(9,5,'check-in','registro de entrada','O check-in começa às duas da tarde.','El registro de entrada comienza a las dos de la tarde.'),
vocab(9,6,'embarcar','embarcar / abordar','Vamos embarcar pelo portão oito.','Vamos a embarcar por la puerta ocho.'),
vocab(9,7,'desembarcar','desembarcar / bajar','Precisamos desembarcar na próxima estação.','Necesitamos bajar en la próxima estación.'),
vocab(9,8,'atrasado','retrasado','O voo está atrasado por causa do tempo.','El vuelo está retrasado por el clima.'),
vocab(9,9,'conexão','conexión / escala','Temos uma conexão em São Paulo.','Tenemos una escala en São Paulo.'),
vocab(9,10,'destino','destino','Nosso destino é Porto Alegre.','Nuestro destino es Porto Alegre.')
];
const unit7=makeUnit(7,'Obligaciones, permisos y consejos','Expresa necesidades, obligaciones, recomendaciones y reglas en el trabajo y en situaciones cotidianas.',
'Ter que + infinitivo expresa una obligación concreta; dever + infinitivo suele expresar deber o recomendación. Precisar + infinitivo expresa necesidad. É permitido/proibido + infinitivo presenta reglas.',
'Ter que y dever','Ter que suele marcar una obligación; dever también puede aconsejar. Precisar + infinitivo no lleva de: preciso estudar.',
u7,[
['Lección 1: Lo que tienes que hacer','Expresa obligaciones concretas.','Ter que + infinitivo: tenho que entregar, temos que cumprir.',[0,6],['ptbr_a2_u6_v04']],
['Lección 2: Consejos y recomendaciones','Da consejos sobre hábitos y decisiones.','Dever + infinitivo puede suavizar una recomendación: você deve descansar.',[1,2],['ptbr_a2_u6_v07']],
['Lección 3: Reglas y permisos','Comprende lo que está permitido u obligado.','É obrigatório/permitido/proibido + infinitivo o sustantivo expresa una regla.',[3,4,5],['ptbr_a2_u6_v09']],
['Lección 4: Plazos y entregas','Habla de fechas límite y tareas pendientes.','Prazo indica el límite de tiempo; entregar puede llevar un objeto directo.',[6,7],['ptbr_a2_u4_v01']],
['Lección 5: Asistencia y cumplimiento','Explica por qué debes asistir y respetar reglas.','Faltar a algo expresa ausencia; cumprir se combina con regras, prazo y obrigação.',[8,9],['ptbr_a2_u6_v10']]
]);
const unit8=makeUnit(8,'Conectar y ordenar acontecimientos','Organiza relatos y explica secuencias, causas, consecuencias y contrastes.',
'Primeiro, em seguida, depois y finalmente ordenan acciones. Por isso y então introducen consecuencias. Porém marca contraste; além disso añade información; apesar de introduce una concesión.',
'Por isso y porém','Por isso expresa consecuencia; porém introduce contraste. Apesar de va seguido de un sustantivo o infinitivo: apesar da chuva, apesar de chover.',
u8,[
['Lección 1: Ordenar los pasos','Cuenta acciones en una secuencia clara.','Primeiro, em seguida, depois y finalmente indican el orden de los hechos.',[0,1],['ptbr_a2_u4_v04']],
['Lección 2: Añadir información','Amplía una explicación con otro dato.','Além disso añade información relacionada a la idea anterior.',[2,7],['ptbr_a2_u5_v10']],
['Lección 3: Explicar consecuencias','Relaciona una situación con su resultado.','Por isso y então pueden introducir una consecuencia.',[4,5],['ptbr_a2_u4_v07']],
['Lección 4: Contrastar ideas','Presenta una expectativa y una situación diferente.','Porém conecta ideas contrastantes; suele aparecer después de una coma o punto y coma.',[6,8],['ptbr_a2_u5_v04']],
['Lección 5: Actuar a pesar de algo','Explica una acción que ocurre pese a una dificultad.','Apesar de + sustantivo o infinitivo expresa concesión: apesar da chuva, apesar de estar cansado.',[9,3],['ptbr_a2_u4_v03']]
]);
const unit9=makeUnit(9,'Viajes, transporte y alojamiento','Organiza un viaje, entiende servicios de transporte y gestiona la llegada al alojamiento.',
'Passagem y bagagem se relacionan con el transporte. Reserva, hospedagem y check-in se usan al alojarse. Embarcar/desembarcar describen subir y bajar; conexão puede ser una escala entre trayectos.',
'Embarcar y desembarcar','Embarcar es subir al transporte; desembarcar es bajar. Conexão puede ser un cambio de vuelo o tren, no necesariamente el destino final.',
u9,[
['Lección 1: Billetes y equipaje','Prepara lo necesario antes de viajar.','Passagem indica el billete; bagagem reúne las maletas y pertenencias.',[0,1],['ptbr_a2_u3_v01']],
['Lección 2: Reservar alojamiento','Habla de dónde te quedarás durante el viaje.','Reserva y hospedagem aparecen al organizar una estancia.',[2,3],['ptbr_a2_u6_v01']],
['Lección 3: Llegar al alojamiento','Comprende el registro de entrada.','Check-in es el registro al llegar; confirma horarios y datos de la reserva.',[4,3],['ptbr_a2_u6_v09']],
['Lección 4: Embarcar y llegar','Describe los movimientos durante el trayecto.','Embarcar es subir; desembarcar es bajar del transporte.',[5,6],['ptbr_a2_u8_v02']],
['Lección 5: Retrasos y conexiones','Explica cambios y retrasos en el itinerario.','Atrasado describe una demora; conexão es un enlace entre trayectos y destino es el lugar final.',[7,8,9],['ptbr_a2_u8_v05']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['07-09']={units:[unit7,unit8,unit9]};
})(typeof window!=='undefined'?window:globalThis);
