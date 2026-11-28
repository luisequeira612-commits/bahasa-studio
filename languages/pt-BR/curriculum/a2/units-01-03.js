(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const lesson=(title,objective,grammar,vocabIds,reviewVocabIds,exercises)=>({title,objective,grammar,vocabIds,reviewVocabIds,exercises});
const makeExercise=(words,index)=>{
 const correct=words[index], candidates=[correct.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];
 const answer=index%3, options=candidates.slice(3-answer).concat(candidates.slice(0,3-answer));
 return {vocabId:correct.id,type:'mc',prompt:'¿Qué significa «'+correct.target+'»?',options,answer,explanation:'Relaciona la expresión con su significado en español.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,lessonSpecs)=>{
 const lessons=lessonSpecs.map((spec,i)=>lesson(spec[0],spec[1],spec[2],spec[3].map(n=>words[n].id),spec[4]||[],[makeExercise(words,spec[3][0]),makeExercise(words,spec[3][1])]));
 return {unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap:{title:trapTitle,detail:trapDetail},vocab:words,lessons,exercises:words.map((word,index)=>makeExercise(words,index))};
};
const u1=[
vocab(1,1,'ontem','ayer','Ontem eu viajei para Recife.','Ayer viajé a Recife.'),
vocab(1,2,'anteontem','anteayer','Anteontem visitei minha avó.','Anteayer visité a mi abuela.'),
vocab(1,3,'semana passada','la semana pasada','Na semana passada, cheguei cedo.','La semana pasada llegué temprano.'),
vocab(1,4,'viajar','viajar','Eu viajei de ônibus.','Viajé en autobús.'),
vocab(1,5,'visitar','visitar','Visitei meus amigos.','Visité a mis amigos.'),
vocab(1,6,'chegar','llegar','Cheguei às oito.','Llegué a las ocho.'),
vocab(1,7,'sair','salir','Saí depois do trabalho.','Salí después del trabajo.'),
vocab(1,8,'voltar','volver / regresar','Voltei para casa à noite.','Volví a casa por la noche.'),
vocab(1,9,'encontrar','encontrar / reunirse con','Encontrei meus colegas no centro.','Me encontré con mis compañeros en el centro.'),
vocab(1,10,'depois','después','Depois, jantamos juntos.','Después, cenamos juntos.')
];
const u2=[
vocab(2,1,'infância','infancia','Minha infância foi feliz.','Mi infancia fue feliz.'),
vocab(2,2,'quando eu era criança','cuando era niño / niña','Quando eu era criança, morava aqui.','Cuando era niño, vivía aquí.'),
vocab(2,3,'brincar','jugar','Eu brincava no quintal.','Yo jugaba en el patio.'),
vocab(2,4,'costumar','soler','Eu costumava ler antes de dormir.','Solía leer antes de dormir.'),
vocab(2,5,'morava','vivía','Eu morava perto da escola.','Vivía cerca de la escuela.'),
vocab(2,6,'estudava','estudiaba','Ela estudava de manhã.','Ella estudiaba por la mañana.'),
vocab(2,7,'gostava','gustaba / solía gustar','Eu gostava de desenhar.','Me gustaba dibujar.'),
vocab(2,8,'sempre','siempre','Sempre brincávamos juntos.','Siempre jugábamos juntos.'),
vocab(2,9,'antes','antes','Antes, eu morava no campo.','Antes vivía en el campo.'),
vocab(2,10,'enquanto','mientras','Eu lia enquanto minha irmã brincava.','Yo leía mientras mi hermana jugaba.')
];
const u3=[
vocab(3,1,'fim de semana','fin de semana','Vou viajar no fim de semana.','Voy a viajar el fin de semana.'),
vocab(3,2,'próximo','próximo','No próximo sábado, vou sair.','El próximo sábado voy a salir.'),
vocab(3,3,'planejar','planear','Vamos planejar uma viagem.','Vamos a planear un viaje.'),
vocab(3,4,'pretender','tener la intención de','Pretendo estudar mais.','Tengo la intención de estudiar más.'),
vocab(3,5,'combinar','acordar / quedar','Vamos combinar um horário.','Vamos a acordar una hora.'),
vocab(3,6,'marcar','concertar / fijar','Quero marcar uma reunião.','Quiero concertar una reunión.'),
vocab(3,7,'confirmar','confirmar','Vou confirmar o encontro.','Voy a confirmar el encuentro.'),
vocab(3,8,'cancelar','cancelar','Preciso cancelar a reserva.','Necesito cancelar la reserva.'),
vocab(3,9,'talvez','quizá / tal vez','Talvez eu viaje amanhã.','Tal vez viaje mañana.'),
vocab(3,10,'disponível','disponible','Você está disponível no sábado?','¿Estás disponible el sábado?')
];
const unit1=makeUnit(1,'Ayer y la semana pasada','Cuenta hechos terminados y sitúa acontecimientos en el pasado reciente.','El pretérito perfeito presenta acciones terminadas: viajei, visitei, cheguei, saí, voltei. Las expresiones ontem, anteontem y semana passada sitúan el hecho en el pasado.','Pretérito perfeito','No confundas el infinitivo (viajar) con la forma conjugada (eu viajei). En esta unidad se practican formas frecuentes del pasado.',u1,[
['Lección 1: Ayer y anteayer','Recupera ontem y amplía la referencia temporal con anteontem.','Ontem significa ayer y se retoma de A1 U12; anteontem significa anteayer y amplía la secuencia temporal.',[0,1],['ptbr_a1_u12_v10']],
['Lección 2: La semana pasada','Habla de un periodo pasado.','Semana passada suele aparecer con na: na semana passada.',[2,3],[]],
['Lección 3: Viajes y visitas','Cuenta un viaje o una visita terminados.','Viajar y visitar forman viajei y visitei en primera persona singular.',[3,4],[]],
['Lección 4: Llegar, salir y volver','Ordena acciones de un día pasado.','Cheguei, saí y voltei son formas de pretérito perfeito.',[5,6],[]],
['Lección 5: Encontrarse y continuar','Relata un encuentro y lo que ocurrió después.','Encontrei indica un encuentro terminado; depois organiza la secuencia.',[8,9],[]]
]);
const unit2=makeUnit(2,'La infancia y los hábitos del pasado','Describe cómo era la vida antes y qué actividades se repetían.','El pretérito imperfeito describe hábitos y situaciones en el pasado: eu morava, ela estudava, eu gostava. Costumava + infinitivo expresa una costumbre.','Pretérito imperfeito','El pretérito perfeito presenta un hecho terminado; el imperfeito describe el contexto o una costumbre pasada.',u2,[
['Lección 1: La infancia','Habla de una etapa de la vida.','Infância y quando eu era criança introducen recuerdos de niñez.',[0,1],[]],
['Lección 2: Juegos de antes','Describe actividades habituales.','Brincava es una forma del pretérito imperfeito de brincar.',[2,3],[]],
['Lección 3: Dónde vivías y estudiabas','Describe lugares y rutinas pasadas.','Morava y estudava expresan situaciones habituales o duraderas.',[4,5],['ptbr_a2_u1_v03','ptbr_a2_u1_v06']],
['Lección 4: Gustos de la infancia','Expresa preferencias de otra época.','Gostava de + infinitivo o sustantivo expresa un gusto pasado.',[6,7],[]],
['Lección 5: Antes y mientras','Relaciona dos acciones o situaciones pasadas.','Antes sitúa una etapa anterior; enquanto conecta acciones simultáneas.',[8,9],['ptbr_a2_u1_v10']]
]);
const unit3=makeUnit(3,'Planes y compromisos','Propón planes, acuerda horarios y confirma o cambia compromisos.','Para planes próximos se usa ir + infinitivo: vou viajar, vamos planejar. Pretender + infinitivo expresa intención; talvez introduce posibilidad.', 'Ir + infinitivo','Voy a viajar se expresa vou viajar. El infinitivo permanece después de la forma conjugada de ir.',u3,[
['Lección 1: El fin de semana','Habla de planes para los próximos días.','Fim de semana y próximo sitúan el plan en el futuro cercano.',[0,1],['ptbr_a1_u12_v01']],
['Lección 2: Planear y tener intención','Expresa lo que quieres hacer.','Planejar y pretender pueden ir seguidos de un infinitivo.',[2,3],[]],
['Lección 3: Quedar y fijar una hora','Acuerda un momento para reunirse.','Combinar um horário y marcar uma reunião son expresiones para organizar planes.',[4,5],[]],
['Lección 4: Confirmar y cancelar','Gestiona un compromiso.','Confirmar y cancelar describen acciones sobre un plan o una reserva.',[6,7],[]],
['Lección 5: Disponibilidad y posibilidad','Pregunta si alguien puede participar.','Talvez expresa posibilidad; disponível concuerda en género y número.',[8,9],['ptbr_a1_u15_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['01-03']={units:[unit1,unit2,unit3]};
})(typeof window!=='undefined'?window:globalThis);
