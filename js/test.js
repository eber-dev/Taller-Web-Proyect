import { preguntas, disciplinas } from './preguntas-test.js';

// Las dos primeras respuestas aportan puntos a cada disciplina.
// Si dos disciplinas empatan, gana la primera del array.
export const recomendar = (respuestas) => {
    const motivacion = preguntas[0].opciones[respuestas[0]];
    const combate = preguntas[1].opciones[respuestas[1]];
    let indiceGanador = 0;
    let mayorPuntaje = -1;

    for (let i = 0; i < disciplinas.length; i++) {
        const puntaje = motivacion.puntos[i] + combate.puntos[i];
        if (puntaje > mayorPuntaje) {
            mayorPuntaje = puntaje;
            indiceGanador = i;
        }
    }
    return { indice: indiceGanador, puntos: mayorPuntaje };
};

// Construye las tarjetas recorriendo el array de opciones de la pregunta actual.
const crearTarjetas = (pregunta, paso, respuestas) => {
    let tarjetas = '';
    for (let i = 0; i < pregunta.opciones.length; i++) {
        const opcion = pregunta.opciones[i];
        const elegida = respuestas[paso] === i;
        let encabezado = `<strong>${opcion.nombre}</strong>`;
        if (paso < 2) {
            encabezado = `<span class="test-option-label">${opcion.nombre}</span><strong>${opcion.titulo}</strong>`;
        } else if (opcion.titulo) {
            encabezado += `<span class="test-option-subtitle">${opcion.titulo}</span>`;
        }
        let detalle = '';
        if (opcion.detalle) detalle = `<span class="test-detail">${opcion.detalle} →</span>`;
        tarjetas += `<button type="button" class="test-option ${elegida ? 'is-selected' : ''}" data-opcion="${i}" aria-pressed="${elegida}">${encabezado}<span class="test-description">${opcion.descripcion}</span>${detalle}</button>`;
    }
    return tarjetas;
};

export const iniciarTest = (dialogo, alCerrar, irHorarios) => {
    const contenido = dialogo.querySelector('#test-contenido');
    const indicador = dialogo.querySelector('.test-current');
    const volver = dialogo.querySelector('.test-back');
    const anterior = document.activeElement;
    let paso = 0;
    let respuestas = Array(preguntas.length).fill(null);
    let temporizador;
    const cerrar = () => dialogo.close();
    const mostrar = () => {
        const resultado = paso === preguntas.length;
        indicador.innerHTML = resultado
            ? 'RESULTADO GENERADO'
            : `PASO ACTUAL <strong>${String(paso + 1).padStart(2, '0')} / 05</strong>`;
        volver.textContent = paso === 0 ? '← VOLVER' : '← ANTERIOR';
        if (resultado) {
            const disciplina = disciplinas[recomendar(respuestas).indice];
            contenido.innerHTML = `<section class="test-result" aria-labelledby="test-titulo"><p class="test-kicker">TU DISCIPLINA MARCIAL FORJADA</p><h1 id="test-titulo" tabindex="-1">${disciplina.nombre}</h1><article class="test-result-card"><img class="test-result-img" src="./assets/img/${disciplina.imagen}" alt="Entrenamiento de ${disciplina.nombre}"><div class="test-result-body"><div><h2>¿POR QUÉ ES TU DISCIPLINA RECOMENDADA?</h2><p>${disciplina.descripcion}</p><p>Tu motivación «${preguntas[0].opciones[respuestas[0]].nombre}» y tu preferencia «${preguntas[1].opciones[respuestas[1]].nombre}» sumaron la mayor puntuación para esta disciplina.</p></div><aside class="test-profile"><h2>TU PERFIL</h2><p><b>Experiencia:</b> ${preguntas[2].opciones[respuestas[2]].nombre}</p><p><b>Intensidad:</b> ${preguntas[3].opciones[respuestas[3]].nombre}</p><p><b>Disponibilidad:</b> ${preguntas[4].opciones[respuestas[4]].nombre}</p><p>Comenta estas preferencias con tu instructor para ajustar tu entrenamiento.</p></aside></div><div class="test-actions"><button type="button" class="test-primary" data-accion="reservar">RESERVAR CLASE GRATUITA →</button><button type="button" data-accion="horarios">VER HORARIOS DISPONIBLES</button><button type="button" data-accion="repetir">REPETIR TEST</button></div><p class="test-nota">Consulta los horarios para elegir una clase. El sitio aún no dispone de un sistema de reserva en línea.</p></article></section>`;
        } else {
            const pregunta = preguntas[paso];
            contenido.innerHTML = `<div class="test-progress-head"><span>● TEST DE AFINIDAD MARCIAL</span><span>PASO ${paso + 1} DE 5</span></div><div class="test-progress" role="progressbar" aria-label="Progreso del test" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${paso + 1}"><span style="width:${(paso + 1) * 20}%"></span></div><section class="test-step"><p class="test-label">PASO ${String(paso + 1).padStart(2, '0')} / ${pregunta.categoria}</p><h1 id="test-titulo" tabindex="-1">${pregunta.titulo} <span>${pregunta.acento}</span></h1><p class="test-intro">${pregunta.intro}</p><div class="test-options ${paso < 2 ? 'test-grid-two' : paso === 2 ? 'test-list' : 'test-grid-three'}" role="group" aria-label="Opciones de respuesta">${crearTarjetas(pregunta, paso, respuestas)}</div></section>`;
        }
        contenido.scrollTop = 0;
        contenido.querySelector('#test-titulo').focus();
    };
    volver.addEventListener('click', () => {
        clearTimeout(temporizador);
        if (paso === 0) cerrar();
        else {
            paso--;
            mostrar();
        }
    });
    dialogo.querySelector('.test-close').addEventListener('click', () => {
        clearTimeout(temporizador);
        cerrar();
    });
    dialogo.addEventListener('cancel', () => {
        clearTimeout(temporizador);
    });
    dialogo.addEventListener(
        'close',
        () => {
            clearTimeout(temporizador);
            alCerrar();
            if (anterior?.isConnected) anterior.focus();
        },
        { once: true },
    );
    contenido.addEventListener('click', (evento) => {
        const opcion = evento.target.closest('[data-opcion]');
        if (opcion) {
            clearTimeout(temporizador);
            respuestas[paso] = Number(opcion.dataset.opcion);
            const tarjetas = contenido.querySelectorAll('[data-opcion]');
            for (const tarjeta of tarjetas) {
                const elegida = tarjeta === opcion;
                tarjeta.classList.toggle('is-selected', elegida);
                tarjeta.setAttribute('aria-pressed', String(elegida));
            }
            temporizador = setTimeout(() => {
                paso++;
                mostrar();
            }, 220);
            return;
        }
        const accion = evento.target.closest('[data-accion]')?.dataset.accion;
        if (accion === 'repetir') {
            respuestas = Array(preguntas.length).fill(null);
            paso = 0;
            mostrar();
        }
        if (accion === 'horarios' || accion === 'reservar') {
            cerrar();
            irHorarios(accion === 'reservar');
        }
    });
    dialogo.showModal();
    mostrar();
};
