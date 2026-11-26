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
const u28=[
vocab(28,1,'delineamento experimental','diseño experimental','O delineamento experimental precisa corresponder à pergunta de pesquisa.','El diseño experimental debe corresponder a la pregunta de investigación.'),
vocab(28,2,'hipótese de trabalho','hipótesis de trabajo','A hipótese de trabalho será revista após a coleta de novos dados.','La hipótesis de trabajo se revisará después de recopilar nuevos datos.'),
vocab(28,3,'estimativa inicial','estimación inicial','A estimativa inicial será recalculada após a ampliação da amostra.','La estimación inicial se recalculará después de ampliar la muestra.'),
vocab(28,4,'limitação metodológica','limitación metodológica','A limitação metodológica impede generalizar os resultados.','La limitación metodológica impide generalizar los resultados.'),
vocab(28,5,'robustez','robustez','A robustez da análise depende de testes com diferentes pressupostos.','La robustez del análisis depende de pruebas con distintos supuestos.'),
vocab(28,6,'replicação independente','replicación independiente','A replicação independente ajudou a avaliar a estabilidade do achado.','La replicación independiente ayudó a evaluar la estabilidad del hallazgo.'),
vocab(28,7,'margem de incerteza','margen de incertidumbre','A margem de incerteza deve acompanhar a estimativa apresentada.','El margen de incertidumbre debe acompañar la estimación presentada.'),
vocab(28,8,'inferência','inferencia','A inferência precisa considerar explicações alternativas.','La inferencia debe considerar explicaciones alternativas.'),
vocab(28,9,'conjunto de dados','conjunto de datos','O conjunto de dados foi disponibilizado para análise independente.','El conjunto de datos se puso a disposición para un análisis independiente.'),
vocab(28,10,'achado','hallazgo','O achado é relevante, mas ainda requer confirmação.','El hallazgo es relevante, pero todavía requiere confirmación.')
];
const u29=[
vocab(29,1,'exfiltração de dados','exfiltración de datos','A exfiltração de dados transferiu registros sigilosos para um servidor externo.','La exfiltración de datos transfirió registros confidenciales a un servidor externo.'),
vocab(29,2,'finalidade declarada','finalidad declarada','A finalidade declarada precisa corresponder ao uso efetivo das informações.','La finalidad declarada debe corresponder al uso efectivo de la información.'),
vocab(29,3,'rastreabilidade','trazabilidad','A rastreabilidade permite identificar como os dados foram utilizados.','La trazabilidad permite identificar cómo se utilizaron los datos.'),
vocab(29,4,'viés algorítmico','sesgo algorítmico','O viés algorítmico pode reproduzir desigualdades existentes.','El sesgo algorítmico puede reproducir desigualdades existentes.'),
vocab(29,5,'responsabilidade institucional','responsabilidad institucional','A responsabilidade institucional inclui prevenir danos e oferecer reparação.','La responsabilidad institucional incluye prevenir daños y ofrecer reparación.'),
vocab(29,6,'criptografia homomórfica','cifrado homomórfico','A criptografia homomórfica permite processar certos dados sem revelar seu conteúdo.','El cifrado homomórfico permite procesar ciertos datos sin revelar su contenido.'),
vocab(29,7,'uso secundário','uso secundario','O uso secundário dos dados requer uma justificativa transparente.','El uso secundario de los datos requiere una justificación transparente.'),
vocab(29,8,'decisão automatizada','decisión automatizada','A decisão automatizada deve permitir contestação em casos relevantes.','La decisión automatizada debe permitir impugnación en casos relevantes.'),
vocab(29,9,'retenção limitada','retención limitada','A retenção limitada reduz o período em que os registros ficam armazenados.','La retención limitada reduce el periodo durante el cual se almacenan los registros.'),
vocab(29,10,'impacto não intencional','impacto no intencional','O impacto não intencional foi identificado após a implementação.','El impacto no intencional se identificó después de la implementación.')
];
const u30=[
vocab(30,1,'eletrificação industrial','electrificación industrial','A eletrificação industrial pode reduzir o uso direto de combustíveis fósseis.','La electrificación industrial puede reducir el uso directo de combustibles fósiles.'),
vocab(30,2,'mix de geração','combinación de generación','O mix de geração varia conforme a disponibilidade das fontes.','La combinación de generación varía según la disponibilidad de las fuentes.'),
vocab(30,3,'inventário de emissões','inventario de emisiones','O inventário de emissões considera diferentes etapas da cadeia produtiva.','El inventario de emisiones considera distintas etapas de la cadena productiva.'),
vocab(30,4,'capacidade adaptativa','capacidad adaptativa','A capacidade adaptativa depende de infraestrutura e planejamento local.','La capacidad adaptativa depende de infraestructura y planificación local.'),
vocab(30,5,'remoção de carbono','remoción de carbono','A remoção de carbono exige critérios claros de medição e permanência.','La remoción de carbono requiere criterios claros de medición y permanencia.'),
vocab(30,6,'reuso de materiais','reutilización de materiales','O reuso de materiais reduz a demanda por recursos recém-extraídos.','La reutilización de materiales reduce la demanda de recursos recién extraídos.'),
vocab(30,7,'impacto socioambiental','impacto socioambiental','O impacto socioambiental precisa ser avaliado antes da obra.','El impacto socioambiental debe evaluarse antes de la obra.'),
vocab(30,8,'licenciamento ambiental','licencia ambiental','O licenciamento ambiental estabelece condições para a atividade.','La licencia ambiental establece condiciones para la actividad.'),
vocab(30,9,'perda de biodiversidade','pérdida de biodiversidad','A perda de biodiversidade compromete o equilíbrio dos ecossistemas.','La pérdida de biodiversidad compromete el equilibrio de los ecosistemas.'),
vocab(30,10,'justiça climática','justicia climática','A justiça climática considera quem sofre mais com os impactos ambientais.','La justicia climática considera quién sufre más los impactos ambientales.')
];
const unit28=makeUnit(28,'Ciencia e incertidumbre','Comunica hipótesis, evidencia, límites metodológicos y resultados provisionales con cautela.','La comunicación científica distingue hipótese de trabalho y delineamento experimental; una estimativa inicial no equivale a una conclusión definitiva. Las limitações metodológicas delimitan la inferencia, mientras la robustez y la replicação independente fortalecen la evaluación del conjunto de datos sin eliminar la margem de incerteza.','Presentar un resultado preliminar como una verdad definitiva','Indica el alcance del estudio, sus limitaciones y el grado de incertidumbre. Distingue lo observado de la inferencia y menciona qué evidencia adicional sería necesaria.',u28,[
['Hipótesis y evidencia','Distinguir una hipótesis de la evidencia que la respalda.','Delineamento experimental define cómo se organiza una investigación; hipótese de trabalho es una explicación provisional que debe contrastarse con observaciones o mediciones.',[0,1],review],
['Resultados provisionales','Expresar el alcance de un resultado preliminar.','Estimativa inicial describe hallazgos iniciales. La margem de incerteza debe acompañar la estimación y evitar una seguridad mayor que la permitida por los datos.',[2,6],review],
['Límites del método','Explicar limitaciones y condiciones de reproducibilidad.','Limitação metodológica señala restricciones del diseño; robustez indica si el análisis se mantiene estable al cambiar supuestos razonables.',[3,4],review],
['Evaluación científica','Describir revisión por pares y análisis independiente.','Replicação independente permite comprobar si otros equipos obtienen resultados compatibles; conjunto de dados nombra el material organizado que permite examinar los análisis y procedimientos.',[5,8],review],
['Inferencia responsable','Separar inferencia, hallazgo y confirmación.','Inferência interpreta evidencia; achado es un resultado observado. Un hallazgo relevante puede necesitar replicación y evidencia adicional antes de sostener una conclusión amplia.',[7,9],review]
]);
const unit29=makeUnit(29,'Tecnología, privacidad y ética','Argumenta sobre privacidad, sistemas automatizados, consentimiento y consecuencias no previstas.','La gobernanza tecnológica debe explicar finalidade declarada, uso secundário y retenção limitada. La rastreabilidade permite auditar decisiones; viés algorítmico e impacto não intencional exigen responsabilidade institucional. La criptografia homomórfica permite procesar ciertos datos sin revelar su contenido, pero no elimina los riesgos de una decisão automatizada ni la exfiltração de dados.','Confundir seguridad técnica con protección ética completa','Distingue protección durante la transmisión, límites de recopilación, transparencia y mecanismos de reclamación. Ninguna medida aislada elimina todos los riesgos.',u29,[
['Incidentes y exposición','Describir un exfiltração de dados y sus efectos.','Exfiltração de dados es la transferencia no autorizada de información; el impacto não intencional puede afectar a personas que no eran el objetivo del sistema. Analiza qué quedó expuesto y qué respuesta se adoptó.',[0,9],review],
['Consentimiento y finalidad','Evaluar consentimiento informado y uso secundario.','Finalidade declarada explica finalidad y condiciones; uso secundário ocurre cuando los datos se reutilizan para otro propósito y requiere justificación clara.',[1,6],review],
['Auditoría y sesgos','Relacionar trazabilidad, sesgo y rendición de cuentas.','Rastreabilidade registra el recorrido de los datos; viés algorítmico puede afectar grupos de forma desigual; responsabilidade institucional identifica quién responde por las consecuencias.',[2,3],review],
['Seguridad y decisiones','Distinguir cifrado y decisión automatizada.','Criptografia homomórfica protege el contenido en tránsito; decisão automatizada se toma mediante sistemas y debe permitir revisión cuando afecta derechos o intereses relevantes.',[5,7],review],
['Proporcionalidad y minimización','Justificar la minimización de datos y evaluar impactos.','Retenção limitada restringe el tiempo de almacenamiento; responsabilidade institucional identifica quién debe prevenir daños y ofrecer vías de reparación.',[8,4],review]
]);
const unit30=makeUnit(30,'Medioambiente y sostenibilidad','Compara políticas ambientales y evalúa impactos, transición energética y justicia climática.','La eletrificação industrial modifica el consumo de energía y el mix de geração. El inventário de emissões no resume por sí solo el impacto socioambiental; la capacidade adaptativa y la remoção de carbono exigen criterios propios. Reuso de materiais, licenciamento ambiental y protección de biodiversidade deben evaluarse junto con la justiça climática y la distribución de costos y beneficios.', 'Reducir sostenibilidad a una sola cifra','Compara ciclo de vida, impactos locales, emisiones, biodiversidad y distribución social. Explica qué indicador se utiliza y qué aspectos quedan fuera.',u30,[
['Energía y transición','Comparar mix de geração y transición energética.','Mix de geração describe las fuentes utilizadas; eletrificação industrial es el proceso de transformación. Considera costos, acceso, seguridad y emisiones.',[0,1],review],
['Emisiones y adaptación','Distinguir huella, mitigación y adaptación.','Inventário de emissões cuantifica gases liberados por una actividad; capacidade adaptativa describe la posibilidad de responder a los efectos climáticos. La remoção de carbono requiere medición y permanencia.',[2,3],review],
['Producción circular','Explicar economía circular y sus límites.','Reuso de materiais prolonga el uso de recursos; impacto socioambiental incluye consecuencias para ecosistemas y comunidades. Evalúa si la reparación y reutilización reducen efectos en todo el ciclo.',[5,6],review],
['Regulación y biodiversidad','Relacionar licenciamiento e impactos sobre ecosistemas.','Licenciamento ambiental establece condiciones para actividades; perda de biodiversidade afecta ecosistemas y debe evaluarse antes y después de una intervención.',[7,8],review],
['Distribución y justicia','Argumentar sobre justicia climática y costos sociales.','Justiça climática considera la distribución desigual de riesgos y responsabilidades; remoção de carbono requiere comprobar resultados y permanencia. Una política debe explicar quién recibe beneficios y quién asume costos.',[9,4],review]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['28-30']={units:[unit28,unit29,unit30]};
})(typeof window!=='undefined'?window:globalThis);
