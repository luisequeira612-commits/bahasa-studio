(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_b2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{
 const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;
 return {vocabId:word.id,type:'mc',prompt:'En «'+word.ex+'», ¿qué expresa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Interpreta el sentido de la expresión dentro de la situación y del registro.'};
};
const orderExercise=(word,index)=>{
 const correctOrder=word.ex.replace(/[.,!?;:]/g,'').trim().split(/\s+/).filter(Boolean);
 const offset=(index%(correctOrder.length-1))+1;
 let words=correctOrder.slice(offset).concat(correctOrder.slice(0,offset));
 if(words.join(' ')===correctOrder.join(' '))words=correctOrder.slice().reverse();
 return {vocabId:word.id,type:'order',prompt:'Reconstrua o exemplo que ilustra «'+word.target+'».',words,correctOrder,explanation:'Ordena as palavras para reconstruir o exemplo em português brasileiro.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_b2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>({title:spec[0],objective:spec[1],grammar:spec[2],vocabIds:spec[3].map(i=>words[i].id),reviewVocabIds:spec[4],exercises:[exercise(words,spec[3][0]),exercise(words,spec[3][1])]})),
 exercises:words.map((word,i)=>orderExercise(word,i))
});
const review=['ptbr_a2_u22_v09','ptbr_a2_u22_v10'];
const u31=[
vocab(31,1,'desigualdade estrutural','desigualdad estructural','A desigualdade estrutural limita oportunidades ao longo de gerações.','La desigualdad estructural limita las oportunidades a lo largo de generaciones.'),
vocab(31,2,'mobilidade social','movilidad social','A mobilidade social depende de oportunidades e políticas públicas.','La movilidad social depende de oportunidades y políticas públicas.'),
vocab(31,3,'disparidade regional','disparidad regional','A disparidade regional aparece nos indicadores de renda e infraestrutura.','La disparidad regional aparece en los indicadores de ingresos e infraestructura.'),
vocab(31,4,'barreira de acesso','barrera de acceso','O transporte precário ainda é uma barreira de acesso aos serviços.','El transporte deficiente sigue siendo una barrera de acceso a los servicios.'),
vocab(31,5,'ação afirmativa','acción afirmativa','A ação afirmativa busca corrigir desigualdades persistentes.','La acción afirmativa busca corregir desigualdades persistentes.'),
vocab(31,6,'representação política','representación política','A representação política precisa refletir a diversidade da população.','La representación política debe reflejar la diversidad de la población.'),
vocab(31,7,'exclusão institucional','exclusión institucional','A exclusão institucional pode ocorrer mesmo sem uma regra explícita.','La exclusión institucional puede ocurrir incluso sin una regla explícita.'),
vocab(31,8,'pertencimento comunitário','pertenencia comunitaria','O pertencimento comunitário fortalece redes de apoio local.','La pertenencia comunitaria fortalece las redes de apoyo local.'),
vocab(31,9,'vulnerabilidade interseccional','vulnerabilidad interseccional','A vulnerabilidade interseccional exige considerar fatores que se combinam.','La vulnerabilidad interseccional exige considerar factores que se combinan.'),
vocab(31,10,'coesão social','cohesión social','A coesão social depende de confiança e participação.','La cohesión social depende de la confianza y la participación.')
];
const u32=[
vocab(32,1,'requalificação profissional','recualificación profesional','A requalificação profissional facilita a transição para novas funções.','La recualificación profesional facilita la transición hacia nuevas funciones.'),
vocab(32,2,'trabalho por plataformas','trabajo mediante plataformas','O trabalho por plataformas exige regras claras de remuneração.','El trabajo mediante plataformas exige reglas claras de remuneración.'),
vocab(32,3,'vínculo empregatício','relación laboral','A empresa negou o vínculo empregatício, mas a decisão foi contestada.','La empresa negó la relación laboral, pero la decisión fue impugnada.'),
vocab(32,4,'conciliação trabalhista','conciliación laboral','A conciliação trabalhista permitiu resolver divergências sobre as condições de trabalho.','La conciliación laboral permitió resolver desacuerdos sobre las condiciones de trabajo.'),
vocab(32,5,'banco de horas','sistema de compensación de horas','O banco de horas precisa seguir regras claras de compensação e descanso.','El banco de horas debe seguir reglas claras de compensación y descanso.'),
vocab(32,6,'rotatividade de pessoal','rotación de personal','A rotatividade de pessoal aumentou após a mudança na gestão.','La rotación de personal aumentó tras el cambio de gestión.'),
vocab(32,7,'terceirização de serviços','externalización de servicios','A terceirização de serviços alterou a distribuição de responsabilidades.','La externalización de servicios cambió la distribución de responsabilidades.'),
vocab(32,8,'proteção previdenciária','protección de seguridad social','A proteção previdenciária precisa acompanhar as novas formas de trabalho.','La protección de seguridad social debe acompañar las nuevas formas de trabajo.'),
vocab(32,9,'automação de tarefas','automatización de tareas','A automação de tarefas reduziu atividades repetitivas.','La automatización de tareas redujo las actividades repetitivas.'),
vocab(32,10,'transição ocupacional','transición ocupacional','A transição ocupacional pode exigir formação complementar.','La transición ocupacional puede requerir formación complementaria.')
];
const u33=[
vocab(33,1,'salvaguarda de saberes','protección de saberes tradicionales','A salvaguarda de saberes protege práticas transmitidas entre gerações.','La salvaguarda de saberes protege prácticas transmitidas entre generaciones.'),
vocab(33,2,'apropriação cultural','apropiación cultural','O debate sobre apropriação cultural considera poder e contexto.','El debate sobre la apropiación cultural considera el poder y el contexto.'),
vocab(33,3,'representatividade cultural','representatividad cultural','A representatividade cultural influencia quem aparece nas narrativas públicas.','La representatividad cultural influye en quién aparece en las narrativas públicas.'),
vocab(33,4,'curadoria independente','curaduría independiente','A curadoria independente abriu espaço para artistas pouco conhecidos.','La curaduría independiente abrió espacio para artistas poco conocidos.'),
vocab(33,5,'memória oral','memoria oral','A memória oral preserva experiências transmitidas por relatos e testemunhos.','La memoria oral preserva experiencias transmitidas mediante relatos y testimonios.'),
vocab(33,6,'circulação transnacional','circulación transnacional','A circulação transnacional transforma a recepção de obras culturais.','La circulación transnacional transforma la recepción de obras culturales.'),
vocab(33,7,'hibridismo cultural','hibridismo cultural','O hibridismo cultural combina referências sem apagar suas origens.','El hibridismo cultural combina referencias sin borrar sus orígenes.'),
vocab(33,8,'estereótipo identitário','estereotipo identitario','O estereótipo identitário reduz experiências diversas a uma imagem fixa.','El estereotipo identitario reduce experiencias diversas a una imagen fija.'),
vocab(33,9,'apagamento histórico','borrado histórico','O apagamento histórico silencia contribuições de determinados grupos.','El borrado histórico silencia las contribuciones de determinados grupos.'),
vocab(33,10,'pluralidade linguística','pluralidad lingüística','A pluralidade linguística deve ser considerada nas políticas culturais.','La pluralidad lingüística debe tenerse en cuenta en las políticas culturales.')
];
const unit31=makeUnit(31,'Sociedad, desigualdad e inclusión','Analiza desigualdades persistentes, participación y barreras institucionales sin convertir experiencias diversas en generalizaciones.','A desigualdade estrutural puede limitar la mobilidade social y producir disparidade regional. Una barreira de acesso no siempre está escrita en una norma; la ação afirmativa y la representação política pueden reducir la exclusão institucional. El pertencimento comunitário, la vulnerabilidade interseccional y la coesão social permiten analizar dimensiones distintas de la inclusión.','Atribuir una causa única a fenómenos sociales complejos','Distingue indicadores, experiencias y mecanismos institucionales. Evita generalizar a partir de un caso y explica qué grupos o territorios quedan fuera del análisis.',u31,[
['Estructuras y oportunidades','Explicar cómo se reproduce una desigualdad entre generaciones.','Desigualdade estrutural describe mecanismos persistentes; mobilidade social se refiere a cambios en la posición social y depende de oportunidades distribuidas de manera desigual.',[0,1],review],
['Territorio y servicios','Comparar disparidades regionales y barreras de acceso.','Disparidade regional identifica diferencias entre territorios; barreira de acesso puede surgir de distancia, costo, infraestructura o procedimientos administrativos.',[2,3],review],
['Políticas de inclusión','Evaluar medidas de acción afirmativa y representación.','Ação afirmativa busca corregir desventajas persistentes; representação política permite analizar quién participa en decisiones colectivas y quién queda subrepresentado.',[4,5],review],
['Instituciones y pertenencia','Relacionar exclusión institucional y pertenencia comunitaria.','Exclusão institucional puede existir sin una prohibición explícita; pertencimento comunitário describe vínculos y reconocimiento dentro de una comunidad.',[6,7],review],
['Desigualdades combinadas','Argumentar sobre vulnerabilidad y cohesión social.','Vulnerabilidade interseccional considera factores que se combinan; coesão social se refiere a confianza, participación y vínculos entre grupos distintos.',[8,9],review]
]);
const unit32=makeUnit(32,'Trabajo y transformación profesional','Evalúa cambios laborales, automatización, protección social y negociación en contextos profesionales diversos.','La requalificação profissional puede apoyar una transição ocupacional ante la automação de tarefas. El trabalho por plataformas plantea preguntas sobre vínculo empregatício y proteção previdenciária; la conciliação trabalhista y el banco de horas deben considerar descanso, rotatividade de pessoal y terceirização de serviços.','Confundir flexibilidad con ausencia de protección','Distingue autonomía real, dependencia económica y responsabilidades contractuales. Considera quién asume los riesgos y qué mecanismos de protección siguen vigentes.',u32,[
['Cambios y formación','Explicar cómo la formación facilita una transición profesional.','Requalificação profissional actualiza competencias; transição ocupacional describe el paso hacia otra función o sector y puede requerir aprendizaje adicional.',[0,9],review],
['Nuevos modelos laborales','Analizar el trabajo mediante plataformas y la relación laboral.','Trabalho por plataformas organiza tareas mediante sistemas digitales; vínculo empregatício se refiere a una relación laboral reconocida jurídicamente según las condiciones efectivas.',[1,2],review],
['Derechos y negociación','Describir acuerdos colectivos y organización del tiempo.','Conciliação trabalhista permite resolver desacuerdos sobre condiciones de trabajo; banco de horas organiza horarios, pero no elimina los límites de descanso ni otras garantías.',[3,4],review],
['Gestión y responsabilidades','Evaluar rotación y externalización de servicios.','Rotatividade de pessoal mide la frecuencia de entrada y salida de trabajadores; terceirização de serviços transfiere la ejecución de actividades a otra empresa y exige delimitar responsabilidades.',[5,6],review],
['Protección y automatización','Argumentar sobre protección social ante la automatización.','Proteção previdenciária se relaciona con cobertura de seguridad social; automação de tarefas cambia actividades y puede exigir políticas de transición y formación.',[7,8],review]
]);
const unit33=makeUnit(33,'Cultura, identidad y representación','Interpreta disputas sobre patrimonio, representación y circulación cultural desde perspectivas históricas y transnacionales.','La salvaguarda de saberes protege prácticas y saberes; la apropriação cultural exige analizar contexto y asimetrías. La representatividade cultural y la curadoria independente influyen en la visibilidad pública. La memória oral puede cambiar con la circulação transnacional y el hibridismo cultural; los estereótipos, el apagamento histórico y la pluralidade linguística plantean desafíos de representación.','Reducir una tradición a una imagen fija o a una sola voz','Identifica quién narra, quién obtiene visibilidad y qué contextos se omiten. Diferencia intercambio, influencia y apropiación, sin atribuir una intención uniforme a comunidades enteras.',u33,[
['Patrimonio y transmisión','Explicar la preservación de prácticas culturales.','A salvaguarda de saberes protege saberes, celebraciones y prácticas transmitidas; memória oral reúne relatos compartidos que pueden revisarse con nuevas evidencias.',[0,4],review],
['Poder y apropiación','Analizar una disputa sobre apropiación cultural.','Apropriação cultural requiere observar contexto, poder y beneficios; representatividade cultural pregunta qué voces aparecen y cuáles quedan ausentes.',[1,2],review],
['Selección y visibilidad','Evaluar el papel de una curaduría independiente.','Curadoria independente selecciona y presenta obras sin depender de una institución dominante; circulação transnacional transforma la circulación y el acceso a esas obras.',[3,5],review],
['Cruces culturales','Describir el hibridismo y la pluralidad de expresiones.','Hibridismo cultural combina referencias y mantiene visibles sus trayectorias; pluralidade linguística reconoce la coexistencia de lenguas y variedades en una comunidad.',[6,9],review],
['Identidad y memoria','Cuestionar estereotipos y silencios históricos.','Estereótipo identitário fija una imagen simplificada; apagamento histórico silencia contribuciones; pluralidade linguística reconoce distintas formas de expresión y pertenencia.',[7,8],review]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].B2['31-33']={units:[unit31,unit32,unit33]};
})(typeof window!=='undefined'?window:globalThis);
