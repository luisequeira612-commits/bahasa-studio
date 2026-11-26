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
const review=['ptbr_a2_u22_v09','ptbr_a2_u22_v10'];
const u25=[
vocab(25,1,'focalização','focalización','A focalização muda quando a narrativa acompanha outra personagem.','La focalización cambia cuando la narración sigue a otro personaje.'),
vocab(25,2,'narrador não confiável','narrador no fiable','O narrador não confiável omite informações que alteram a interpretação dos fatos.','El narrador no fiable omite información que cambia la interpretación de los hechos.'),
vocab(25,3,'retrospectiva','retrospectiva','A retrospectiva revela um episódio anterior que explica a decisão atual.','La retrospectiva revela un episodio anterior que explica la decisión actual.'),
vocab(25,4,'antecipação','anticipación','A antecipação cria expectativa antes de apresentar o acontecimento.','La anticipación crea expectativa antes de presentar el acontecimiento.'),
vocab(25,5,'alternância temporal','alternancia temporal','A alternância temporal aproxima acontecimentos de épocas diferentes.','La alternancia temporal acerca acontecimientos de épocas diferentes.'),
vocab(25,6,'epílogo','epílogo','O epílogo mostra as consequências da escolha anos depois.','El epílogo muestra las consecuencias de la decisión años después.'),
vocab(25,7,'subtrama','subtrama','A subtrama amplia o conflito sem substituir o eixo principal.','La subtrama amplía el conflicto sin sustituir el eje principal.'),
vocab(25,8,'enredo','trama','O enredo organiza os acontecimentos em torno de um conflito central.','La trama organiza los acontecimientos en torno a un conflicto central.'),
vocab(25,9,'verossimilhança','verosimilitud','A verossimilhança depende da coerência interna do universo narrativo.','La verosimilitud depende de la coherencia interna del universo narrativo.'),
vocab(25,10,'caracterização','caracterización','A caracterização da protagonista aparece nas escolhas e nas contradições.','La caracterización de la protagonista aparece en sus decisiones y contradicciones.')
];
const u26=[
vocab(26,1,'apuração','investigación periodística','A apuração reuniu documentos e entrevistas antes da publicação.','La investigación periodística reunió documentos y entrevistas antes de la publicación.'),
vocab(26,2,'checagem cruzada','verificación cruzada','A checagem cruzada confirmou a informação em fontes independentes.','La verificación cruzada confirmó la información en fuentes independientes.'),
vocab(26,3,'testemunha ocular','testigo presencial','A testemunha ocular descreveu o momento em que o veículo chegou.','El testigo presencial describió el momento en que llegó el vehículo.'),
vocab(26,4,'depoimento','testimonio','O depoimento foi comparado com os registros disponíveis.','El testimonio se comparó con los registros disponibles.'),
vocab(26,5,'contextualizar','contextualizar','É necessário contextualizar a declaração antes de reproduzi-la.','Es necesario contextualizar la declaración antes de reproducirla.'),
vocab(26,6,'recorte editorial','enfoque editorial','O recorte editorial determina quais aspectos recebem maior destaque.','El enfoque editorial determina qué aspectos reciben mayor atención.'),
vocab(26,7,'cronologia','cronología','A cronologia dos fatos foi reconstruída a partir de registros públicos.','La cronología de los hechos se reconstruyó a partir de registros públicos.'),
vocab(26,8,'correspondente','corresponsal','A correspondente enviou informações diretamente do local do acontecimento.','La corresponsal envió información directamente desde el lugar del acontecimiento.'),
vocab(26,9,'cobertura in loco','cobertura in situ','A cobertura in loco permitiu observar as condições do abrigo.','La cobertura in situ permitió observar las condiciones del refugio.'),
vocab(26,10,'direito de resposta','derecho de réplica','A reportagem informou que a instituição solicitou o direito de resposta.','El reportaje informó que la institución solicitó el derecho de réplica.')
];
const u27=[
vocab(27,1,'série histórica','serie histórica','A série histórica mostra como o indicador evoluiu ao longo de uma década.','La serie histórica muestra cómo evolucionó el indicador durante una década.'),
vocab(27,2,'margem de erro','margen de error','A margem de erro deve acompanhar a estimativa divulgada.','El margen de error debe acompañar la estimación publicada.'),
vocab(27,3,'correlação','correlación','A correlação entre as variáveis não comprova uma relação causal.','La correlación entre las variables no demuestra una relación causal.'),
vocab(27,4,'causalidade','causalidad','Os dados disponíveis não permitem estabelecer causalidade.','Los datos disponibles no permiten establecer causalidad.'),
vocab(27,5,'tendência','tendencia','A tendência de crescimento perdeu força no último trimestre.','La tendencia de crecimiento perdió fuerza en el último trimestre.'),
vocab(27,6,'oscilar','oscilar','O índice pode oscilar de um mês para outro sem indicar uma mudança estrutural.','El índice puede oscilar de un mes a otro sin indicar un cambio estructural.'),
vocab(27,7,'projeção','proyección','A projeção considera diferentes cenários de crescimento.','La proyección considera distintos escenarios de crecimiento.'),
vocab(27,8,'amostragem','muestreo','A amostragem precisa representar os grupos incluídos no estudo.','El muestreo debe representar los grupos incluidos en el estudio.'),
vocab(27,9,'percentual','porcentaje','O percentual foi calculado sobre o total de respostas válidas.','El porcentaje se calculó sobre el total de respuestas válidas.'),
vocab(27,10,'subnotificação','subregistro','A subnotificação pode distorcer a comparação entre regiões.','El subregistro puede distorsionar la comparación entre regiones.')
];
const unit25=makeUnit(25,'Narrativa compleja y perspectiva','Analiza la construcción de una narración mediante focalización, planos temporales, subtramas y fiabilidad del narrador.','La narrativa compleja puede alternar voces, tiempos y niveles de información. Focalização define desde qué conciencia se presentan los hechos; un narrador não confiável puede distorsionar u omitir datos. Retrospectiva y antecipação reorganizan el orden del relato, mientras enredo, subtrama y epílogo distribuyen los conflictos y sus consecuencias.','Confundir orden del relato y orden de los hechos','Distingue cuándo ocurre un hecho y cuándo se cuenta. Una retrospectiva mira hacia atrás; una anticipación adelanta información sin convertirla en el presente narrativo.',u25,[
['Punto de vista y fiabilidad','Identificar quién percibe y cuánta confianza merece su relato.','Focalização organiza la perspectiva; narrador não confiável obliga a contrastar lo narrado con otras señales del texto. Distingue voz narrativa y autor.',[0,1],review],
['Reordenar el tiempo','Reconocer retrospectivas y anticipaciones.','Retrospectiva recupera un hecho anterior; antecipação adelanta una posibilidad o un acontecimiento. La alternancia temporal puede combinar ambos movimientos.',[2,3],review],
['Alternancia de planos','Relacionar escenas de tiempos diferentes y su cierre narrativo.','Alternância temporal acerca momentos distintos y modifica la lectura de sus relaciones; epílogo presenta consecuencias posteriores al desenlace y puede cerrar la narración. Observa las marcas temporales y las transiciones entre escenas.',[4,5],review],
['Trama y subtrama','Explicar cómo se articulan conflictos narrativos.','Enredo organiza el conflicto central; subtrama desarrolla un hilo secundario que dialoga con él. Explica si una escena modifica el conflicto principal o amplía el mundo narrativo.',[7,6],review],
['Cierre y coherencia','Evaluar la caracterización y la verosimilitud de una narración.','Verossimilhança depende de la coherencia interna, no de que la historia sea real; caracterização construye a los personajes y desarrolla sus rasgos, motivaciones y cambios.',[8,9],review]
]);
const unit26=makeUnit(26,'Crónica y reportaje','Distingue hechos, testimonios, contexto y decisiones editoriales al analizar reportajes y crónicas.','El reportaje requiere apuração, checagem cruzada y contraste entre documentos y testimonios. La testemunha ocular aporta una perspectiva situada, pero el depoimento debe contextualizarse y compararse con otras evidencias. Cronologia organiza los hechos; recorte editorial determina el enfoque, y cobertura in loco describe la observación directa.','Tomar un testimonio aislado como prueba suficiente','Identifica quién habla, qué pudo observar y qué evidencia independiente confirma su versión. Separa el relato testimonial de la comprobación documental.',u26,[
['Investigar antes de publicar','Reconocer etapas de investigación y verificación.','Apuração reúne datos antes de publicar; checagem cruzada contrasta la información con fuentes independientes. Explica qué dato está confirmado y cuál sigue abierto.',[0,1],review],
['Valorar testimonios','Distinguir observación directa y relato posterior.','Testemunha ocular describe algo que afirma haber visto; depoimento es el relato ofrecido. Ninguno elimina la necesidad de corroboración.',[2,3],review],
['Contexto y enfoque','Explicar declaraciones y decisiones editoriales.','Contextualizar sitúa una declaración en su situación; recorte editorial determina qué aspectos se destacan. Revisa si el enfoque omite información relevante.',[4,5],review],
['Reconstruir los hechos','Ordenar acontecimientos y situar la cobertura.','Cronologia organiza los hechos en secuencia; correspondente informa desde otra localidad y cobertura in loco se realiza en el lugar del acontecimiento.',[6,7],review],
['Equilibrio y respuesta','Incluir la posición de las partes implicadas.','Cobertura in loco registra lo observado en el lugar; direito de resposta permite que una parte responda a una publicación. Distingue ofrecer esa posibilidad de aceptar automáticamente su versión.',[8,9],review]
]);
const unit27=makeUnit(27,'Datos, tendencias y cautela estadística','Describe cifras y tendencias con precisión, diferenciando asociación, causalidad y límites de los datos.','La lectura de datos exige distinguir série histórica, estimativa y projeção. Margem de erro expresa incertidumbre muestral; correlação indica asociación, pero no prueba causalidade. Tendência describe una dirección general, aunque el indicador pueda oscilar. Amostragem y subnotificação afectan la representatividad y la interpretación del percentual divulgado.','Convertir una correlación en una explicación causal','Antes de afirmar que una variable provoca otra, comprueba el diseño del estudio, las variables alternativas y la calidad de los registros. Explicita el margen de incertidumbre.',u27,[
['Leer evolución temporal','Interpretar series históricas y cambios de tendencia.','Série histórica permite comparar periodos; tendência resume la dirección general. Una variación puntual no basta para afirmar que hubo un cambio sostenido.',[0,4],review],
['Comunicar incertidumbre','Explicar estimaciones y margen de error.','Margem de erro expresa un rango de incertidumbre asociado a una estimación; percentual indica la proporción calculada sobre un total definido. No debe omitirse el margen al presentar resultados de una encuesta.',[1,8],review],
['Asociación y causalidad','Distinguir correlación de una relación causal demostrada.','Correlação indica que dos variables varían conjuntamente; causalidade requiere evidencia adicional. Evita verbos como provocar si el estudio solo muestra asociación.',[2,3],review],
['Proyecciones y fluctuaciones','Describir oscilaciones y escenarios posibles.','Oscilar describe variaciones; projeção estima escenarios futuros bajo determinados supuestos. Presenta los supuestos y no trates una proyección como un hecho.',[5,6],review],
['Representatividad y subregistro','Evaluar muestreo, porcentajes y datos ausentes.','Amostragem determina cómo se seleccionan los casos; subnotificação reduce los registros observados; percentual expresa una proporción respecto de un total definido.',[7,9],review]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['25-27']={units:[unit25,unit26,unit27]};
})(typeof window!=='undefined'?window:globalThis);
