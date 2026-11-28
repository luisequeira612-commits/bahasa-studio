(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta la relación entre las acciones y el resultado dentro del contexto completo.'};
};
const orderExercise=(word,index)=>{
 const correctOrder=word.ex.replace(/[.,!?;:]/g,'').trim().split(/\s+/).filter(Boolean);
 const offset=(index%(correctOrder.length-1))+1;
 let words=correctOrder.slice(offset).concat(correctOrder.slice(0,offset));
 if(words.join(' ')===correctOrder.join(' '))words=correctOrder.slice().reverse();
 return {vocabId:word.id,type:'order',prompt:'Reconstruye el ejemplo que ilustra «'+word.target+'».',words,correctOrder,explanation:'Ordena las palabras para reconstruir el ejemplo en portugués brasileño.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((word,i)=>orderExercise(word,i))
});
const u13=[
vocab(13,1,'em decorrência de','como consecuencia de','Em decorrência da mudança, o cronograma precisou ser revisto.','Como consecuencia del cambio, fue necesario revisar el cronograma.'),
vocab(13,2,'por conseguinte','por consiguiente','Os dados não foram atualizados; por conseguinte, a comparação ficou limitada.','Los datos no se actualizaron; por consiguiente, la comparación quedó limitada.'),
vocab(13,3,'devido ao fato de que','debido al hecho de que','A análise foi adiada devido ao fato de que faltavam documentos.','El análisis se aplazó debido al hecho de que faltaban documentos.'),
vocab(13,4,'com vistas a','con miras a','A equipe reorganizou o processo com vistas a reduzir os atrasos.','El equipo reorganizó el proceso con miras a reducir los retrasos.'),
vocab(13,5,'a fim de que','a fin de que','Foram criados novos critérios a fim de que a seleção fosse mais transparente.','Se crearon nuevos criterios a fin de que la selección fuera más transparente.'),
vocab(13,6,'de modo que','de modo que / de manera que','O prazo foi ampliado, de modo que todos pudessem concluir a inscrição.','El plazo se amplió, de modo que todos pudieran completar la inscripción.'),
vocab(13,7,'em virtude de','en virtud de / debido a','Em virtude das novas regras, alguns procedimentos foram alterados.','En virtud de las nuevas reglas, algunos procedimientos fueron modificados.'),
vocab(13,8,'por essa razão','por esa razón','O método apresentou limitações; por essa razão, foi substituído.','El método presentó limitaciones; por esa razón, fue sustituido.'),
vocab(13,9,'na medida em que','en la medida en que','A proposta ganha relevância na medida em que responde a uma demanda concreta.','La propuesta gana relevancia en la medida en que responde a una demanda concreta.'),
vocab(13,10,'com o propósito de','con el propósito de','A instituição revisou o regulamento com o propósito de esclarecer as responsabilidades.','La institución revisó el reglamento con el propósito de aclarar las responsabilidades.')
];
const u14=[
vocab(14,1,'permanece inalterado','permanece inalterado','O objetivo principal permanece inalterado apesar dos ajustes.','El objetivo principal permanece inalterado a pesar de los ajustes.'),
vocab(14,2,'ficou comprometido','quedó comprometido','O cronograma ficou comprometido após a interrupção do serviço.','El cronograma quedó comprometido después de la interrupción del servicio.'),
vocab(14,3,'foi restabelecido','fue restablecido','O acesso ao sistema foi restabelecido no início da tarde.','El acceso al sistema fue restablecido a primera hora de la tarde.'),
vocab(14,4,'encontra-se suspenso','se encuentra suspendido','O procedimento encontra-se suspenso até a conclusão da análise.','El procedimiento se encuentra suspendido hasta que concluya el análisis.'),
vocab(14,5,'continua pendente','continúa pendiente','A aprovação continua pendente de parecer técnico.','La aprobación continúa pendiente de un dictamen técnico.'),
vocab(14,6,'foi concluído','fue concluido / se concluyó','O levantamento foi concluído dentro do prazo previsto.','El relevamiento se concluyó dentro del plazo previsto.'),
vocab(14,7,'ficou registrado','quedó registrado','Ficou registrado em ata que a decisão seria reavaliada.','Quedó registrado en acta que la decisión sería reevaluada.'),
vocab(14,8,'segue disponível','sigue disponible','O relatório segue disponível para consulta pública.','El informe sigue disponible para consulta pública.'),
vocab(14,9,'encontra-se em vigor','se encuentra en vigor','A norma encontra-se em vigor desde o início do ano.','La norma se encuentra en vigor desde el inicio del año.'),
vocab(14,10,'foi considerado inválido','fue considerado inválido','O documento foi considerado inválido por falta de assinatura.','El documento fue considerado inválido por falta de firma.')
];
const u15=[
vocab(15,1,'considerando os dados','considerando los datos','Considerando os dados disponíveis, a equipe recomendou uma revisão.','Considerando los datos disponibles, el equipo recomendó una revisión.'),
vocab(15,2,'levando em conta','teniendo en cuenta','Levando em conta os custos indiretos, a segunda opção é mais adequada.','Teniendo en cuenta los costos indirectos, la segunda opción es más adecuada.'),
vocab(15,3,'tendo em vista','teniendo en vista / dado que','Tendo em vista a complexidade do caso, a decisão foi adiada.','Dada la complejidad del caso, la decisión fue aplazada.'),
vocab(15,4,'ao analisar','al analizar','Ao analisar os resultados, os pesquisadores identificaram uma diferença.','Al analizar los resultados, los investigadores identificaron una diferencia.'),
vocab(15,5,'por se tratar de','por tratarse de','Por se tratar de um procedimento excepcional, a autorização foi revista.','Por tratarse de un procedimiento excepcional, se revisó la autorización.'),
vocab(15,6,'sem comprometer','sin comprometer','A mudança foi aplicada sem comprometer a segurança do sistema.','El cambio se aplicó sin comprometer la seguridad del sistema.'),
vocab(15,7,'fazendo com que','haciendo que','A falha interrompeu o fluxo, fazendo com que a equipe retomasse a etapa anterior.','El fallo interrumpió el flujo, haciendo que el equipo retomara la etapa anterior.'),
vocab(15,8,'ao mesmo tempo em que','al mismo tiempo que','O relatório apresenta os avanços ao mesmo tempo em que reconhece as limitações.','El informe presenta los avances al mismo tiempo que reconoce las limitaciones.'),
vocab(15,9,'mantendo-se','manteniéndose','A regra foi atualizada, mantendo-se os critérios de transparência.','La regla fue actualizada, manteniéndose los criterios de transparencia.'),
vocab(15,10,'estando sujeito a','estando sujeto a','O benefício é temporário, estando sujeito a uma avaliação periódica.','El beneficio es temporal y está sujeto a una evaluación periódica.')
];
const unit13=makeUnit(13,'Causa, consecuencia y finalidad en registro formal','Construye cadenas argumentales complejas y distingue la causa de un hecho, su consecuencia y el propósito de una medida.','Las relaciones causales, consecutivas y finales no son intercambiables. Em decorrência de y em virtude de introducen causas; por conseguinte y por essa razão presentan consecuencias; com vistas a y com o propósito de expresan finalidad. A fim de que y de modo que pueden introducir resultados o propósitos según el modo verbal y el contexto. Na medida em que puede expresar una relación causal o una condición de validez, por lo que exige precisión.', 'No confundas causa, consecuencia y finalidad','Una causa explica por qué ocurrió algo; una consecuencia presenta lo que se deriva; una finalidad expresa lo que se busca conseguir. Comprueba el vínculo lógico y el modo verbal de la subordinada.',u13,[
['Lección 1: Explicar causas formales','Relaciona un cambio o una norma con el hecho que lo provoca.','Em decorrência de introduce la causa de un resultado; devido ao fato de que presenta una causa en una oración subordinada.',[0,2],['ptbr_a2_u22_v01','ptbr_a2_u22_v02']],
['Lección 2: Formular consecuencias','Presenta una conclusión derivada de datos o limitaciones previas.','Por conseguinte y por essa razão introducen consecuencias; la segunda expresión recupera una causa que ya se ha explicado.',[1,7],['ptbr_a2_u22_v03','ptbr_a2_u22_v04']],
['Lección 3: Expresar finalidades institucionales','Explica qué objetivo persigue una medida o reorganización.','Com vistas a y com o propósito de introducen finalidades; suelen ir seguidos de infinitivo cuando el sujeto de la acción se mantiene.',[3,9],['ptbr_a2_u22_v05','ptbr_a2_u22_v06']],
['Lección 4: Construir subordinadas finales y consecutivas','Distingue una finalidad con subjuntivo de un resultado o consecuencia contextual.','A fim de que suele introducir finalidad con subjuntivo; de modo que puede expresar finalidad o consecuencia y se interpreta según el contexto.',[4,5],['ptbr_a2_u22_v07','ptbr_a2_u22_v08']],
['Lección 5: Matizar relaciones causales','Explica una relación causal y las condiciones bajo las que una propuesta cobra relevancia.','Em virtude de presenta una causa; na medida em que puede señalar causa o condición y requiere que la relación sea explícita.',[6,8],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
const unit14=makeUnit(14,'Participios y construcciones resultativas','Describe estados derivados de procesos y diferencia la acción realizada del estado que permanece como resultado.','Las construcciones resultativas combinan ser, estar, ficar, permanecer, seguir o encontrar-se con un participio o adjetivo. Foi restabelecido y foi concluído presentan acciones en pasiva; permanece inalterado, continua pendente y segue disponível describen estados vigentes. El participio concuerda con el sujeto cuando funciona como adjetivo o parte de la pasiva, y la elección del auxiliar cambia el foco temporal y aspectual.', 'No todo participio describe un estado permanente','Foi concluído presenta un acontecimiento terminado; permanece inalterado describe continuidad del estado. Ficar puede destacar el resultado de un cambio y encontrar-se presenta una situación en un registro más formal.',u14,[
['Lección 1: Describir continuidad y cambio','Distingue un estado que continúa de un resultado que quedó afectado.','Permanece inalterado presenta continuidad; ficou comprometido destaca el estado resultante de un cambio o una interrupción.',[0,1],['ptbr_a2_u22_v01','ptbr_a2_u22_v02']],
['Lección 2: Informar restablecimiento y suspensión','Expresa si un proceso fue reanudado o sigue detenido.','Foi restabelecido presenta una acción concluida; encontra-se suspenso describe el estado vigente de un procedimiento.',[2,3],['ptbr_a2_u22_v03','ptbr_a2_u22_v04']],
['Lección 3: Indicar asuntos pendientes y concluidos','Contrasta una tarea que todavía espera resolución con otra que ya terminó.','Continua pendente describe una situación no resuelta; foi concluído presenta un proceso como terminado.',[4,5],['ptbr_a2_u22_v05','ptbr_a2_u22_v06']],
['Lección 4: Registrar decisiones y disponibilidad','Describe un hecho asentado en acta y un recurso que sigue accesible.','Ficou registrado presenta el resultado de dejar constancia; segue disponível expresa que la disponibilidad continúa.',[6,7],['ptbr_a2_u22_v07','ptbr_a2_u22_v08']],
['Lección 5: Comunicar vigencia e invalidez','Distingue una norma vigente de un documento al que se negó validez.','Encontra-se em vigor presenta la vigencia actual de una norma; foi considerado inválido informa una valoración institucional concluida.',[8,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10']]
]);
const unit15=makeUnit(15,'Gerundio y relaciones entre acciones','Expresa simultaneidad, modo, causa y consecuencia entre acciones, evitando gerundios que atribuyan una relación temporal o lógica incorrecta.','El gerundio puede expresar simultaneidad, modo o una acción vinculada a la principal, pero no debe usarse automáticamente para cualquier acción posterior. Considerando os dados y levando em conta introducen un marco de evaluación; fazendo com que presenta una consecuencia; mantendo-se puede expresar una condición que continúa. Ao analisar y por se tratar de organizan relaciones con infinitivo; estando sujeito a describe una condición vinculada al sujeto.', 'El gerundio no debe sustituir cualquier oración subordinada','Comprueba quién realiza la acción del gerundio y si la relación es simultánea, modal o consecutiva. Evita un gerundio que parezca expresar una acción posterior independiente sin una relación clara.',u15,[
['Lección 1: Introducir criterios de análisis','Presenta los datos o factores que se tienen en cuenta antes de una conclusión.','Considerando os dados y levando em conta introducen un marco desde el que se evalúa la información; no expresan necesariamente una acción posterior.',[0,1],['ptbr_a2_u22_v01','ptbr_a2_u22_v02']],
['Lección 2: Explicar motivos y condiciones','Relaciona la complejidad de un caso con la decisión tomada.','Tendo em vista presenta un factor considerado; por se tratar de introduce una explicación causal mediante una construcción de infinitivo.',[2,4],['ptbr_a2_u22_v03','ptbr_a2_u22_v04']],
['Lección 3: Situar una acción de análisis','Expresa qué sucede durante una operación de análisis y qué se evita afectar.','Ao analisar introduce una acción que sirve de marco temporal; sem comprometer indica una condición que se preserva durante el cambio.',[3,5],['ptbr_a2_u22_v05','ptbr_a2_u22_v06']],
['Lección 4: Expresar consecuencias y simultaneidad','Conecta una interrupción con su efecto y dos acciones que ocurren en paralelo.','Fazendo com que presenta una consecuencia; ao mesmo tempo em que expresa simultaneidad o contraste entre dos acciones.',[6,7],['ptbr_a2_u22_v07','ptbr_a2_u22_v08']],
['Lección 5: Mantener condiciones durante un proceso','Recupera transparência en un ejemplo de continuidad de condiciones.','Mantendo-se expresa continuidad de una condición; en el ejemplo, transparência es un sustantivo ya estudiado en B1 U11. Estando sujeito a añade una condición que afecta al elemento descrito.',[8,9],['ptbr_a2_u22_v09','ptbr_a2_u22_v10','ptbr_b1_u11_v06']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['13-15']={units:[unit13,unit14,unit15]};
})(typeof window!=='undefined'?window:globalThis);
