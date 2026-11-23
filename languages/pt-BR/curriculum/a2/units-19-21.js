(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trap,words,lessons)=>({unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap,vocab:words,lessons:lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:s[4],exercises:[exercise(words,s[3][0]),exercise(words,s[3][1])]})),exercises:words.map((_,i)=>exercise(words,i))});
const u19=[
vocab(19,1,'imobiliária','inmobiliaria / agencia inmobiliaria','Encontrei o apartamento em uma imobiliária do bairro.','Encontré el apartamento en una inmobiliaria del barrio.'),
vocab(19,2,'aluguel','alquiler','O aluguel vence no quinto dia útil do mês.','El alquiler vence el quinto día hábil del mes.'),
vocab(19,3,'condomínio','comunidad / gastos del edificio','O condomínio inclui a limpeza das áreas comuns.','Los gastos de comunidad incluyen la limpieza de las zonas comunes.'),
vocab(19,4,'proprietário','propietario','O proprietário vai entregar as chaves amanhã.','El propietario entregará las llaves mañana.'),
vocab(19,5,'inquilino','inquilino / arrendatario','O inquilino precisa avisar antes de sair do imóvel.','El inquilino debe avisar antes de dejar la vivienda.'),
vocab(19,6,'fiador','fiador / avalista','O contrato pede um fiador como garantia.','El contrato pide un fiador como garantía.'),
vocab(19,7,'vistoria','inspección del inmueble','A vistoria registrou o estado das paredes.','La inspección registró el estado de las paredes.'),
vocab(19,8,'reforma','reforma / renovación','A reforma da cozinha começa na próxima semana.','La reforma de la cocina empieza la próxima semana.'),
vocab(19,9,'encanamento','tuberías / instalación de agua','O encanamento do banheiro precisa de reparo.','Las tuberías del baño necesitan reparación.'),
vocab(19,10,'infiltração','filtración de agua / humedad','A infiltração apareceu depois da chuva forte.','La filtración apareció después de la lluvia fuerte.')
];
const u20=[
vocab(20,1,'convivência','convivencia','A convivência melhora quando todos colaboram.','La convivencia mejora cuando todos colaboran.'),
vocab(20,2,'desentendimento','desacuerdo / malentendido','Um desentendimento causou tensão entre os vizinhos.','Un desacuerdo causó tensión entre los vecinos.'),
vocab(20,3,'discussão','discusión','A discussão terminou depois de uma conversa tranquila.','La discusión terminó después de una conversación tranquila.'),
vocab(20,4,'acordo','acuerdo','As duas partes chegaram a um acordo.','Las dos partes llegaron a un acuerdo.'),
vocab(20,5,'respeito','respeto','O respeito às diferenças fortalece a convivência.','El respeto a las diferencias fortalece la convivencia.'),
vocab(20,6,'limite','límite','É importante estabelecer um limite claro.','Es importante establecer un límite claro.'),
vocab(20,7,'confiança','confianza','A confiança cresce com atitudes coerentes.','La confianza crece con actitudes coherentes.'),
vocab(20,8,'mediação','mediación','A mediação ajudou as partes a conversar.','La mediación ayudó a las partes a conversar.'),
vocab(20,9,'reconciliação','reconciliación','A reconciliação aconteceu depois do pedido de desculpas.','La reconciliación ocurrió después de la disculpa.'),
vocab(20,10,'compromisso','compromiso','Cada pessoa assumiu o compromisso de cumprir o combinado.','Cada persona asumió el compromiso de cumplir lo acordado.')
];
const u21=[
vocab(21,1,'consumidor','consumidor','O consumidor tem direito a receber informações claras.','El consumidor tiene derecho a recibir información clara.'),
vocab(21,2,'garantia','garantía','O produto ainda está dentro do prazo de garantia.','El producto todavía está dentro del período de garantía.'),
vocab(21,3,'defeito','defecto','A loja confirmou um defeito no aparelho.','La tienda confirmó un defecto en el aparato.'),
vocab(21,4,'troca','cambio','A troca pode ser solicitada com a nota fiscal.','El cambio puede solicitarse con la factura.'),
vocab(21,5,'devolução','devolución','A devolução foi registrada pelo atendimento.','La devolución fue registrada por atención al cliente.'),
vocab(21,6,'reembolso','reembolso','O reembolso será feito pelo mesmo meio de pagamento.','El reembolso se hará por el mismo medio de pago.'),
vocab(21,7,'reclamação','reclamación','Registrei uma reclamação sobre o serviço.','Presenté una reclamación sobre el servicio.'),
vocab(21,8,'assistência técnica','servicio técnico','A assistência técnica avaliou o aparelho.','El servicio técnico evaluó el aparato.'),
vocab(21,9,'nota fiscal','factura / comprobante fiscal','Guarde a nota fiscal para solicitar a garantia.','Guarda la factura para solicitar la garantía.'),
vocab(21,10,'cancelamento','cancelación','O cancelamento da compra foi confirmado por e-mail.','La cancelación de la compra fue confirmada por correo electrónico.')
];
const unit19=makeUnit(19,'Vivienda y alquiler','Busca una vivienda, comprende un contrato de alquiler y describe problemas habituales del inmueble.','Imobiliária es la agencia que intermedia; proprietário es quien posee el inmueble e inquilino quien lo alquila. Vistoria registra su estado.',['Aluguel y condomínio','Aluguel es el pago por usar la vivienda; condomínio puede nombrar el edificio o los gastos comunes.'],u19,[
['Lección 1: Buscar una vivienda','Comprende dónde buscar una vivienda y cómo describir el alquiler.','Imobiliária es una agencia inmobiliaria; aluguel es el precio periódico por ocupar un inmueble.',[0,1],['ptbr_a2_u9_v03','ptbr_a2_u15_v01']],
['Lección 2: Edificio y gastos comunes','Identifica gastos y espacios compartidos.','Condomínio puede referirse al conjunto residencial o a la cuota de mantenimiento.',[2,3],['ptbr_a2_u15_v08']],
['Lección 3: Personas y contrato','Distingue a las partes de un contrato de alquiler.','Inquilino es quien ocupa la vivienda mediante alquiler; fiador garantiza ciertas obligaciones del contrato.',[4,5],['ptbr_a2_u7_v04']],
['Lección 4: Inspección y reformas','Comprende el registro del estado y las obras del inmueble.','Vistoria documenta las condiciones del inmueble; reforma es una obra de mejora.',[6,7],['ptbr_a2_u15_v05']],
['Lección 5: Reparaciones y humedad','Describe problemas de instalaciones y filtraciones.','Encanamento son las tuberías e infiltração es la entrada no deseada de agua.',[8,9],['ptbr_a2_u6_v07']]
]);
const unit20=makeUnit(20,'Convivencia y resolución de conflictos','Expresa desacuerdos, establece límites y comprende formas de resolver conflictos cotidianos.','Desentendimento y discussão nombran situaciones de conflicto; acordo expresa una solución aceptada. Mediação facilita el diálogo entre las partes.',['Discussão y desentendimento','Discussão es el intercambio verbal, que puede ser tenso; desentendimento es una falta de acuerdo o comprensión.'],u20,[
['Lección 1: Convivencia cotidiana','Habla de relaciones y convivencia en espacios compartidos.','Convivência describe la vida en común; respeito es la consideración hacia otras personas.',[0,4],['ptbr_a2_u7_v05','ptbr_a2_u15_v03']],
['Lección 2: Desacuerdos y discusiones','Describe problemas y diferencias de opinión.','Desentendimento es un desacuerdo; discussão es una conversación o disputa sobre un tema.',[1,2],['ptbr_a2_u6_v04']],
['Lección 3: Llegar a un acuerdo','Expresa soluciones y compromisos compartidos.','Acordo es una solución aceptada por las partes; compromisso es una obligación asumida.',[3,9],['ptbr_a2_u7_v02']],
['Lección 4: Límites y confianza','Comunica límites y habla de confianza.','Limite marca hasta dónde llega algo; confiança se construye con coherencia y respeto.',[5,6],['ptbr_a2_u7_v03']],
['Lección 5: Mediación y reconciliación','Comprende cómo se facilita el diálogo y se recupera una relación.','Mediação ayuda a negociar; reconciliação restablece una relación después de un conflicto.',[7,8],['ptbr_a2_u8_v07']]
]);
const unit21=makeUnit(21,'Derechos del consumidor','Comprende vocabulario para reclamar, solicitar cambios y gestionar devoluciones de productos.','Garantia cubre ciertas obligaciones del proveedor; defeito es un problema del producto. Nota fiscal documenta la compra y puede ser necesaria para el trámite.',['Troca y devolução','Troca es sustituir un producto por otro; devolução es entregar el producto de vuelta. Reembolso es la devolución del dinero.'],u21,[
['Lección 1: Consumidores y garantías','Identifica al consumidor y las condiciones de garantía.','Consumidor es quien adquiere o utiliza un producto o servicio; garantia define la cobertura ofrecida.',[0,1],['ptbr_a2_u13_v08','ptbr_a2_u15_v05']],
['Lección 2: Defectos y cambios','Describe defectos y solicita un cambio.','Defeito es una falla; troca es la sustitución del producto.',[2,3],['ptbr_a2_u6_v06']],
['Lección 3: Devoluciones y reembolsos','Distingue devolver un producto de recuperar el dinero.','Devolução es retornar el producto; reembolso es recibir de vuelta el dinero.',[4,5],['ptbr_a2_u13_v04']],
['Lección 4: Reclamos y servicio técnico','Explica un problema y solicita asistencia.','Reclamação es una queja formal; assistência técnica evalúa o repara un producto.',[6,7],['ptbr_a2_u15_v03']],
['Lección 5: Facturas y cancelaciones','Comprende documentos de compra y cancelación.','Nota fiscal es el documento fiscal de la compra; cancelamento anula una operación o servicio.',[8,9],['ptbr_a2_u16_v04']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['19-21']={units:[unit19,unit20,unit21]};
})(typeof window!=='undefined'?window:globalThis);
