(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b1_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trap,words,specs)=>({
 unitNumber:number,id:'ptbr_b1_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trap[0],detail:trap[1]},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((_,i)=>exercise(words,i))
});
const u1=[
vocab(1,1,'acontecimento','acontecimiento','O acontecimento mudou a rotina de toda a comunidade.','El acontecimiento cambió la rutina de toda la comunidad.'),
vocab(1,2,'trajetória','trayectoria','A trajetória profissional dela passou por várias mudanças.','Su trayectoria profesional pasó por varios cambios.'),
vocab(1,3,'circunstância','circunstancia','Naquela circunstância, foi necessário tomar uma decisão rápida.','En aquella circunstancia, fue necesario tomar una decisión rápida.'),
vocab(1,4,'superação','superación','A superação das dificuldades exigiu paciência e apoio.','La superación de las dificultades exigió paciencia y apoyo.'),
vocab(1,5,'conquista','logro / conquista','A conclusão do curso foi uma conquista importante.','Terminar el curso fue un logro importante.'),
vocab(1,6,'reviravolta','giro inesperado','Uma reviravolta mudou o rumo da história.','Un giro inesperado cambió el rumbo de la historia.'),
vocab(1,7,'testemunho','testimonio','O testemunho da moradora esclareceu o que aconteceu.','El testimonio de la vecina aclaró lo que ocurrió.'),
vocab(1,8,'lembrança','recuerdo','Essa lembrança ainda provoca muita emoção.','Ese recuerdo todavía provoca mucha emoción.'),
vocab(1,9,'desfecho','desenlace','O desfecho da narrativa surpreendeu os leitores.','El desenlace de la narración sorprendió a los lectores.'),
vocab(1,10,'aprendizado','aprendizaje','O aprendizado veio depois de várias tentativas.','El aprendizaje llegó después de varios intentos.')
];
const u2=[
vocab(2,1,'argumento','argumento','O argumento precisa estar apoiado em informações confiáveis.','El argumento debe apoyarse en información confiable.'),
vocab(2,2,'indício','indicio / señal','O indício encontrado reforça a explicação apresentada.','El indicio encontrado refuerza la explicación presentada.'),
vocab(2,3,'ressalva','salvedad','Concordo com a proposta, mas faço uma ressalva.','Estoy de acuerdo con la propuesta, pero hago una salvedad.'),
vocab(2,4,'contradição','contradicción','Há uma contradição entre a promessa e o resultado.','Hay una contradicción entre la promesa y el resultado.'),
vocab(2,5,'perspectiva','perspectiva','É importante considerar a perspectiva de quem será afetado.','Es importante considerar la perspectiva de quien se verá afectado.'),
vocab(2,6,'posicionamento','postura / posicionamiento','A instituição divulgou seu posicionamento sobre o tema.','La institución publicó su postura sobre el tema.'),
vocab(2,7,'convicção','convicción','Ela defendeu sua ideia com convicção e respeito.','Ella defendió su idea con convicción y respeto.'),
vocab(2,8,'contestação','objeción / impugnación','A contestação apresentou motivos diferentes.','La objeción presentó motivos diferentes.'),
vocab(2,9,'consenso','consenso','O grupo chegou a um consenso depois do debate.','El grupo llegó a un consenso después del debate.'),
vocab(2,10,'controvérsia','controversia','A decisão gerou controvérsia entre os especialistas.','La decisión generó controversia entre los especialistas.')
];
const u3=[
vocab(3,1,'conjectura','conjetura','A conjectura será analisada antes de qualquer conclusão.','La conjetura se analizará antes de cualquier conclusión.'),
vocab(3,2,'suposição','suposición','Não devemos tratar uma suposição como se fosse um fato.','No debemos tratar una suposición como si fuera un hecho.'),
vocab(3,3,'consequência','consecuencia','Toda escolha pode trazer uma consequência inesperada.','Toda elección puede traer una consecuencia inesperada.'),
vocab(3,4,'condição','condición','A participação depende de uma condição específica.','La participación depende de una condición específica.'),
vocab(3,5,'possibilidade','posibilidad','Ainda existe a possibilidade de mudar o cronograma.','Todavía existe la posibilidad de cambiar el calendario.'),
vocab(3,6,'improvável','improbable','É improvável que todos concordem imediatamente.','Es improbable que todos estén de acuerdo de inmediato.'),
vocab(3,7,'desde que','siempre que / con tal de que','Podemos adiar a reunião, desde que todos sejam avisados.','Podemos aplazar la reunión, siempre que todos sean avisados.'),
vocab(3,8,'caso contrário','de lo contrario','Revise os dados; caso contrário, a conclusão pode estar errada.','Revise los datos; de lo contrario, la conclusión puede estar equivocada.'),
vocab(3,9,'a menos que','a menos que','A proposta será aprovada, a menos que surja um problema grave.','La propuesta será aprobada, a menos que surja un problema grave.'),
vocab(3,10,'eventualidade','imprevisto / eventualidad','Precisamos de um plano para qualquer eventualidade.','Necesitamos un plan para cualquier imprevisto.')
];
const unit1=makeUnit(1,'Relatos y experiencias significativas','Narra experiencias, organiza acontecimientos y explica cómo una situación influyó en una trayectoria.','Para narrar, combina o pretérito perfeito para hechos concluidos e o imperfeito para contexto e hábitos. O mais-que-perfeito composto (tinha + particípio) indica uma ação anterior a outra no passado.','Pretéritos na narrativa','O perfeito apresenta o acontecimento; o imperfeito descreve o cenário. Tinha acontecido situa um fato antes de outro momento passado.',u1,[
['Lección 1: Acontecimientos y contexto','Identifica un hecho y describe las circunstancias en que ocurrió.','Acontecimento y circunstância ayudan a presentar el hecho y su contexto. El perfeito relata lo que pasó; el imperfeito describe cómo era la situación.',[0,2],['ptbr_a2_u28_v01','ptbr_a2_u29_v01']],
['Lección 2: Trayectorias y cambios','Describe etapas y cambios en una experiencia personal.','Trajetória organiza etapas de una vida o carrera; reviravolta marca un cambio inesperado.',[1,5],['ptbr_a2_u30_v01']],
['Lección 3: Dificultades y logros','Explica un proceso de superación y su resultado.','Superação describe vencer dificultades; conquista nombra el logro alcanzado.',[3,4],['ptbr_a2_u26_v01']],
['Lección 4: Relatos y testimonios','Cuenta una experiencia desde el punto de vista de quien la vivió.','Testemunho presenta el relato de una persona. Tinha + particípio permite indicar qué había ocurrido antes.',[6,7],['ptbr_a2_u20_v01']],
['Lección 5: Desenlace y aprendizaje','Explica cómo terminó una experiencia y qué se aprendió.','Desfecho presenta el final de un relato; aprendizado destaca lo aprendido a partir de la experiencia.',[8,9],['ptbr_a2_u17_v01']]
]);
const unit2=makeUnit(2,'Argumentación y debate','Presenta una postura, apoya ideas con evidencias y responde a objeciones con matices.','Organiza argumentos con porque y portanto; contrapone ideas con no entanto y por outro lado. Embora y apesar de introducen concesiones; conviene distinguir opinión, evidencia y conclusión.','Conectores de argumentación','No uses portanto como sinónimo de porém: portanto introduce una consecuencia; porém y no entanto expresan contraste.',u2,[
['Lección 1: Construir un argumento','Explica una idea y la información que la respalda.','Argumento presenta una razón; indício aporta una señal o dato que la sostiene.',[0,1],['ptbr_a2_u27_v01']],
['Lección 2: Añadir matices','Expresa acuerdo parcial y presenta una salvedad.','Ressalva limita o matiza una afirmación. No entanto introduce una idea que contrasta con la anterior.',[2,3],['ptbr_a2_u27_v02']],
['Lección 3: Comparar perspectivas','Considera distintos puntos de vista antes de decidir.','Perspectiva expresa un punto de vista; posicionamento indica la postura adoptada.',[4,5],['ptbr_a2_u20_v05']],
['Lección 4: Defender y cuestionar ideas','Defiende una postura y responde a una objeción.','Convicção expresa seguridad en una idea; contestação presenta una objeción o impugnación.',[6,7],['ptbr_a2_u21_v07']],
['Lección 5: Llegar a un consenso','Resume diferencias y busca un acuerdo razonado.','Consenso nombra un acuerdo compartido; controvérsia señala un desacuerdo que genera debate.',[8,9],['ptbr_a2_u20_v04']]
]);
const unit3=makeUnit(3,'Hipótesis y consecuencias','Plantea escenarios posibles, establece condiciones y explica resultados probables.','Para hipóteses irreais ou pouco prováveis, usa se + imperfeito do subjuntivo e futuro do pretérito (se tivesse tempo, participaria). Caso, desde que e a menos que introduzem condições; caso contrário apresenta uma consequência alternativa.','Condición y subjuntivo','No confundas una condición real con una hipótesis: si a condição é incerta ou hipotética, a forma verbal pode exigir o subjuntivo.',u3,[
['Lección 1: Conjeturas y suposiciones','Distingue una conjetura de un hecho comprobado.','Conjectura plantea una explicación posible; suposição es una idea aceptada provisionalmente sin prueba suficiente.',[0,1],['ptbr_a2_u27_v03']],
['Lección 2: Consecuencias y condiciones','Explica qué puede ocurrir si se cumple una condición.','Consequência nombra el resultado; condição establece lo que debe cumplirse.',[2,3],['ptbr_a2_u30_v05']],
['Lección 3: Posibilidades e improbabilidad','Valora si un escenario puede suceder.','Possibilidade expresa que algo puede ocurrir; improvável indica que tiene pocas probabilidades. Es común usar subjuntivo después de é improvável que.',[4,5],['ptbr_a2_u24_v03']],
['Lección 4: Condiciones con desde que','Formula requisitos para que una acción sea posible.','Desde que equivale a siempre que y suele introducir una condición: desde que todos concordem.',[6,7],['ptbr_a2_u29_v09']],
['Lección 5: Excepciones y planes alternativos','Presenta una excepción y explica qué ocurriría en otro caso.','A menos que introduce una excepción; caso contrário presenta la consecuencia alternativa y eventualidade nombra un imprevisto.',[8,9],['ptbr_a2_u30_v08']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B1['01-03']={units:[unit1,unit2,unit3]};
})(typeof window!=='undefined'?window:globalThis);
