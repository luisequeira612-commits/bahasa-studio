(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],answer=index%3,choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trap,words,lessons)=>({unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap,vocab:words,lessons:lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:s[4],exercises:[exercise(words,s[3][0]),exercise(words,s[3][1])]})),exercises:words.map((_,i)=>exercise(words,i))});
const u28=[
vocab(28,1,'dispositivo','dispositivo / aparato','O dispositivo permite acessar os serviços digitais.','El dispositivo permite acceder a los servicios digitales.'),
vocab(28,2,'aplicativo','aplicación / app','Baixe o aplicativo oficial para acompanhar o serviço.','Descarga la aplicación oficial para seguir el servicio.'),
vocab(28,3,'tela','pantalla','A tela do aparelho ficou escura de repente.','La pantalla del aparato se oscureció de repente.'),
vocab(28,4,'bateria','batería','A bateria está quase descarregada.','La batería está casi descargada.'),
vocab(28,5,'carregador','cargador','Esqueci o carregador em casa.','Olvidé el cargador en casa.'),
vocab(28,6,'tomada','enchufe / toma de corriente','Conecte o carregador à tomada perto da mesa.','Conecta el cargador al enchufe que está cerca de la mesa.'),
vocab(28,7,'sinal','señal','O sinal está fraco neste cômodo.','La señal está débil en esta habitación.'),
vocab(28,8,'armazenamento','almacenamiento','O armazenamento do aparelho está quase cheio.','El almacenamiento del aparato está casi lleno.'),
vocab(28,9,'baixar','descargar','Você pode baixar o documento pelo site.','Puedes descargar el documento desde el sitio web.'),
vocab(28,10,'instalar','instalar','É necessário instalar a atualização antes de abrir o aplicativo.','Es necesario instalar la actualización antes de abrir la aplicación.')
];
const u29=[
vocab(29,1,'atendente','empleado de atención / dependiente','A atendente explicou como retirar o documento.','La empleada de atención explicó cómo retirar el documento.'),
vocab(29,2,'recepção','recepción','A recepção fica ao lado da entrada principal.','La recepción está al lado de la entrada principal.'),
vocab(29,3,'balcão','mostrador','Procure o balcão de informações.','Busca el mostrador de información.'),
vocab(29,4,'guichê','ventanilla','O pagamento pode ser feito no guichê três.','El pago se puede realizar en la ventanilla tres.'),
vocab(29,5,'fila','fila / cola','A fila avançou depois da abertura de outro caixa.','La fila avanzó después de que abrieron otra caja.'),
vocab(29,6,'demora','demora / tardanza','Pedimos desculpas pela demora no atendimento.','Pedimos disculpas por la demora en la atención.'),
vocab(29,7,'prioridade','prioridad','Pessoas com prioridade são atendidas primeiro.','Las personas con prioridad son atendidas primero.'),
vocab(29,8,'cordialidade','cordialidad / amabilidad','A cordialidade facilita a comunicação com o público.','La amabilidad facilita la comunicación con el público.'),
vocab(29,9,'encaminhamento','derivación / remisión','O encaminhamento foi enviado ao setor responsável.','La derivación fue enviada al departamento responsable.'),
vocab(29,10,'retorno','respuesta / seguimiento','A equipe prometeu dar um retorno até amanhã.','El equipo prometió dar una respuesta antes de mañana.')
];
const u30=[
vocab(30,1,'planejamento','planificación','O planejamento do projeto começou com uma reunião.','La planificación del proyecto comenzó con una reunión.'),
vocab(30,2,'cronograma','cronograma / calendario de trabajo','O cronograma mostra as datas de cada atividade.','El cronograma muestra las fechas de cada actividad.'),
vocab(30,3,'etapa','etapa / fase','A próxima etapa depende da aprovação da equipe.','La siguiente etapa depende de la aprobación del equipo.'),
vocab(30,4,'meta','meta / objetivo','A meta é concluir a primeira versão até sexta-feira.','La meta es terminar la primera versión antes del viernes.'),
vocab(30,5,'colaboração','colaboración','A colaboração entre os setores melhorou o resultado.','La colaboración entre los departamentos mejoró el resultado.'),
vocab(30,6,'delegar','delegar','A coordenadora decidiu delegar algumas tarefas.','La coordinadora decidió delegar algunas tareas.'),
vocab(30,7,'contribuição','contribución / aporte','A contribuição de cada pessoa foi importante.','La contribución de cada persona fue importante.'),
vocab(30,8,'desempenho','desempeño / rendimiento','O desempenho da equipe melhorou neste trimestre.','El desempeño del equipo mejoró este trimestre.'),
vocab(30,9,'imprevisto','imprevisto','Um imprevisto atrasou a entrega do relatório.','Un imprevisto retrasó la entrega del informe.'),
vocab(30,10,'coordenar','coordinar','É preciso coordenar as atividades de diferentes equipes.','Es necesario coordinar las actividades de diferentes equipos.')
];
const unit28=makeUnit(28,'Dispositivos y recursos digitales','Describe dispositivos cotidianos, sus componentes y algunas acciones para usar aplicaciones y archivos.','Dispositivo es un aparato electrónico; tela muestra la información. Baixar obtiene un archivo desde internet e instalar prepara una aplicación para usarla.',['Baixar e instalar','Baixar copia un archivo o aplicación desde una red; instalar lo configura para que pueda ejecutarse en el dispositivo.'],u28,[
['Lección 1: Aparatos y pantallas','Identifica dispositivos y sus superficies de visualización.','Dispositivo nombra un aparato electrónico; tela es la superficie donde se muestra la información.',[0,2],['ptbr_a2_u16_v06','ptbr_a2_u16_v07']],
['Lección 2: Batería y cargador','Habla de la energía que necesita un aparato portátil.','Bateria almacena energía; carregador repone esa energía en el dispositivo.',[3,4],['ptbr_a2_u16_v07','ptbr_a2_u16_v08']],
['Lección 3: Enchufes y señal','Describe cómo se conecta un aparato y la calidad de la señal.','Tomada es el punto de conexión eléctrica; sinal indica la recepción de una red o transmisión.',[5,6],['ptbr_a2_u16_v05','ptbr_a2_u16_v09']],
['Lección 4: Aplicaciones y descargas','Explica cómo obtener una aplicación o un archivo.','Aplicativo es un programa para realizar tareas; baixar es transferir un archivo desde internet al dispositivo.',[1,8],['ptbr_a2_u16_v07','ptbr_a2_u16_v09']],
['Lección 5: Instalación y almacenamiento','Habla de preparar programas y gestionar el espacio digital.','Instalar configura un programa para usarlo; armazenamento es el espacio donde se guardan archivos.',[9,7],['ptbr_a2_u16_v06','ptbr_a2_u16_v08']]
]);
const unit29=makeUnit(29,'Atención al público y servicios','Comprende el vocabulario habitual de una recepción, los mostradores de servicio y la atención de solicitudes.','Atendente es la persona que orienta al público; balcão y guichê son lugares físicos de atención. Encaminhamento deriva una solicitud al sector adecuado.',['Balcão y guichê','Balcão suele ser un mostrador de atención; guichê es una ventanilla donde se realizan trámites o pagos.'],u29,[
['Lección 1: Personal y recepción','Identifica a las personas y los espacios de bienvenida.','Atendente orienta a quien solicita ayuda; recepção es el espacio donde se recibe al público.',[0,1],['ptbr_a2_u15_v03','ptbr_a2_u15_v08']],
['Lección 2: Mostradores y ventanillas','Distingue los lugares donde se solicita información o se realiza un trámite.','Balcão es un mostrador; guichê es una ventanilla de atención.',[2,3],['ptbr_a2_u15_v05','ptbr_a2_u15_v06']],
['Lección 3: Filas y tiempos de espera','Describe la organización de turnos y las demoras.','Fila es una serie de personas que esperan; demora indica que algo tarda más de lo previsto.',[4,5],['ptbr_a2_u21_v07','ptbr_a2_u21_v10']],
['Lección 4: Prioridad y trato cordial','Habla del orden de atención y de la amabilidad con el público.','Prioridade determina quién debe ser atendido antes; cordialidade describe un trato amable y respetuoso.',[6,7],['ptbr_a2_u20_v05','ptbr_a2_u20_v06']],
['Lección 5: Derivaciones y respuestas','Explica cómo se transfiere una solicitud y se informa al usuario.','Encaminhamento dirige un asunto al área responsable; retorno es la respuesta o seguimiento que se ofrece.',[8,9],['ptbr_a2_u15_v04','ptbr_a2_u21_v07']]
]);
const unit30=makeUnit(30,'Planificación y trabajo en equipo','Organiza proyectos sencillos, distribuye responsabilidades y describe el progreso de un equipo.','Planejamento define cómo se realizará un proyecto; cronograma ordena sus actividades en el tiempo. Delegar distribuye tareas y coordenar articula el trabajo del grupo.',['Etapa y meta','Etapa es una fase del proceso; meta es el resultado que se desea alcanzar.'],u30,[
['Lección 1: Planificación y cronogramas','Describe cómo se organiza un proyecto y sus fechas.','Planejamento define acciones y recursos; cronograma presenta las fechas y el orden de las actividades.',[0,1],['ptbr_a2_u14_v09','ptbr_a2_u17_v09']],
['Lección 2: Etapas y metas','Expresa fases de trabajo y objetivos concretos.','Etapa es una fase del proyecto; meta es el objetivo que se espera alcanzar.',[2,3],['ptbr_a2_u17_v06','ptbr_a2_u17_v10']],
['Lección 3: Colaboración y aportes','Habla de la participación de cada integrante.','Colaboração es el trabajo conjunto; contribuição es el aporte que hace cada persona.',[4,6],['ptbr_a2_u20_v05','ptbr_a2_u20_v07']],
['Lección 4: Delegar y coordinar','Describe cómo se distribuyen y organizan las tareas.','Delegar asigna una responsabilidad a otra persona; coordenar organiza acciones entre varias personas o equipos.',[5,9],['ptbr_a2_u14_v05','ptbr_a2_u20_v08']],
['Lección 5: Desempeño e imprevistos','Evalúa el trabajo y explica cambios inesperados.','Desempenho describe cómo se realiza una actividad; imprevisto es algo inesperado que modifica el plan.',[7,8],['ptbr_a2_u14_v10','ptbr_a2_u20_v10']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['28-30']={units:[unit28,unit29,unit30]};
})(typeof window!=='undefined'?window:globalThis);
