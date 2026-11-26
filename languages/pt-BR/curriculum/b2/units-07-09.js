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
const u7=[
vocab(7,1,'é fundamental que','es fundamental que','É fundamental que a equipe revise os dados antes da publicação.','Es fundamental que el equipo revise los datos antes de la publicación.'),
vocab(7,2,'é provável que','es probable que','É provável que os resultados mudem após a nova análise.','Es probable que los resultados cambien después del nuevo análisis.'),
vocab(7,3,'é lamentável que','es lamentable que','É lamentável que o serviço não funcione em todas as regiões.','Es lamentable que el servicio no funcione en todas las regiones.'),
vocab(7,4,'duvido que','dudo que','Duvido que a proposta resolva o problema por completo.','Dudo que la propuesta resuelva el problema por completo.'),
vocab(7,5,'não acredito que','no creo que','Não acredito que essa medida seja suficiente por si só.','No creo que esa medida sea suficiente por sí sola.'),
vocab(7,6,'é compreensível que','es comprensible que','É compreensível que os moradores estejam preocupados.','Es comprensible que los vecinos estén preocupados.'),
vocab(7,7,'causa estranheza que','resulta extraño que','Causa estranheza que o relatório omita essa informação.','Resulta extraño que el informe omita esa información.'),
vocab(7,8,'é recomendável que','es recomendable que','É recomendável que todos leiam as orientações com atenção.','Es recomendable que todos lean las instrucciones con atención.'),
vocab(7,9,'não há indícios de que','no hay indicios de que','Não há indícios de que a falha tenha sido intencional.','No hay indicios de que el fallo haya sido intencional.'),
vocab(7,10,'convém que','conviene que','Convém que a comissão avalie os efeitos antes de decidir.','Conviene que la comisión evalúe los efectos antes de decidir.')
];
const u8=[
vocab(8,1,'se tivesse previsto','si hubiera previsto','Se tivesse previsto o atraso, teria saído mais cedo.','Si hubiera previsto el retraso, habría salido más temprano.'),
vocab(8,2,'teria sido possível','habría sido posible','Teria sido possível evitar a falha com testes adicionais.','Habría sido posible evitar el fallo con pruebas adicionales.'),
vocab(8,3,'caso houvesse','si hubiera / en caso de que hubiera','Caso houvesse mais recursos, o projeto avançaria.','Si hubiera más recursos, el proyecto avanzaría.'),
vocab(8,4,'se não fosse','si no fuera por','Se não fosse a intervenção da equipe, o prazo teria sido perdido.','Si no fuera por la intervención del equipo, se habría perdido el plazo.'),
vocab(8,5,'poderia ter evitado','podría haber evitado','A equipe poderia ter evitado o conflito se tivesse esclarecido os critérios.','El equipo podría haber evitado el conflicto si hubiera aclarado los criterios.'),
vocab(8,6,'teria contribuído','habría contribuido','A mudança teria contribuído para reduzir os custos.','El cambio habría contribuido a reducir los costos.'),
vocab(8,7,'na hipótese de que','en el supuesto de que','Na hipótese de que o acordo fracassasse, haveria nova rodada de negociação.','En el supuesto de que el acuerdo fracasara, habría otra ronda de negociación.'),
vocab(8,8,'mesmo que tivesse','aunque hubiera','Mesmo que tivesse recebido o aviso, talvez não conseguisse chegar a tempo.','Aunque hubiera recibido el aviso, quizá no habría podido llegar a tiempo.'),
vocab(8,9,'se porventura','si acaso','Se porventura surgisse nova evidência, o parecer seria revisto.','Si acaso surgiera nueva evidencia, el dictamen sería revisado.'),
vocab(8,10,'não fosse o fato de que','si no fuera por el hecho de que','Não fosse o fato de que os dados estavam incompletos, a análise teria sido concluída.','Si no fuera por el hecho de que los datos estaban incompletos, el análisis se habría concluido.')
];
const u9=[
vocab(9,1,'segundo declarou','según declaró','Segundo declarou a diretora, a medida será aplicada em duas etapas.','Según declaró la directora, la medida se aplicará en dos etapas.'),
vocab(9,2,'teria afirmado que','habría afirmado que','A testemunha teria afirmado que não viu o documento.','El testigo habría afirmado que no vio el documento.'),
vocab(9,3,'de acordo com o depoimento','de acuerdo con la declaración','De acordo com o depoimento, a reunião começou depois do horário previsto.','De acuerdo con la declaración, la reunión comenzó después de la hora prevista.'),
vocab(9,4,'questionou se','preguntó si / cuestionó si','O jornalista questionou se haveria uma nova avaliação.','El periodista preguntó si habría una nueva evaluación.'),
vocab(9,5,'perguntou por que','preguntó por qué','A comissão perguntou por que o prazo tinha sido alterado.','La comisión preguntó por qué se había cambiado el plazo.'),
vocab(9,6,'negou ter recebido','negó haber recibido','O representante negou ter recebido qualquer aviso prévio.','El representante negó haber recibido cualquier aviso previo.'),
vocab(9,7,'alegou que','alegó que','A empresa alegou que os documentos estavam incompletos.','La empresa alegó que los documentos estaban incompletos.'),
vocab(9,8,'ressalvou que','aclaró que / advirtió que','A pesquisadora ressalvou que a estimativa era provisória.','La investigadora aclaró que la estimación era provisional.'),
vocab(9,9,'deu a entender que','dio a entender que','O porta-voz deu a entender que não apoiaria a proposta.','El portavoz dio a entender que no apoyaría la propuesta.'),
vocab(9,10,'foi informado de que','fue informado de que','O conselho foi informado de que a reunião seria adiada.','Se informó al consejo de que la reunión sería aplazada.')
];
const unit7=makeUnit(7,'Subjuntivo en valoración, duda y emoción','Ajusta el modo verbal a la postura del hablante cuando evalúa hechos, expresa incertidumbre o reacciona ante una situación.','Las construcciones de valoración suelen seleccionar subjuntivo cuando presentan una acción como deseada, necesaria o evaluada: é fundamental que a equipe revise; é lamentável que o serviço não funcione. La probabilidad y la duda también dependen del grado de compromiso: é provável que os resultados mudem, duvido que a proposta resolva. Distingue la valoración del hecho de una afirmación directa en indicativo.','No todo lo que parece probable lleva automáticamente subjuntivo','Observa la construcción completa y el compromiso del hablante. En este bloque, é provável que, é fundamental que, duvido que y não há indícios de que introducen una subordinada en subjuntivo; una afirmación presentada como dato puede usar indicativo.','u7',[ 
['Lección 1: Necesidad y probabilidad','Expresa una exigencia o una previsión sin presentar el resultado como hecho confirmado.','É fundamental que rige subjuntivo porque presenta una necesidad; é provável que expresa una previsión no confirmada y también introduce subjuntivo.',[0,1],['ptbr_a2_u24_v01','ptbr_a2_u24_v02']],
['Lección 2: Reacción y duda','Formula una reacción negativa y cuestiona la certeza de una propuesta.','É lamentável que expresa una valoración emocional; duvido que expresa duda. En ambos casos, la subordinada presenta una situación no afirmada como cierta.',[2,3],['ptbr_a2_u24_v03','ptbr_a2_u24_v04']],
['Lección 3: Reserva y comprensión','Reconoce la postura del hablante ante una medida y la reacción de otras personas.','Não acredito que niega el compromiso con la proposición; é compreensível que evalúa una reacción. Las formas seja y estejam muestran el subjuntivo presente.',[4,5],['ptbr_a2_u24_v05','ptbr_a2_u24_v06']],
['Lección 4: Extrañeza y recomendación','Señala una anomalía y recomienda una acción sin convertirla en una orden directa.','Causa estranheza que presenta un hecho como inesperado; é recomendável que formula una recomendación. Ambas construcciones favorecen el subjuntivo.',[6,7],['ptbr_a2_u24_v07','ptbr_a2_u24_v08']],
['Lección 5: Evidencia y conveniencia','Comunica ausencia de pruebas y propone una evaluación prudente.','Não há indícios de que niega la existencia de evidencia y suele seleccionar subjuntivo; convém que presenta una acción como conveniente o necesaria.',[8,9],['ptbr_a2_u24_v09','ptbr_a2_u24_v10']]
]);
const unit8=makeUnit(8,'Condicionales irreales y escenarios alternativos','Construye escenarios contrarios a los hechos y relaciona condiciones pasadas con consecuencias posibles o no realizadas.','Las hipótesis irreales sobre el pasado suelen combinar se + mais-que-perfeito do subjuntivo con futuro do pretérito composto: se tivesse previsto, teria saído. Caso houvesse y na hipótese de que pueden introducir escenarios no realizados; se não fosse y não fosse o fato de que presentan una condición de la que depende el resultado. La consecuencia puede expresarse con teria sido possível, poderia ter evitado o teria contribuído.','No confundas condición pasada con consecuencia presente','La forma verbal marca la relación temporal. Se tivesse previsto... teria saído describe una condición pasada y su resultado alternativo; caso houvesse... avançaria puede proyectar una consecuencia en otro plano. Comprueba qué ocurrió realmente y qué se imagina.',u8,[
['Lección 1: Reconstruir una decisión pasada','Explica cómo una previsión distinta habría cambiado una acción anterior.','Se tivesse previsto introduce una condición irreal pasada; teria sido possível presenta una consecuencia alternativa. El condicional compuesto no afirma que la posibilidad se haya realizado.',[0,1],['ptbr_a2_u24_v01','ptbr_a2_u24_v02']],
['Lección 2: Explorar condiciones alternativas','Plantea una condición hipotética y explica qué habría pasado sin una intervención.','Caso houvesse puede introducir una hipótesis con subjuntivo; se não fosse presenta una condición negativa. El contexto aclara si la consecuencia es presente o pasada.',[2,3],['ptbr_a2_u24_v03','ptbr_a2_u24_v04']],
['Lección 3: Evaluar oportunidades perdidas','Analiza una acción que habría evitado un problema y una decisión con posibles efectos.','Poderia ter evitado expresa una posibilidad no realizada; teria contribuído señala una consecuencia hipotética. Ambas formas usan infinitivo compuesto en la perífrasis.',[4,5],['ptbr_a2_u24_v05','ptbr_a2_u24_v06']],
['Lección 4: Formular supuestos formales','Presenta un escenario alternativo en un análisis o una negociación.','Na hipótese de que introduce una condición formal; mesmo que tivesse expresa una concesión hipotética con subjuntivo. La consecuencia no debe confundirse con un hecho.',[6,7],['ptbr_a2_u24_v07','ptbr_a2_u24_v08']],
['Lección 5: Considerar eventualidades y excepciones','Explica cómo una nueva evidencia o una limitación habría cambiado una conclusión.','Se porventura introduce una posibilidad eventual; não fosse o fato de que destaca una condición que impidió otro resultado. Mantén explícita la relación entre condición y consecuencia.',[8,9],['ptbr_a2_u24_v09','ptbr_a2_u24_v10']]
]);
const unit9=makeUnit(9,'Discurso indirecto y perspectiva','Reformula declaraciones, preguntas y negativas conservando quién dijo qué y distinguiendo información confirmada de atribuciones.','El discurso indirecto integra palabras ajenas en la oración del narrador. Según el verbo introductor, cambia la estructura: alegou que y ressalvou que presentan contenido; questionou se y perguntou por que introducen preguntas indirectas; negou ter recebido usa infinitivo compuesto. En registros periodísticos, teria afirmado que marca una atribución no confirmada. Mantén clara la fuente y evita presentar una declaración como hecho independiente.', 'Atribuir una afirmación no equivale a confirmarla','Según declaró y de acordo com o depoimento identifican una fuente; teria afirmado que mantiene distancia sobre la certeza de la declaración. No elimines la atribución ni transformes una alegación en un hecho comprobado.',u9,[
['Lección 1: Atribuir declaraciones','Identifica la fuente de una información y conserva la distancia del narrador.','Segundo declarou introduce una fuente identificable; teria afirmado que expresa una declaración atribuida y no necesariamente confirmada por el narrador.',[0,1],['ptbr_a2_u24_v01','ptbr_a2_u24_v02']],
['Lección 2: Citar testimonios y preguntas','Resume una declaración y reformula una pregunta como parte de un relato.','De acordo com o depoimento atribuye el contenido a una declaración; questionou se conserva una pregunta indirecta cuya respuesta se desconoce.',[2,3],['ptbr_a2_u24_v03','ptbr_a2_u24_v04']],
['Lección 3: Mantener la perspectiva temporal','Reformula preguntas sobre causas y negativas sobre acciones anteriores.','Perguntou por que introduce una interrogativa indirecta; negou ter recebido usa infinitivo compuesto para referirse a una recepción anterior.',[4,5],['ptbr_a2_u24_v05','ptbr_a2_u24_v06']],
['Lección 4: Presentar alegaciones y reservas','Distingue una justificación presentada por una parte de una precisión del investigador.','Alegou que atribuye una explicación a una persona o institución; ressalvou que añade un límite o una reserva al contenido comunicado.',[6,7],['ptbr_a2_u24_v07','ptbr_a2_u24_v08']],
['Lección 5: Interpretar implicaciones y avisos','Comunica una postura implícita y un aviso recibido por una institución.','Deu a entender que presenta una interpretación de lo insinuado, no una cita literal; foi informado de que expresa recepción de información por parte de un destinatario.',[8,9],['ptbr_a2_u24_v09','ptbr_a2_u24_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['07-09']={units:[unit7,unit8,unit9]};
})(typeof window!=='undefined'?window:globalThis);
