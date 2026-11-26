(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta la expresión dentro del contexto completo, no como una traducción aislada.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((_,i)=>exercise(words,i))
});
const u1=[
vocab(1,1,'ao que tudo indica','por lo que todo indica','Ao que tudo indica, a medida terá efeito limitado.','Por lo que todo indica, la medida tendrá un efecto limitado.'),
vocab(1,2,'aparentemente','aparentemente','Aparentemente, os dados não confirmam a hipótese.','Aparentemente, los datos no confirman la hipótesis.'),
vocab(1,3,'supostamente','supuestamente','Supostamente, o contrato seria renovado neste mês.','Supuestamente, el contrato sería renovado este mes.'),
vocab(1,4,'em princípio','en principio','Em princípio, a proposta é viável para os dois lados.','En principio, la propuesta es viable para ambas partes.'),
vocab(1,5,'até certo ponto','hasta cierto punto','A solução funciona até certo ponto, mas não resolve a causa.','La solución funciona hasta cierto punto, pero no resuelve la causa.'),
vocab(1,6,'não necessariamente','no necesariamente','A mudança não necessariamente reduzirá os custos.','El cambio no necesariamente reducirá los costos.'),
vocab(1,7,'dificilmente','difícilmente','Dificilmente haverá consenso sem diálogo.','Difícilmente habrá consenso sin diálogo.'),
vocab(1,8,'de fato','de hecho / efectivamente','De fato, o relatório apresenta uma tendência consistente.','De hecho, el informe presenta una tendencia consistente.'),
vocab(1,9,'em última análise','en última instancia','Em última análise, a decisão depende do conselho.','En última instancia, la decisión depende del consejo.'),
vocab(1,10,'por ora','por ahora','Por ora, os resultados permanecem inconclusivos.','Por ahora, los resultados siguen siendo inconclusos.')
];
const u2=[
vocab(2,1,'segundo o levantamento','según el estudio / sondeo','Segundo o levantamento, a procura cresceu no último trimestre.','Según el estudio, la demanda creció en el último trimestre.'),
vocab(2,2,'de acordo com','de acuerdo con','De acordo com os dados disponíveis, o cenário é estável.','De acuerdo con los datos disponibles, el panorama es estable.'),
vocab(2,3,'conforme','conforme / según','Conforme o relatório, houve redução no consumo de energia.','Según el informe, hubo una reducción en el consumo de energía.'),
vocab(2,4,'a pesquisa aponta que','la investigación señala que','A pesquisa aponta que o acesso ainda é desigual.','La investigación señala que el acceso todavía es desigual.'),
vocab(2,5,'corroborar','corroborar / respaldar','Os novos resultados corroboram a hipótese inicial.','Los nuevos resultados respaldan la hipótesis inicial.'),
vocab(2,6,'divergir','diferir / discrepar','A conclusão diverge da análise apresentada anteriormente.','La conclusión difiere del análisis presentado anteriormente.'),
vocab(2,7,'ressalvar','hacer la salvedad de / advertir','É preciso ressalvar que a amostra foi pequena.','Es preciso advertir que la muestra fue pequeña.'),
vocab(2,8,'evidenciar','poner en evidencia / demostrar','Os indicadores evidenciam uma mudança gradual.','Los indicadores ponen en evidencia un cambio gradual.'),
vocab(2,9,'pressuposto','supuesto / premisa','O estudo parte do pressuposto de que todos tiveram acesso.','El estudio parte de la premisa de que todos tuvieron acceso.'),
vocab(2,10,'em consonância com','en consonancia con','Em consonância com as recomendações, a equipe revisou o processo.','En consonancia con las recomendaciones, el equipo revisó el proceso.')
];
const u3=[
vocab(3,1,'ainda que','aunque / aun cuando','Ainda que os custos tenham aumentado, o projeto continua viável.','Aunque los costos hayan aumentado, el proyecto sigue siendo viable.'),
vocab(3,2,'por mais que','por mucho que','Por mais que a proposta pareça simples, sua execução exige cuidado.','Por más que la propuesta parezca sencilla, su ejecución exige cuidado.'),
vocab(3,3,'não obstante','no obstante','Não obstante as dificuldades, a equipe concluiu o trabalho.','No obstante las dificultades, el equipo terminó el trabajo.'),
vocab(3,4,'em contrapartida','en cambio / por contrapartida','A primeira opção é mais rápida; em contrapartida, a segunda custa menos.','La primera opción es más rápida; en cambio, la segunda cuesta menos.'),
vocab(3,5,'longe de','lejos de','Longe de resolver o problema, a medida ampliou a desigualdade.','Lejos de resolver el problema, la medida amplió la desigualdad.'),
vocab(3,6,'refutar','refutar','Os dados refutam a interpretação apresentada no início.','Los datos refutan la interpretación presentada al principio.'),
vocab(3,7,'contestar','cuestionar / impugnar','A comissão contestou os critérios adotados na avaliação.','La comisión cuestionó los criterios adoptados en la evaluación.'),
vocab(3,8,'contrapor','contraponer','O relatório contrapõe duas perspectivas sobre o mesmo fenômeno.','El informe contrapone dos perspectivas sobre el mismo fenómeno.'),
vocab(3,9,'ressalvado','salvo / exceptuado','Ressalvado o prazo, os demais termos foram aceitos.','Salvo el plazo, los demás términos fueron aceptados.'),
vocab(3,10,'sob essa ótica','desde esa perspectiva','Sob essa ótica, a decisão precisa ser reavaliada.','Desde esa perspectiva, la decisión debe reevaluarse.')
];
const unit1=makeUnit(1,'Modalización y postura del hablante','Expresa distintos grados de certeza, limita el alcance de una afirmación y diferencia hechos, hipótesis y evaluaciones.','En B2 no basta con afirmar o negar: el hablante gradúa su compromiso. Los marcadores pueden presentar una conclusión como probable, provisional, limitada o basada en evidencia. Su posición y alcance cambian el tono del enunciado.','Certeza no es lo mismo que evidencia','Aparentemente y supostamente no garantizan que algo sea cierto. Em princípio limita la afirmación a una valoración inicial; de fato presenta algo como efectivo. No necesariamente evita convertir una tendencia en una regla absoluta.',u1,[
['Lección 1: Presentar una inferencia','Formula una conclusión prudente a partir de indicios.','Ao que tudo indica introduce una inferencia basada en lo observado; aparentemente presenta una impresión que todavía puede revisarse.',[0,1],['ptbr_a2_u27_v01','ptbr_a2_u27_v02']],
['Lección 2: Atribuir información no confirmada','Distingue una afirmación atribuida de un hecho comprobado.','Supostamente marca distancia respecto de una información no confirmada. Em princípio presenta una valoración inicial que todavía puede cambiar; no debe usarse como equivalente automático de aparentemente.',[2,3],['ptbr_a2_u27_v03']],
['Lección 3: Limitar una afirmación','Expresa acuerdos parciales y evita generalizaciones.','Em princípio señala una evaluación inicial; até certo ponto limita el alcance de lo afirmado y suele preparar una reserva. Não necessariamente evita generalizar el resultado: el cambio puede no producir siempre el efecto esperado.',[4,5],['ptbr_a2_u30_v05']],
['Lección 4: Evaluar probabilidad y evidencia','Valora qué tan probable es un resultado y qué datos lo respaldan.','Dificilmente expresa baja probabilidad. De fato refuerza una afirmación presentada como efectiva; no sustituye la evidencia que debe respaldarla.',[6,7],['ptbr_a2_u27_v04']],
['Lección 5: Cerrar una valoración','Resume una conclusión general y distingue lo provisional de lo definitivo.','Em última análise introduce una consideración final o fundamental; por ora limita la validez temporal de una conclusión.',[8,9],['ptbr_a2_u30_v08']]
]);
const unit2=makeUnit(2,'Síntesis y atribución de fuentes','Resume hallazgos, atribuye afirmaciones y compara conclusiones sin confundir la voz propia con la de una fuente.','Para sintetizar, atribuye el contenido con segundo, de acordo com y conforme. Verbos como apontar, corroborar, divergir y evidenciar describen relaciones entre datos y conclusiones. Ressalvar permite señalar límites metodológicos.','Atribuir no es confirmar','Segundo o relatório identifica la fuente de una afirmación; no significa que el hablante la haya verificado. Corroborar requiere evidencia compatible, mientras divergir expresa diferencia y ressalvar introduce una limitación relevante.',u2,[
['Lección 1: Atribuir una afirmación','Indica de qué fuente procede una información.','Segundo o levantamento, de acordo com y conforme atribuyen una afirmación a una fuente. La elección debe mantener clara la procedencia de los datos.',[0,1],['ptbr_a2_u10_v01','ptbr_a2_u10_v03']],
['Lección 2: Parafrasear resultados','Reformula un hallazgo sin copiar la formulación original.','Conforme puede introducir una síntesis atribuida. A pesquisa aponta que presenta el resultado central de un estudio sin convertirlo en una certeza universal.',[2,3],['ptbr_a2_u10_v02']],
['Lección 3: Comparar conclusiones','Explica si dos resultados se apoyan o se contradicen.','Corroborar indica que una evidencia respalda otra; divergir señala que dos análisis llegan a conclusiones distintas.',[4,5],['ptbr_a2_u24_v03']],
['Lección 4: Señalar límites metodológicos','Añade una reserva sobre el alcance de una investigación.','Ressalvar introduce una advertencia o límite; evidenciar presenta datos que hacen visible una tendencia, sin implicar causalidad por sí sola.',[6,7],['ptbr_a2_u24_v04']],
['Lección 5: Examinar premisas y coherencia','Identifica la premisa de un argumento y evalúa su consistencia.','Pressuposto nombra una premisa que se toma como punto de partida. Em consonância com indica compatibilidad con una regla, evidencia o recomendación.',[8,9],['ptbr_a2_u24_v06']]
]);
const unit3=makeUnit(3,'Concesión y refutación matizada','Reconoce una objeción, concede parte de su validez y construye una respuesta que limita o refuta la conclusión contraria.','Las construcciones concesivas permiten mantener una tesis pese a un obstáculo: ainda que y por mais que suelen introducir el subjuntivo cuando presentan una situación no asumida como hecho. Não obstante y em contrapartida organizan el contraste; refutar, contestar y contrapor describen operaciones argumentativas distintas.','Conceder no significa rendirse','Ainda que presenta una dificultad que no impide la conclusión principal. Em contrapartida compara dos aspectos; longe de puede negar que una medida produzca el resultado esperado. Refutar exige argumentos o pruebas, no solo desacuerdo.',u3,[
['Lección 1: Conceder una dificultad','Reconoce un obstáculo sin abandonar la idea principal.','Ainda que introduce una concesión; en el ejemplo aparece con subjuntivo (tenham aumentado) porque el aumento se presenta como marco concedido, no como foco de la afirmación. Por mais que intensifica esa concesión y suele presentar una dificultad que no cambia la conclusión principal.',[0,1],['ptbr_a2_u27_v03','ptbr_a2_u27_v04']],
['Lección 2: Mantener una tesis pese a una objeción','Formula una conclusión que se mantiene a pesar de una dificultad.','Por mais que intensifica la concesión. Não obstante introduce una reserva o contraste y puede aparecer al comienzo de un segmento nominal o de una oración. Longe de niega que una medida haya producido el resultado esperado.',[2,4],['ptbr_a2_u20_v04']],
['Lección 3: Contrastar alternativas','Compara ventajas, límites y resultados opuestos.','Em contrapartida presenta el otro lado de una comparación; no es un sinónimo exacto de porém, pues suele establecer correspondencia entre dos aspectos. Sob essa ótica introduce el punto de vista desde el que se evalúa la situación.',[3,9],['ptbr_a2_u20_v05']],
['Lección 4: Cuestionar una interpretación','Distingue entre refutar una tesis y cuestionar sus fundamentos.','Refutar es mostrar que una afirmación no se sostiene; contestar cuestiona o impugna una decisión, criterio o argumento. La fuerza de la conclusión depende de la evidencia.',[5,6],['ptbr_a2_u10_v06']],
['Lección 5: Contraponer perspectivas','Organiza dos interpretaciones y delimita el alcance de cada una.','Contrapor presenta perspectivas en contraste. Ressalvado introduce una excepción o condición que debe quedar explícita para no generalizar la conclusión.',[7,8],['ptbr_a2_u27_v02']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['01-03']={units:[unit1,unit2,unit3]};
})(typeof window!=='undefined'?window:globalThis);
