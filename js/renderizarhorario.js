import { horariosGym } from './horario.js';
import { enlazarBotonesReservar } from './reservas.js';

let disciplinaSeleccionada = 'FULL';
let turnoSeleccionado = '1';

// Cada grupo relaciona los datos del horario con su contenedor y contador.
const grupos = [
    { nombre: 'LUNES, MIÉRCOLES Y VIERNES', contenedor: '.filtrado1', contador: 'contador-1' },
    { nombre: 'MARTES Y JUEVES', contenedor: '.filtrado2', contador: 'contador-2' },
    { nombre: 'SÁBADOS · MASTERCLASSES & SPARRING', contenedor: '.filtrado3', contador: 'contador-3' },
];

// Recorremos todos los objetos y guardamos solo los que cumplen ambos filtros.
export const filtrarHorarios = (horarios, disciplina, turno) => {
    const filtrados = [];
    for (const horario of horarios) {
        const coincideDisciplina = disciplina === 'FULL' || horario.disciplina.includes(disciplina);
        let coincideTurno = true;
        if (turno === '2') coincideTurno = horario.turnoFiltro === 'MAÑANA';
        if (turno === '3') coincideTurno = horario.turnoFiltro === 'TARDE / NOCHE';
        if (coincideDisciplina && coincideTurno) filtrados.push(horario);
    }
    return filtrados;
};

const crearTarjeta = (horario) => {
    const claseBoton = horario.requiereReserva ? 'btn-reservar' : 'btn-reservar btn-libre';
    return `
        <div class="carta-horario">
            <div class="carta-top">
                <span class="tag-disciplina">${horario.disciplina}</span>
                <span class="tag-modalidad">${horario.modalidad}</span>
            </div>
            <div class="carta-tiempo">
                <h2>${horario.horaInicio} - ${horario.horaFin}</h2>
                <p>TURNO ${horario.turnoFiltro} · ${horario.lugar}</p>
            </div>
            <div class="carta-instructor">
                <div class="instructor-iniciales">${horario.iniciales}</div>
                <div class="instructor-info"><h4>${horario.instructor}</h4><p>${horario.cargo}</p></div>
            </div>
            <button class="${claseBoton}" data-id="${horario.id}">${horario.accionText}</button>
        </div>`;
};

const renderizarHorarios = () => {
    const horariosFiltrados = filtrarHorarios(horariosGym, disciplinaSeleccionada, turnoSeleccionado);

    // Por cada grupo, recorremos los horarios filtrados y contamos sus clases.
    for (const grupo of grupos) {
        const contenedor = document.querySelector(grupo.contenedor);
        let tarjetas = '';
        let cantidad = 0;
        for (const horario of horariosFiltrados) {
            if (horario.seccion === grupo.nombre) {
                tarjetas += crearTarjeta(horario);
                cantidad++;
            }
        }
        contenedor.style.fontFamily = 'Arial, Helvetica, sans-serif';
        contenedor.innerHTML = tarjetas;
        document.getElementById(grupo.contador).textContent = `${cantidad} SESIONES DISPONIBLES`;
    }
    enlazarBotonesReservar();
};

const actualizarBotonesActivos = () => {
    const botonesDisciplina = document.querySelectorAll('.filtro_disciplina');
    const botonesTurno = document.querySelectorAll('.filtro_horario');
    for (const boton of botonesDisciplina) {
        boton.classList.toggle('activo', boton.dataset.info === disciplinaSeleccionada);
    }
    for (const boton of botonesTurno) {
        boton.classList.toggle('activo', boton.dataset.id === turnoSeleccionado);
    }
};

export const iniciarHorario = () => {
    const botonesDisciplina = document.querySelectorAll('.filtro_disciplina');
    const botonesTurno = document.querySelectorAll('.filtro_horario');
    renderizarHorarios();
    actualizarBotonesActivos();

    for (const boton of botonesDisciplina) {
        boton.addEventListener('click', () => {
            disciplinaSeleccionada = boton.dataset.info;
            renderizarHorarios();
            actualizarBotonesActivos();
        });
    }
    for (const boton of botonesTurno) {
        boton.addEventListener('click', () => {
            turnoSeleccionado = boton.dataset.id;
            renderizarHorarios();
            actualizarBotonesActivos();
        });
    }
};
