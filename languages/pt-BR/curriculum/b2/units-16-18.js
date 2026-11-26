(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta el valor del verbo o de la construcción dentro de la frase completa.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((_,i)=>exercise(words,i))
});
const u16=[
vocab(16,1,'deparar-se com','encontrarse con','Ao revisar os documentos, a equipe se deparou com inconsistências.','Al revisar los documentos, el equipo se encontró con inconsistencias.'),
vocab(16,2,'ater-se a','ceñirse a','O parecer deve ater-se aos fatos comprovados.','El dictamen debe ceñirse a los hechos comprobados.'),
vocab(16,3,'valer-se de','valerse de','A comissão valeu-se de dados públicos para fundamentar a decisão.','La comisión se valió de datos públicos para fundamentar la decisión.'),
vocab(16,4,'abster-se de','abstenerse de','O relator decidiu abster-se de emitir opinião antes da análise.','El ponente decidió abstenerse de emitir una opinión antes del análisis.'),
vocab(16,5,'recusar-se a','negarse a','A empresa recusou-se a fornecer informações complementares.','La empresa se negó a proporcionar información complementaria.'),
vocab(16,6,'dedicar-se a','dedicarse a','A pesquisadora dedica-se a investigar os efeitos da medida.','La investigadora se dedica a estudiar los efectos de la medida.'),
vocab(16,7,'dar-se conta de','darse cuenta de','Os gestores deram-se conta de que o prazo era insuficiente.','Los gestores se dieron cuenta de que el plazo era insuficiente.'),
vocab(16,8,'arrepender-se de','arrepentirse de','A equipe se arrependeu de ter divulgado os números sem revisão.','El equipo se arrepintió de haber divulgado las cifras sin revisión.'),
vocab(16,9,'prestar-se a','prestarse a','A expressão presta-se a interpretações diferentes.','La expresión se presta a interpretaciones diferentes.'),
vocab(16,10,'esforçar-se para','esforzarse por','A equipe se esforçou para cumprir o cronograma.','El equipo se esforzó por cumplir el cronograma.')
];
const u17=[
vocab(17,1,'estar prestes a','estar a punto de','A equipe está prestes a divulgar o relatório final.','El equipo está a punto de divulgar el informe final.'),
vocab(17,2,'vir a ser','llegar a ser','A proposta veio a ser uma referência para outros projetos.','La propuesta llegó a ser una referencia para otros proyectos.'),
vocab(17,3,'passar a','pasar a','O setor passou a adotar critérios mais transparentes.','El sector pasó a adoptar criterios más transparentes.'),
vocab(17,4,'deixar de','dejar de','A empresa deixou de utilizar o sistema antigo.','La empresa dejó de utilizar el sistema antiguo.'),
vocab(17,5,'continuar a','seguir','O serviço continua a funcionar durante a manutenção.','El servicio sigue funcionando durante el mantenimiento.'),
vocab(17,6,'ter de','tener que','Os responsáveis têm de apresentar justificativas.','Los responsables tienen que presentar justificaciones.'),
vocab(17,7,'haver de','haber de','A instituição há de publicar os resultados após a revisão.','La institución habrá de publicar los resultados después de la revisión.'),
vocab(17,8,'acabar por','terminar por','A negociação acabou por produzir um acordo.','La negociación terminó por producir un acuerdo.'),
vocab(17,9,'poder vir a','poder llegar a','A mudança pode vir a afetar outras regiões.','El cambio puede llegar a afectar a otras regiones.'),
vocab(17,10,'tender a','tender a','O custo tende a aumentar no segundo semestre.','El costo tiende a aumentar en el segundo semestre.')
];
const u18=[
vocab(18,1,'tomar uma decisão','tomar una decisión','A diretoria tomou uma decisão após ouvir as equipes.','La dirección tomó una decisión después de escuchar a los equipos.'),
vocab(18,2,'assumir um compromisso','asumir un compromiso','A empresa assumiu um compromisso público com a transparência.','La empresa asumió un compromiso público con la transparencia.'),
vocab(18,3,'prestar esclarecimentos','dar explicaciones','A secretaria prestou esclarecimentos sobre os critérios adotados.','La secretaría dio explicaciones sobre los criterios adoptados.'),
vocab(18,4,'formular uma hipótese','formular una hipótesis','A equipe formulou uma hipótese para explicar a divergência.','El equipo formuló una hipótesis para explicar la discrepancia.'),
vocab(18,5,'dar prosseguimento','dar continuidad','O conselho deu prosseguimento à análise do pedido.','El consejo dio continuidad al análisis de la solicitud.'),
vocab(18,6,'firmar um acordo','firmar un acuerdo','As partes firmaram um acordo por escrito.','Las partes firmaron un acuerdo por escrito.'),
vocab(18,7,'emitir um parecer','emitir un dictamen','O setor técnico emitiu um parecer favorável.','El área técnica emitió un dictamen favorable.'),
vocab(18,8,'apresentar recurso','presentar un recurso','A organização apresentou recurso dentro do prazo previsto.','La organización presentó un recurso dentro del plazo previsto.'),
vocab(18,9,'adotar providências','adoptar medidas','A instituição adotou providências para corrigir a falha.','La institución adoptó medidas para corregir el fallo.'),
vocab(18,10,'exercer influência','ejercer influencia','A publicidade exerce influência sobre o comportamento de consumo.','La publicidad ejerce influencia sobre el comportamiento de consumo.')
];
const unit16=makeUnit(16,'Verbos pronominales y matices aspectuales','Distingue verbos pronominales, fija sus preposiciones y explica cómo la presencia del pronombre modifica el significado o la perspectiva.','Los verbos pronominales pueden expresar una acción reflexiva, una experiencia o un significado léxico propio. Deparar-se com y ater-se a exigen preposiciones concretas; valer-se de y abster-se de expresan uso y abstención; recusar-se a y dedicar-se a presentan disposición o dedicación. Dar-se conta de y arrepender-se de describen una toma de conciencia y una valoración retrospectiva. Prestar-se a indica adecuación o posibilidad, mientras esforçar-se para expresa esfuerzo orientado a un fin. El pronombre concuerda con el sujeto y no siempre equivale a un reflexivo literal.','No traduzcas el pronombre se de forma automática','Algunos verbos son pronominales por su significado y régimen: ater-se a no significa simplemente atar algo a sí mismo. Aprende cada verbo con su preposición y comprueba si el pronombre forma parte de la construcción.',u16,[
['Lección 1: Encontrar y ceñirse a','Relata un hallazgo inesperado y delimita los hechos que se toman como base.','Deparar-se com expresa encontrarse con una situación; ater-se a indica ceñirse a un conjunto limitado de hechos o criterios.',[0,1],['ptbr_a2_u22_v01','ptbr_a2_u22_v02']],
['Lección 2: Utilizar o abstenerse de utilizar','Explica el uso de recursos y la decisión de no realizar una acción.','Valer-se de significa utilizar un recurso como apoyo; abster-se de expresa la decisión de no realizar una acción.',[2,3],['ptbr_a2_u22_v03','ptbr_a2_u22_v04']],
['Lección 3: Rechazar y dedicarse a una actividad','Contrasta una negativa explícita con una actividad a la que alguien dedica su trabajo.','Recusar-se a introduce una negativa seguida de infinitivo; dedicar-se a expresa dedicación y mantiene la preposición a.',[4,5],['ptbr_a2_u22_v05','ptbr_a2_u22_v06']],
['Lección 4: Tomar conciencia y lamentar una acción','Describe el momento en que alguien reconoce una situación y evalúa una decisión pasada.','Dar-se conta de presenta una toma de conciencia; arrepender-se de expresa pesar por una acción o decisión anterior.',[6,7],['ptbr_a2_u22_v07','ptbr_a2_u22_v08']],
['Lección 5: Expresar adecuación y esfuerzo','Evalúa si una expresión permite varias lecturas y describe el esfuerzo para alcanzar un objetivo.','Prestar-se a indica que algo se presta a una interpretación o uso; esforçar-se para presenta un esfuerzo orientado a un resultado.',[8,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
const unit17=makeUnit(17,'Perífrasis verbales y modalidad','Expresa inminencia, cambio de hábito, continuidad, obligación, expectativa y probabilidad mediante perífrasis verbales.','Las perífrasis combinan un verbo auxiliar o semiauxiliar con infinitivo para aportar aspecto o modalidad. Estar prestes a marca inminencia; vir a ser puede presentar un resultado alcanzado; passar a y deixar de señalan inicio y cese de una conducta. Continuar a expresa continuidad. Ter de marca obligación y haver de puede expresar expectativa o compromiso en un registro formal. Acabar por presenta un desenlace; poder vir a y tender a expresan posibilidad y tendencia. El contexto determina si la perífrasis se refiere a una obligación, una previsión o un cambio efectivo.','No confundas posibilidad, obligación y resultado','Ter de expresa una obligación más fuerte que poder vir a, que solo plantea una posibilidad. Acabar por presenta un resultado que finalmente ocurre; estar prestes a anuncia algo inminente, pero no confirma que ya haya sucedido.',u17,[
['Lección 1: Expresar inminencia y resultado','Distingue un acontecimiento que está a punto de ocurrir de un resultado que llegó a concretarse.','Estar prestes a expresa inminencia; vir a ser presenta un resultado o una identidad alcanzada después de un proceso.',[0,1],['ptbr_a2_u22_v01','ptbr_a2_u22_v02']],
['Lección 2: Marcar el inicio y el cese','Describe el momento en que una práctica comienza o deja de realizarse.','Passar a indica el inicio de una nueva conducta; deixar de expresa el cese de una acción o hábito.',[2,3],['ptbr_a2_u22_v03','ptbr_a2_u22_v04']],
['Lección 3: Expresar continuidad y obligación','Señala una actividad que continúa y una exigencia que debe cumplirse.','Continuar a expresa continuidad; ter de presenta una obligación o necesidad que recae sobre el sujeto.',[4,5],['ptbr_a2_u22_v05','ptbr_a2_u22_v06']],
['Lección 4: Formular expectativas y desenlaces','Presenta una expectativa formal y un resultado al que finalmente se llega.','Haver de puede expresar expectativa o compromiso; acabar por introduce un desenlace que termina produciéndose.',[6,7],['ptbr_a2_u22_v07','ptbr_a2_u22_v08']],
['Lección 5: Matizar posibilidad y tendencia','Explica un efecto que podría producirse y una evolución que suele observarse.','Poder vir a expresa una posibilidad futura; tender a presenta una inclinación o regularidad, no una certeza absoluta.',[8,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
const unit18=makeUnit(18,'Colocaciones verbo-nominales','Utiliza combinaciones frecuentes de verbo y sustantivo en contextos institucionales, académicos y profesionales con mayor precisión léxica.','Las colocaciones verbo-nominales son combinaciones convencionales cuyo sentido no siempre se deduce de cada palabra por separado. Tomar uma decisão y assumir um compromisso organizan acciones institucionales; prestar esclarecimentos y emitir um parecer aparecen en contextos formales. Formular uma hipótese pertenece al discurso académico; dar prosseguimento y firmar um acordo organizan procesos y negociaciones. Apresentar recurso, adotar providências y exercer influência tienen restricciones de uso y registro que conviene aprender como unidades completas.','No sustituyas el verbo por un sinónimo al azar','En portugués se dice prestar esclarecimentos y emitir um parecer, no cualquier combinación literal con dar o hacer. Aprende el sustantivo con su verbo habitual y observa las preposiciones que exige la expresión completa.',u18,[
['Lección 1: Decidir y comprometerse','Describe una decisión institucional y un compromiso asumido públicamente.','Tomar uma decisão presenta el acto de decidir; assumir um compromisso expresa aceptar una responsabilidad o promesa.',[0,1],['ptbr_a2_u22_v01','ptbr_a2_u22_v02']],
['Lección 2: Explicar y formular una hipótesis','Da explicaciones sobre un procedimiento y presenta una hipótesis para interpretar datos.','Prestar esclarecimentos significa ofrecer explicaciones; formular uma hipótese presenta una propuesta explicativa que debe comprobarse.',[2,3],['ptbr_a2_u22_v03','ptbr_a2_u22_v04']],
['Lección 3: Continuar un proceso y acordar','Explica cómo una institución continúa un análisis y cómo dos partes formalizan un acuerdo.','Dar prosseguimento significa dar continuidad a un proceso; firmar um acordo formaliza un compromiso entre partes.',[4,5],['ptbr_a2_u22_v05','ptbr_a2_u22_v06']],
['Lección 4: Emitir evaluaciones y presentar recursos','Describe un dictamen técnico y una impugnación presentada dentro del plazo.','Emitir um parecer significa producir una evaluación formal; apresentar recurso indica solicitar la revisión de una decisión.',[6,7],['ptbr_a2_u22_v07','ptbr_a2_u22_v08']],
['Lección 5: Adoptar medidas y ejercer influencia','Explica medidas correctivas y la influencia de un factor sobre el comportamiento.','Adotar providências expresa poner en marcha medidas; exercer influência indica afectar decisiones o comportamientos.',[8,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['16-18']={units:[unit16,unit17,unit18]};
})(typeof window!=='undefined'?window:globalThis);
