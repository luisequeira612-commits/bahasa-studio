(function(root){
'use strict';
const vocab=(unit,index,target,esp,ex,exEsp)=>({id:'ptbr_a2_u'+unit+'_v'+String(index).padStart(2,'0'),target,esp,ex,exEsp,verification:{status:'not_checked',sources:[]}});
const exercise=(words,index)=>{const word=words[index],choices=[word.esp,words[(index+3)%10].esp,words[(index+6)%10].esp],answer=index%3;return {vocabId:word.id,type:'mc',prompt:'¿Qué significa «'+word.target+'»?',options:choices.slice(3-answer).concat(choices.slice(0,3-answer)),answer,explanation:'Relaciona la expresión con su significado en español.'};};
const makeUnit=(number,title,desc,grammar,trap,words,lessons)=>({unitNumber:number,id:'ptbr_a2_u'+number,title:'Unidad '+number+': '+title,desc,grammar,trap,vocab:words,lessons:lessons.map(s=>({title:s[0],objective:s[1],grammar:s[2],vocabIds:s[3].map(i=>words[i].id),reviewVocabIds:s[4],exercises:[exercise(words,s[3][0]),exercise(words,s[3][1])]})),exercises:words.map((_,i)=>exercise(words,i))});
const u16=[
vocab(16,1,'senha','contraseña','Criei uma senha diferente para cada serviço.','Creé una contraseña distinta para cada servicio.'),
vocab(16,2,'privacidade','privacidad','A privacidade dos usuários deve ser respeitada.','Debe respetarse la privacidad de los usuarios.'),
vocab(16,3,'vazamento de dados','filtración de datos','A empresa informou sobre um vazamento de dados.','La empresa informó sobre una filtración de datos.'),
vocab(16,4,'golpe','estafa / fraude','Desconfie de mensagens que prometem dinheiro fácil.','Desconfía de los mensajes que prometen dinero fácil.'),
vocab(16,5,'anexo','archivo adjunto','Não abra um anexo inesperado.','No abras un archivo adjunto inesperado.'),
vocab(16,6,'configuração','configuración','Revise a configuração de segurança da conta.','Revisa la configuración de seguridad de la cuenta.'),
vocab(16,7,'atualização','actualización','A atualização corrigiu um problema no aplicativo.','La actualización corrigió un problema en la aplicación.'),
vocab(16,8,'bloquear','bloquear','Você pode bloquear um contato desconhecido.','Puedes bloquear un contacto desconocido.'),
vocab(16,9,'compartilhamento','uso compartido','O compartilhamento da localização é opcional.','Compartir la ubicación es opcional.'),
vocab(16,10,'autenticação','autenticación','A autenticação em duas etapas protege a conta.','La autenticación en dos pasos protege la cuenta.')
];
const u17=[
vocab(17,1,'matrícula','matrícula / inscripción','A matrícula do curso termina na sexta-feira.','La inscripción al curso termina el viernes.'),
vocab(17,2,'bolsa de estudos','beca de estudios','Ela conseguiu uma bolsa de estudos na universidade.','Ella consiguió una beca de estudios en la universidad.'),
vocab(17,3,'mensalidade','cuota mensual','A mensalidade deve ser paga até o dia dez.','La cuota mensual debe pagarse hasta el día diez.'),
vocab(17,4,'certificado','certificado','Recebi o certificado depois de concluir o curso.','Recibí el certificado después de terminar el curso.'),
vocab(17,5,'frequência','asistencia','A frequência mínima é necessária para aprovação.','La asistencia mínima es necesaria para aprobar.'),
vocab(17,6,'avaliação','evaluación','A avaliação inclui uma atividade escrita.','La evaluación incluye una actividad escrita.'),
vocab(17,7,'pesquisa','investigación','Os alunos fizeram uma pesquisa sobre o tema.','Los alumnos hicieron una investigación sobre el tema.'),
vocab(17,8,'ementa','programa / temario del curso','A ementa apresenta os assuntos estudados durante o semestre.','El temario presenta los temas estudiados durante el semestre.'),
vocab(17,9,'orientador','tutor / asesor académico','Conversei com meu orientador sobre o projeto.','Hablé con mi tutor sobre el proyecto.'),
vocab(17,10,'aprendizagem','aprendizaje','A prática diária ajuda na aprendizagem.','La práctica diaria ayuda en el aprendizaje.')
];
const u18=[
vocab(18,1,'triagem','triaje','A triagem ajuda a organizar o atendimento inicial.','El triaje ayuda a organizar la atención inicial.'),
vocab(18,2,'receita','receta médica','A médica escreveu uma receita para o tratamento.','La médica escribió una receta para el tratamiento.'),
vocab(18,3,'sintoma','síntoma','A febre é um sintoma que precisa ser observado.','La fiebre es un síntoma que debe observarse.'),
vocab(18,4,'exame','examen médico','O exame será realizado no laboratório.','El examen se realizará en el laboratorio.'),
vocab(18,5,'tratamento','tratamiento','O tratamento deve seguir a orientação profissional.','El tratamiento debe seguir la orientación profesional.'),
vocab(18,6,'alergia','alergia','Avise a equipe sobre qualquer alergia.','Informa al equipo sobre cualquier alergia.'),
vocab(18,7,'pronto-socorro','urgencias','Ela foi ao pronto-socorro depois do acidente.','Ella fue a urgencias después del accidente.'),
vocab(18,8,'convênio','seguro médico / convenio','O convênio cobre parte dos exames.','El seguro médico cubre parte de los exámenes.'),
vocab(18,9,'recuperação','recuperación','O repouso contribui para a recuperação.','El descanso contribuye a la recuperación.'),
vocab(18,10,'prevenção','prevención','A prevenção inclui hábitos saudáveis.','La prevención incluye hábitos saludables.')
];
const unit16=makeUnit(16,'Tecnología, privacidad y seguridad digital','Protege cuentas, reconoce riesgos y comprende opciones de seguridad en servicios digitales.','Senha y autenticação protegen el acceso; privacidade y compartilhamento se relacionan con el control de datos. Golpe y vazamento de dados describen riesgos.',['Enlace y anexo','No abras anexos inesperados ni compartas contraseñas; confirma el origen de los mensajes.'],u16,[
['Lección 1: Contraseñas y acceso','Habla de credenciales y protección de cuentas.','Senha es la clave de acceso; autenticação confirma la identidad.',['0','9'].map(Number),['ptbr_a2_u13_v09','ptbr_a2_u15_v08']],
['Lección 2: Privacidad y datos','Explica cómo se protege la información personal.','Privacidade se refiere al control de datos; vazamento de dados es su divulgación no autorizada.',[1,2],['ptbr_a2_u15_v08']],
['Lección 3: Fraudes y archivos','Reconoce mensajes y archivos sospechosos.','Golpe es una estafa; anexo es un archivo enviado junto con un mensaje.',[3,4],['ptbr_a2_u10_v05']],
['Lección 4: Ajustes y actualizaciones','Comprende opciones para mantener una cuenta segura.','Configuração ajusta el funcionamiento; atualização instala cambios o correcciones.',[5,6],['ptbr_a2_u6_v06']],
['Lección 5: Bloqueo y uso compartido','Controla contactos y datos que comparte.','Bloquear impide una interacción; compartilhamento es la acción de compartir.',[7,8],['ptbr_a2_u15_v08']]
]);
const unit17=makeUnit(17,'Educación y formación continua','Comprende procesos de inscripción, evaluación y certificación en cursos.','Matrícula inicia la inscripción; mensalidade indica un pago periódico. Frequência, avaliação y prazo aparecen en las reglas académicas.',['Mensalidade y matrícula','Matrícula es el proceso de inscripción; mensalidade es el pago mensual del curso.'],u17,[
['Lección 1: Inscripción y becas','Habla de acceso a cursos y ayudas económicas.','Matrícula es la inscripción; bolsa de estudos es una ayuda para estudiar.',[0,1],['ptbr_a2_u14_v03']],
['Lección 2: Pagos y certificados','Comprende pagos y documentos de finalización.','Mensalidade es una cuota mensual; certificado acredita una formación.',[2,3],['ptbr_a2_u14_v07']],
['Lección 3: Asistencia y evaluación','Describe requisitos y formas de evaluación.','Frequência registra la asistencia; avaliação mide el aprendizaje.',[4,5],['ptbr_a2_u14_v04']],
['Lección 4: Investigación y plazos','Habla de trabajos y fechas de entrega.','Pesquisa es una investigación; prazo es el tiempo límite.',[6,7],['ptbr_a2_u14_v02']],
['Lección 5: Orientación y aprendizaje','Describe el acompañamiento académico.','Orientador acompaña un proyecto o estudio; aprendizagem es el proceso de aprender.',[8,9],['ptbr_a2_u14_v05']]
]);
const unit18=makeUnit(18,'Salud y atención sanitaria','Comprende vocabulario frecuente para consultas, pruebas y tratamientos médicos.','Triagem organiza la evaluación inicial; exame es una prueba. Sintoma describe una señal, mientras tratamento y prevenção se refieren a cuidados.',['Receita y tratamento','Receita es la indicación médica escrita; tratamento es el conjunto de cuidados o medidas.'],u18,[
['Lección 1: Triaje y recetas','Comprende la evaluación inicial y las indicaciones médicas.','Triagem organiza la atención inicial; receita contiene indicaciones de un profesional.',[0,1],['ptbr_a2_u15_v07']],
['Lección 2: Síntomas y exámenes','Describe señales y pruebas de salud.','Sintoma es una manifestación; exame es una prueba para investigar el estado de salud.',[2,3],['ptbr_a2_u15_v01']],
['Lección 3: Tratamientos y alergias','Comunica información importante sobre cuidados.','Tratamento reúne medidas de cuidado; alergia es una reacción a una sustancia.',[4,5],['ptbr_a2_u15_v09']],
['Lección 4: Atención de urgencia y cobertura','Comprende servicios y cobertura médica.','Pronto-socorro es un servicio de urgencias; convênio puede referirse al seguro médico.',[6,7],['ptbr_a2_u13_v09']],
['Lección 5: Recuperación y prevención','Habla de cuidados y hábitos preventivos.','Recuperação es volver gradualmente al estado habitual; prevenção busca reducir riesgos.',[8,9],['ptbr_a2_u12_v08']]
]);
root.GUARDI_CURRICULUM_BLOCKS=root.GUARDI_CURRICULUM_BLOCKS||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR']=root.GUARDI_CURRICULUM_BLOCKS['pt-BR']||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2=root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2||{};
root.GUARDI_CURRICULUM_BLOCKS['pt-BR'].A2['16-18']={units:[unit16,unit17,unit18]};
})(typeof window!=='undefined'?window:globalThis);
