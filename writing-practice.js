(function (root) {
    'use strict';
    const tasks = Object.freeze([
        {
            id: 'profile',
            title: 'Un pequeño perfil de una amistad',
            situation: 'Escribe un perfil breve de una persona que conoces. Incluye su nombre, dos características físicas o de personalidad y una afición. Intenta escribir tres o cuatro frases.',
            checklist: ['Mencioné quién es la persona y cómo se llama.', 'Incluí al menos dos características.', 'Añadí una afición o actividad que le gusta.', 'Separé las ideas en frases claras.'],
            example: 'Teman saya bernama Rina. Dia tinggi dan ramah. Rambutnya panjang. Dia suka membaca buku.'
        },
        {
            id: 'travel',
            title: 'Mi diario de viaje',
            situation: 'Imagina que acabas de llegar a una ciudad. Escribe una nota breve sobre dónde estás, cuándo llegaste, qué llevas y adónde irás después. Intenta escribir tres o cuatro frases.',
            checklist: ['Dije dónde estoy.', 'Mencioné cuándo llegué o cuándo saldré.', 'Incluí un objeto de viaje o equipaje.', 'Expliqué cuál será mi siguiente destino.'],
            example: 'Hari ini saya di hotel. Saya tiba pukul tiga. Koper saya ada di kamar. Besok saya pergi ke pantai naik bus.'
        },
        {
            id: 'directions',
            title: 'Una nota para indicar el camino',
            situation: 'Un amigo quiere visitar una tienda cerca de tu casa. Escríbele indicaciones sencillas: por dónde caminar, dónde girar y qué lugar verá. Intenta escribir tres o cuatro frases.',
            checklist: ['Indiqué desde dónde debe empezar.', 'Usé una instrucción para seguir o girar.', 'Mencioné izquierda o derecha.', 'Expliqué qué lugar encontrará.'],
            example: 'Dari rumah saya, berjalan lurus. Belok kiri di jalan besar. Toko ada di sebelah kanan. Toko itu dekat sekolah.'
        }
    ]);
    function make(tag, text, className) {
        const node = document.createElement(tag);
        if (text !== undefined) node.textContent = text;
        if (className) node.className = className;
        return node;
    }
    const WritingPractice = {
        tasks,
        open() {
            this.renderList();
            if (root.App && typeof root.App.switchView === 'function') root.App.switchView('writing-practice');
        },
        close() {
            if (root.App && typeof root.App.switchView === 'function') root.App.switchView('route');
        },
        renderList() {
            const host = document.getElementById('writingPracticeContent');
            if (!host) return;
            host.replaceChildren();
            host.appendChild(make('p', 'Prácticas independientes: no se califican y no modifican tu progreso.', 'text-muted'));
            tasks.forEach(task => {
                const card = make('section', undefined, 'card');
                const heading = make('h3', task.title);
                const description = make('p', task.situation);
                description.style.color = 'var(--text-muted)';
                const button = make('button', 'Empezar a escribir');
                button.type = 'button';
                button.className = 'btn';
                button.addEventListener('click', () => this.renderTask(task.id));
                card.append(heading, description, button);
                host.appendChild(card);
            });
        },
        renderTask(taskId) {
            const task = tasks.find(item => item.id === taskId);
            const host = document.getElementById('writingPracticeContent');
            if (!task || !host) return;
            host.replaceChildren();
            const back = make('button', 'Ver otras situaciones');
            back.type = 'button';
            back.className = 'btn btn-outline btn-sm';
            back.addEventListener('click', () => this.renderList());
            const heading = make('h3', task.title);
            const situation = make('p', task.situation);
            const label = make('label', 'Tu borrador en indonesio');
            label.htmlFor = 'freeWritingDraft';
            const textarea = make('textarea');
            textarea.id = 'freeWritingDraft';
            textarea.className = 'input-field';
            textarea.rows = 6;
            textarea.maxLength = 2000;
            textarea.placeholder = 'Escribe aquí tus propias frases…';
            const checklistHeading = make('h4', 'Antes de terminar, revisa tu texto');
            const checklist = make('ul');
            task.checklist.forEach(item => checklist.appendChild(make('li', item)));
            const note = make('p', 'No corregimos ni puntuamos automáticamente el texto. Las listas sirven para revisar si respondiste a la situación; puede haber otras respuestas válidas.', 'text-muted');
            const reveal = make('button', 'Mostrar ejemplo orientativo');
            reveal.type = 'button';
            reveal.className = 'btn btn-outline';
            const status = make('p', '');
            status.setAttribute('role', 'status');
            status.setAttribute('aria-live', 'polite');
            const example = make('section');
            example.hidden = true;
            example.className = 'card';
            example.append(make('h4', 'Un ejemplo posible'), make('p', task.example),
                make('p', 'Es solo una referencia, no una respuesta única ni una corrección de tu borrador. El contenido es orientativo y no ha sido validado por un hablante nativo.', 'text-muted'));
            reveal.addEventListener('click', () => {
                if (!textarea.value.trim()) {
                    status.textContent = 'Escribe primero un borrador; después podrás compararlo con el ejemplo.';
                    textarea.focus();
                    return;
                }
                example.hidden = false;
                status.textContent = 'Ejemplo visible. Compara las ideas y la claridad; no se ha asignado ninguna nota.';
            });
            const disclaimer = make('p', 'Sin nota, sin XP y sin registro SRS. El borrador permanece solo mientras esta pantalla siga abierta; no se incluye en las copias de seguridad.', 'text-muted');
            host.append(back, heading, situation, label, textarea, checklistHeading, checklist, note, reveal, status, example, disclaimer);
        }
    };
    root.WritingPractice = WritingPractice;
})(typeof window !== 'undefined' ? window : globalThis);
