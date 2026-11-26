(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta el sentido de la expresión dentro de la situación y del registro.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((_,i)=>exercise(words,i))
});
const u22=[
vocab(22,1,'adequação','adecuación','A adequação do tom depende do público e da finalidade.','La adecuación del tono depende del público y de la finalidad.'),
vocab(22,2,'formalidade','formalidad','O grau de formalidade deve acompanhar a situação profissional.','El grado de formalidad debe corresponder a la situación profesional.'),
vocab(22,3,'polidez','cortesía','A polidez contribui para uma comunicação respeitosa.','La cortesía contribuye a una comunicación respetuosa.'),
vocab(22,4,'conciso','conciso','O relatório deve ser conciso, sem omitir dados essenciais.','El informe debe ser conciso, sin omitir datos esenciales.'),
vocab(22,5,'pertinente','pertinente','A equipe apresentou observações pertinentes ao tema.','El equipo presentó observaciones pertinentes al tema.'),
vocab(22,6,'ressaltar','destacar','Convém ressaltar os limites da análise antes da conclusão.','Conviene destacar los límites del análisis antes de la conclusión.'),
vocab(22,7,'encaminhar','remitir / enviar','A coordenação vai encaminhar o documento aos responsáveis.','La coordinación remitirá el documento a los responsables.'),
vocab(22,8,'disponibilidade','disponibilidad','Agradeço a disponibilidade para participar da reunião.','Agradezco la disponibilidad para participar en la reunión.'),
vocab(22,9,'alinhamento','alineación / coordinación','O alinhamento entre as áreas reduziu os retrabalhos.','La coordinación entre las áreas redujo el trabajo repetido.'),
vocab(22,10,'destinatário','destinatario','O destinatário deve ser identificado com clareza no cabeçalho.','El destinatario debe identificarse claramente en el encabezado.')
];
const u23=[
vocab(23,1,'requerimento','solicitud formal / escrito','O requerimento foi registrado pelo setor responsável.','El escrito fue registrado por el departamento responsable.'),
vocab(23,2,'pleito','petición / demanda','O pleito foi encaminhado à comissão responsável.','La petición fue remitida a la comisión responsable.'),
vocab(23,3,'contrarrazões','alegaciones de respuesta','A empresa apresentou contrarrazões ao recurso recebido.','La empresa presentó alegaciones en respuesta al recurso recibido.'),
vocab(23,4,'providência','medida / actuación','A instituição informou quais providências serão tomadas.','La institución informó qué medidas se tomarán.'),
vocab(23,5,'ressarcimento','reembolso / indemnización','O consumidor solicitou o ressarcimento do valor cobrado indevidamente.','El consumidor solicitó el reembolso del importe cobrado indebidamente.'),
vocab(23,6,'vencimento','fecha de vencimiento','A data de vencimento para apresentar documentos é sexta-feira.','La fecha límite para presentar documentos es el viernes.'),
vocab(23,7,'documentação comprobatória','documentación probatoria','A documentação comprobatória acompanha o requerimento.','La documentación probatoria acompaña la solicitud formal.'),
vocab(23,8,'deferimento','aprobación / resolución favorable','O deferimento do pedido foi comunicado por escrito.','La aprobación de la solicitud se comunicó por escrito.'),
vocab(23,9,'indeferimento','denegación / resolución desfavorable','Em caso de indeferimento, o requerente poderá recorrer.','En caso de denegación, el solicitante podrá apelar.'),
vocab(23,10,'fundamentar','fundamentar / justificar','É importante fundamentar a contestação com documentos.','Es importante fundamentar la respuesta con documentos.')
];
const u24=[
vocab(24,1,'palestra','conferencia / charla','A palestra apresentou os resultados em três etapas.','La conferencia presentó los resultados en tres etapas.'),
vocab(24,2,'questionamento','pregunta / cuestionamiento','O questionamento da comissão levou a uma explicação adicional.','La pregunta de la comisión llevó a una explicación adicional.'),
vocab(24,3,'aprofundar','profundizar','A entrevistada decidiu aprofundar o tema com novos exemplos.','La entrevistada decidió profundizar el tema con nuevos ejemplos.'),
vocab(24,4,'esclarecer','aclarar','O palestrante precisou esclarecer a diferença entre os indicadores.','El ponente tuvo que aclarar la diferencia entre los indicadores.'),
vocab(24,5,'síntese','síntesis / resumen','Ao final, a equipe apresentou uma síntese das conclusões.','Al final, el equipo presentó una síntesis de las conclusiones.'),
vocab(24,6,'ponderação','consideración / matiz','A pesquisadora apresentou uma ponderação sobre o tamanho da amostra.','La investigadora presentó una consideración sobre el tamaño de la muestra.'),
vocab(24,7,'transição','transición','Uma transição breve conectou os dois tópicos da apresentação.','Una transición breve conectó los dos temas de la presentación.'),
vocab(24,8,'improviso','improvisación','A resposta exigiu improviso diante de uma pergunta inesperada.','La respuesta exigió improvisación ante una pregunta inesperada.'),
vocab(24,9,'desenvoltura','soltura / desenvoltura','Ela respondeu com desenvoltura às perguntas da banca.','Ella respondió con soltura a las preguntas del tribunal.'),
vocab(24,10,'comissão avaliadora','comisión evaluadora','A comissão avaliadora acompanhou a apresentação até o encerramento.','La comisión evaluadora siguió la presentación hasta el cierre.')
];
const review=['ptbr_a2_u22_v09','ptbr_a2_u22_v10'];
const unit22=makeUnit(22,'Registro académico y profesional','Adapta tono, precisión y distancia interpersonal a informes, reuniones y comunicaciones profesionales.','El registro académico y profesional exige adecuación al propósito y al destinatario. La formalidad no consiste en usar palabras rebuscadas: requiere precisión, cortesía, concisión y pertinencia. Expresiones como convém ressaltar y agradeço a disponibilidade organizan la interacción sin perder claridad.','Confundir formalidad con complejidad','Una frase formal puede ser breve y directa. Evita nominalizaciones innecesarias y elige el grado de distancia según el destinatario y la relación profesional.',u22,[
['Adecuación al destinatario','Elegir el tono según la relación y el propósito.','Adequação y formalidade describen el ajuste del lenguaje a la situación. Identifica destinatario, objetivo y grado de distancia antes de redactar.',[0,1],review],
['Cordialidad profesional','Mantener respeto sin exceso de ceremonias.','Polidez permite expresar respeto; disponibilidade agradece el tiempo o la colaboración. Evita fórmulas demasiado informales en mensajes institucionales.',[2,7],review],
['Concisión y pertinencia','Eliminar información redundante y conservar lo relevante.','Conciso no significa incompleto. Pertinente indica relación directa con el asunto. Revisa si cada oración aporta algo al propósito del texto.',[3,4],review],
['Énfasis y coordinación','Destacar límites y organizar el trabajo entre áreas.','Ressaltar introduce un punto importante; alinhamento expresa coordinación de criterios o acciones. Explica qué debe destacarse y entre quiénes se coordina.',[5,8],review],
['Circulación documental','Remitir información al destinatario adecuado.','Encaminhar se usa para enviar o dirigir un documento a quien corresponde. Destinatário identifica a quien recibe la comunicación; revisa encabezado y tratamiento.',[6,9],review]
]);
const unit23=makeUnit(23,'Correspondencia formal y reclamaciones','Redacta solicitudes, reclamaciones y respuestas fundamentadas con plazos, documentos y seguimiento.','La correspondencia formal debe identificar el asunto, describir los hechos, formular una solicitud clara y aportar fundamentos. Requerimento formaliza la petición; documentação comprobatória reúne los registros que la respaldan. Deferimento e indeferimento expresan resultados administrativos opuestos.','Presentar una reclamación sin petición verificable','Describe qué ocurrió, qué solución solicitas y qué documentos respaldan el caso. Comprueba el plazo y conserva una copia del requerimiento.',u23,[
['Registrar una solicitud','Presentar una petición por el canal adecuado.','Pleito nombra una petición formal; requerimento identifica el escrito presentado. Incluye fecha, asunto y datos necesarios para localizar el trámite.',[0,1],review],
['Describir una controversia','Responder y formular una contestación formal.','Contrarrazões presenta la posición frente a un recurso o argumento contrario; fundamentar exige respaldar esa respuesta con hechos y documentos.',[2,9],review],
['Solicitar medidas y reembolso','Explicar qué providencia o ressarcimento se solicita.','Providência es una medida que debe tomarse; ressarcimento se refiere a la devolución de un importe o compensación. Formula la petición de manera concreta.',[3,4],review],
['Plazos y documentación','Adjuntar comprobantes y respetar fechas límite.','Vencimento indica la fecha límite; documentação comprobatória reúne los registros que acompañan el requerimiento. Comprueba que cada archivo esté mencionado y sea pertinente.',[5,6],review],
['Decisiones y recursos','Interpretar una resolución y fundamentar una apelación.','Deferimento indica aceptación; indeferimento, rechazo. Fundamentar exige exponer razones y evidencias, además de indicar los pasos siguientes.',[7,8],review]
]);
const unit24=makeUnit(24,'Presentaciones y entrevistas extensas','Sostiene exposiciones extensas, desarrolla respuestas y gestiona preguntas imprevistas con claridad.','Una presentación avanzada combina apertura, desarrollo, transiciones y síntesis. Para responder preguntas, puede ser necesario esclarecer un concepto, aprofundar un argumento o introducir una ponderação. La desenvoltura no significa improvisar sin estructura: supone mantener el hilo y adaptar la respuesta al público.','Responder de inmediato sin organizar la idea','Ante una pregunta inesperada, confirma qué se pregunta, ofrece una respuesta central y añade una explicación o salvedad. Si hace falta, indica qué dato no puedes confirmar.',u24,[
['Estructurar una exposición','Organizar una presentación con apertura y desarrollo.','Palestra nombra la presentación oral; transição conecta partes y orienta a quienes escuchan. Anuncia el recorrido para que el público siga la estructura.',[0,6],review],
['Gestionar preguntas','Comprender y responder cuestionamientos.','Questionamento puede pedir aclaración o poner una afirmación en duda. Esclarecer significa eliminar una duda concreta; reformula la pregunta si es ambigua antes de responder.',[1,3],review],
['Desarrollar argumentos','Profundizar con ejemplos y precisiones.','Aprofundar amplía el análisis; síntese recupera las ideas principales. Añade ejemplos relevantes sin desviarte del punto central.',[2,4],review],
['Matizar y sintetizar','Introducir límites y resumir conclusiones.','Ponderação introduce un matiz en la valoración; síntese recupera las ideas principales. Presenta las limitaciones antes del resumen final.',[5,4],review],
['Responder con flexibilidad','Mantener claridad ante preguntas inesperadas.','Improviso puede ser necesario, pero conviene preservar la estructura de la respuesta. Desenvoltura describe soltura al hablar; comissão avaliadora identifica al grupo que escucha y evalúa.',[7,8],review]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['22-24']={units:[unit22,unit23,unit24]};
})(typeof window!=='undefined'?window:globalThis);
