const pasos = [
    {
        titulo: 'Bienvenido a Bushido Academy',
        texto: 'Te mostraremos en un minuto cómo usar la página.',
        selector: null, // sin elemento: tarjeta centrada
    },
    {
        titulo: 'Menú de navegación',
        texto: 'Aquí cambias entre Inicio, Nosotros, Servicios y Horarios.',
        selector: '.encabezado > nav',
    },
    {
        titulo: 'Encuentra tu disciplina',
        texto: 'Responde unas preguntas y te recomendamos la disciplina ideal.',
        selector: '.encabezado > nav .test',
    },
    {
        titulo: 'Clase gratuita',
        texto: 'Desde aquí puedes pedir tu primera clase sin costo.',
        selector: '.gratis button:last-child',
    },
    {
        titulo: 'Ayuda',
        texto: 'Si quieres ver este tutorial otra vez, pulsa este botón.',
        selector: '.ayuda',
    },
];

const CLAVE = 'tutorialVisto';
let indice = 0;
let foco, tarjeta, capa;

const cerrar = () => {
    capa?.remove();
    foco?.remove();
    tarjeta?.remove();
    capa = foco = tarjeta = null;
    document.removeEventListener('keydown', alTeclear);
    window.removeEventListener('resize', mostrarPaso);
    try {
        localStorage.setItem(CLAVE, '1');
    } catch {}
};

const alTeclear = (e) => {
    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowRight') siguiente();
    if (e.key === 'ArrowLeft') anterior();
};

const siguiente = () => {
    if (indice === pasos.length - 1) return cerrar();
    indice++;
    mostrarPaso();
};

const anterior = () => {
    if (indice === 0) return;
    indice--;
    mostrarPaso();
};

function mostrarPaso() {
    if (!tarjeta) return;
    const paso = pasos[indice];
    const ultimo = indice === pasos.length - 1;

    tarjeta.innerHTML = `
        <h2>${paso.titulo}</h2>
        <p>${paso.texto}</p>
        <div class="tutorial-pie">
            <span class="tutorial-contador">${indice + 1} de ${pasos.length}</span>
            <div class="tutorial-botones">
                <button type="button" class="tutorial-saltar">Saltar</button>
                <button type="button" class="tutorial-anterior" ${indice === 0 ? 'disabled' : ''}>Anterior</button>
                <button type="button" class="tutorial-siguiente">${ultimo ? 'Finalizar' : 'Siguiente'}</button>
            </div>
        </div>`;

    tarjeta.querySelector('.tutorial-saltar').onclick = cerrar;
    tarjeta.querySelector('.tutorial-anterior').onclick = anterior;
    tarjeta.querySelector('.tutorial-siguiente').onclick = siguiente;

    // Buscar el elemento; si no existe o está oculto (menú móvil), tarjeta centrada
    const elemento = paso.selector && document.querySelector(paso.selector);
    const r = elemento?.getBoundingClientRect();
    const visible = r && r.width > 0 && r.height > 0;

    if (visible) {
        const margen = 6;
        Object.assign(foco.style, {
            top: `${r.top - margen}px`,
            left: `${r.left - margen}px`,
            width: `${r.width + margen * 2}px`,
            height: `${r.height + margen * 2}px`,
        });
        const ancho = tarjeta.offsetWidth;
        const izq = Math.min(Math.max(12, r.left), window.innerWidth - ancho - 12);
        tarjeta.style.left = `${izq}px`;
        tarjeta.style.top = `${r.bottom + 16}px`;
        tarjeta.style.transform = 'none';
    } else {
        // foco de tamaño 0 en el centro: solo oscurece la pantalla
        Object.assign(foco.style, {
            top: '50%',
            left: '50%',
            width: '0',
            height: '0',
        });
        tarjeta.style.left = '50%';
        tarjeta.style.top = '50%';
        tarjeta.style.transform = 'translate(-50%, -50%)';
    }
    tarjeta.querySelector('.tutorial-siguiente').focus();
}

export function abrirTutorial() {
    if (tarjeta) return; // ya está abierto
    indice = 0;

    capa = document.createElement('div');
    capa.className = 'tutorial-capa'; // bloquea clics en la página

    foco = document.createElement('div');
    foco.className = 'tutorial-foco';

    tarjeta = document.createElement('div');
    tarjeta.className = 'tutorial-tarjeta';
    tarjeta.setAttribute('role', 'dialog');
    tarjeta.setAttribute('aria-live', 'polite');

    document.body.append(capa, foco, tarjeta);
    document.addEventListener('keydown', alTeclear);
    window.addEventListener('resize', mostrarPaso);
    mostrarPaso();
}

export function iniciarTutorial() {
    document.querySelector('.ayuda').addEventListener('click', abrirTutorial);

    let visto = false;
    try {
        visto = localStorage.getItem(CLAVE) === '1';
    } catch {}
    if (!visto) abrirTutorial();
}