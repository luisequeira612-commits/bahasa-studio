(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const lesson=(spec,words)=>({
 title:spec[0],objective:spec[1],grammar:spec[2],
 vocabIds:spec[3].map(n=>words[n].id),reviewVocabIds:spec[4]||[],
 exercises:[makeExercise(words,spec[3][0]),makeExercise(words,spec[3][1])]
});
const makeExercise=(words,index)=>{
 const correct=words[index], candidates=[correct.esp,words[(index+3)%10].esp,words[(index+6)%10].esp];
 const answer=index%3, options=candidates.slice(3-answer).concat(candidates.slice(0,3-answer));
 return {vocabId:correct.id,type:'mc',prompt:'¿Qué significa «'+correct.target+'»?',options,answer,explanation:'Relaciona la expresión con su significado en español.'};
};
const makeUnit=(number,title,desc,grammar,trapTitle,trapDetail,words,specs)=>({
 unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,
 trap:{title:trapTitle,detail:trapDetail},vocab:words,
 lessons:specs.map(spec=>lesson(spec,words)),
 exercises:words.map((word,index)=>makeExercise(words,index))
});
const u13=[
vocab(13,1,'orçamento','presupuesto','Preparei um orçamento para controlar os gastos do mês.','Preparé un presupuesto para controlar los gastos del mes.'),
vocab(13,2,'saldo','saldo','Consultei o saldo antes de fazer a compra.','Consulté el saldo antes de hacer la compra.'),
vocab(13,3,'saque','retiro de dinero','Preciso fazer um saque no caixa eletrônico.','Necesito retirar dinero en el cajero automático.'),
vocab(13,4,'depósito','depósito','O depósito foi confirmado pelo banco.','El depósito fue confirmado por el banco.'),
vocab(13,5,'transferência','transferencia bancaria','A transferência chegou à outra conta hoje.','La transferencia llegó a la otra cuenta hoy.'),
vocab(13,6,'tarifa','comisión / tarifa','O banco cobra uma tarifa pelo serviço.','El banco cobra una comisión por el servicio.'),
vocab(13,7,'juros','intereses','Os juros aumentam o valor da dívida.','Los intereses aumentan el valor de la deuda.'),
vocab(13,8,'parcela','cuota','Vou pagar a última parcela na sexta-feira.','Voy a pagar la última cuota el viernes.'),
vocab(13,9,'empréstimo','préstamo','Ela pediu um empréstimo para reformar a casa.','Ella pidió un préstamo para renovar la casa.'),
vocab(13,10,'poupança','ahorros / cuenta de ahorro','Ele guarda uma parte do salário na poupança.','Él guarda una parte del salario en sus ahorros.')
];
const u14=[
vocab(14,1,'currículo','currículum','Atualizei meu currículo antes de procurar emprego.','Actualicé mi currículum antes de buscar empleo.'),
vocab(14,2,'vaga','puesto vacante','A empresa anunciou uma vaga para assistente.','La empresa anunció una vacante para asistente.'),
vocab(14,3,'candidatura','candidatura / solicitud','Enviei minha candidatura pela página da empresa.','Envié mi candidatura por la página de la empresa.'),
vocab(14,4,'seleção','proceso de selección','O processo de seleção terá duas etapas.','El proceso de selección tendrá dos etapas.'),
vocab(14,5,'contratação','contratación','A contratação será concluída depois da entrevista.','La contratación se completará después de la entrevista.'),
vocab(14,6,'demissão','despido / renuncia','A demissão foi comunicada na segunda-feira.','El despido fue comunicado el lunes.'),
vocab(14,7,'salário','salario','O salário é pago no fim do mês.','El salario se paga al final del mes.'),
vocab(14,8,'benefício','prestación laboral','O plano de saúde é um benefício da empresa.','El seguro médico es una prestación de la empresa.'),
vocab(14,9,'jornada','jornada laboral','A jornada de trabalho começa às oito.','La jornada laboral empieza a las ocho.'),
vocab(14,10,'promoção','ascenso / promoción','Ela recebeu uma promoção depois de dois anos.','Ella recibió un ascenso después de dos años.')
];
const u15=[
vocab(15,1,'documento','documento','Apresente um documento com foto no atendimento.','Presenta un documento con foto en el servicio de atención.'),
vocab(15,2,'formulário','formulario','Preencha o formulário com letras legíveis.','Completa el formulario con letra legible.'),
vocab(15,3,'atendimento','atención al público','O atendimento funciona até as quatro da tarde.','La atención al público funciona hasta las cuatro de la tarde.'),
vocab(15,4,'solicitação','solicitud','A solicitação foi recebida pelo departamento.','La solicitud fue recibida por el departamento.'),
vocab(15,5,'comprovante','comprobante','Guarde o comprovante depois do pagamento.','Guarda el comprobante después del pago.'),
vocab(15,6,'protocolo','número de trámite / protocolo','Anote o número do protocolo para acompanhar o pedido.','Anota el número de trámite para dar seguimiento a la solicitud.'),
vocab(15,7,'agendamento','programación de cita','O agendamento pode ser feito pela internet.','La programación de la cita se puede hacer por internet.'),
vocab(15,8,'cadastro','registro','O cadastro precisa de um endereço atualizado.','El registro necesita una dirección actualizada.'),
vocab(15,9,'autorização','autorización','A autorização deve ser assinada pelo responsável.','La autorización debe ser firmada por el responsable.'),
vocab(15,10,'renovação','renovación','A renovação do documento vence no próximo mês.','La renovación del documento vence el próximo mes.')
];
const unit13=makeUnit(13,'Finanzas personales y servicios bancarios','Organiza un presupuesto y comprende operaciones bancarias y pagos habituales.',
'Orçamento y saldo ayudan a controlar el dinero. Saque, depósito y transferência nombran operaciones; tarifa, juros y parcela explican costes y pagos.',
'Saque y depósito','Saque es retirar dinero; depósito es ingresar dinero. Son operaciones opuestas, aunque ambas pueden realizarse en un caixa eletrônico.',
u13,[
['Lección 1: Presupuesto y saldo','Habla de un presupuesto y del dinero disponible.','Orçamento planifica ingresos y gastos; saldo indica el dinero disponible en un momento concreto.',[0,1],['ptbr_a2_u5_v08','ptbr_a2_u3_v03']],
['Lección 2: Retirar e ingresar dinero','Distingue dos operaciones bancarias.','Fazer um saque es retirar dinero; fazer um depósito es ingresar dinero.',[2,3],['ptbr_a2_u6_v04']],
['Lección 3: Transferencias y tarifas','Comprende transferencias y sus costes.','Transferência mueve dinero entre cuentas; tarifa es el coste cobrado por un servicio.',[4,5],['ptbr_a2_u6_v05']],
['Lección 4: Intereses y cuotas','Describe el coste de un pago financiado.','Juros suele expresar un coste financiero; parcela es cada pago de una cantidad dividida.',[6,7],['ptbr_a2_u5_v01']],
['Lección 5: Préstamos y ahorros','Habla de pedir dinero y guardar una reserva.','Empréstimo es dinero recibido que debe devolverse; poupança es dinero guardado o una cuenta de ahorro.',[8,9],['ptbr_a2_u3_v03']]
]);
const unit14=makeUnit(14,'Búsqueda de empleo y condiciones laborales','Comprende anuncios de empleo, candidaturas y condiciones básicas de trabajo.',
'Currículo presenta la trayectoria de una persona. Vaga es un puesto disponible; candidatura participa en una seleção. Salário, benefício y jornada describen condiciones laborales.',
'Vaga y candidatura','Vaga es el puesto disponible; candidatura es la solicitud que una persona presenta para ocuparlo.',
u14,[
['Lección 1: Currículum y vacantes','Identifica documentos y oportunidades de empleo.','Currículo resume formación y experiencia; vaga indica un puesto disponible.',[0,1],['ptbr_a2_u4_v05']],
['Lección 2: Presentar una candidatura','Habla de solicitudes y procesos de selección.','Candidatura es la solicitud; seleção es el proceso para elegir a una persona.',[2,3],['ptbr_a2_u3_v07']],
['Lección 3: Contratación y demisión','Comprende el inicio y el fin de una relación laboral.','Contratação nombra el proceso de incorporar a alguien; demissão puede ser despido o renuncia según el contexto.',[4,5],['ptbr_a2_u7_v04']],
['Lección 4: Salario y beneficios','Describe la remuneración y las prestaciones.','Salário es el pago por el trabajo; benefício es una prestación adicional.',[6,7],['ptbr_a2_u5_v01']],
['Lección 5: Jornada y promoción','Habla del horario y del crecimiento profesional.','Jornada de trabalho es el tiempo de trabajo; promoção puede significar ascenso laboral.',[8,9],['ptbr_a2_u3_v03']]
]);
const unit15=makeUnit(15,'Trámites y servicios públicos','Completa formularios, presenta solicitudes y sigue el estado de un trámite.',
'Documento y formulário sirven para presentar datos. Solicitação inicia un pedido; comprovante acredita una operación. Protocolo permite identificar y acompanhar el trámite.',
'Comprovante y protocolo','Comprovante demuestra que una acción ocurrió; protocolo identifica el registro de una solicitud para poder seguirla.',
u15,[
['Lección 1: Documentos y formularios','Identifica documentos y completa formularios.','Documento acredita información; formulário organiza los datos que se deben proporcionar.',[0,1],['ptbr_a2_u7_v03']],
['Lección 2: Atención y solicitudes','Pide atención y presenta una solicitud.','Atendimento es el servicio recibido; solicitação es el pedido formal que se presenta.',[2,3],['ptbr_a2_u6_v02']],
['Lección 3: Comprobantes y protocolos','Conserva pruebas y referencias de un trámite.','Comprovante sirve como prueba; protocolo permite identificar y consultar una solicitud.',[4,5],['ptbr_a2_u9_v04']],
['Lección 4: Citas y registros','Programa una cita y actualiza los datos.','Agendamento organiza una cita; cadastro reúne datos registrados de una persona.',[6,7],['ptbr_a2_u3_v06']],
['Lección 5: Autorizaciones y renovaciones','Comprende permisos y renovaciones de documentos.','Autorização expresa permiso; renovação indica que un documento o registro se actualiza para un nuevo período.',[8,9],['ptbr_a2_u7_v01']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['13-15']={units:[unit13,unit14,unit15]};
})(typeof window!=='undefined'?window:globalThis);
