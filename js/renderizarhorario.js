import { horariosGym } from './horario.js';

let datosdiciplina = 'FULL';
let datosturno = '1';

function renderizarHorarios() {
    const filtrado1 = document.querySelector('.filtrado1');
    const filtrado2 = document.querySelector('.filtrado2');
    const filtrado3 = document.querySelector('.filtrado3');

    filtrado1.innerHTML = '';
    filtrado2.innerHTML = '';
    filtrado3.innerHTML = '';

    const horariosFiltrados = horariosGym.filter((elemento) => {
        const coincideDisciplina =
            datosdiciplina === 'FULL' ||
            elemento.disciplina.includes(datosdiciplina);

        let coincideTurno = true;

        if (datosturno === '2') {
            if (elemento.turnoFiltro === 'MAÑANA') {
                coincideTurno = true;
            } else {
                coincideTurno = false;
            }
        }

        if (datosturno === '3') {
            if (elemento.turnoFiltro === 'TARDE / NOCHE') {
                coincideTurno = true;
            } else {
                coincideTurno = false;
            }
        }

        return coincideDisciplina && coincideTurno;
    });

    let cont1 = 0,
        cont2 = 0,
        cont3 = 0;

    horariosFiltrados.forEach((e) => {
        let claseBoton;

        if (e.requiereReserva) {
            claseBoton = 'btn-reservar';
        } else {
            claseBoton = 'btn-reservar btn-libre';
        }

        const tarjetaHTML = `
            <div class="carta-horario">
                <div class="carta-top">
                    <span class="tag-disciplina">${e.disciplina}</span>
                    <span class="tag-modalidad">${e.modalidad}</span>
                </div>
                
                <div class="carta-tiempo">
                    <h2>${e.horaInicio} - ${e.horaFin}</h2>
                    <p>TURNO ${e.turnoFiltro} · ${e.lugar}</p>
                </div>

                <div class="carta-instructor">
                    <div class="instructor-iniciales">${e.iniciales}</div>
                    <div class="instructor-info">
                        <h4>${e.instructor}</h4>
                        <p>${e.cargo}</p>
                    </div>
                </div>

                <button class="${claseBoton}">${e.accionText}</button>
            </div>
        `;

        if (e.seccion === 'LUNES, MIÉRCOLES Y VIERNES') {
            filtrado1.innerHTML += tarjetaHTML;
            cont1++;
        } else if (e.seccion === 'MARTES Y JUEVES') {
            filtrado2.innerHTML += tarjetaHTML;
            cont2++;
        } else if (e.seccion === 'SÁBADOS · MASTERCLASSES & SPARRING') {
            filtrado3.innerHTML += tarjetaHTML;
            cont3++;
        }
    });

    document.getElementById('contador-1').textContent =
        `${cont1} SESIONES DISPONIBLES`;
    document.getElementById('contador-2').textContent =
        `${cont2} SESIONES DISPONIBLES`;
    document.getElementById('contador-3').textContent =
        `${cont3} SESIONES DISPONIBLES`;
}

function actualizarBotonesActivos() {
    document.querySelectorAll('.filtro_disciplina').forEach((btn) => {
        btn.classList.remove('activo');
        if (
            btn.dataset.info === datosdiciplina ||
            (datosdiciplina === 'FULL' && btn.dataset.info === 'FULL')
        ) {
            btn.classList.add('activo');
        }
    });

    document.querySelectorAll('.filtro_horario').forEach((btn) => {
        btn.classList.remove('activo');
        if (btn.dataset.id === datosturno) {
            btn.classList.add('activo');
        }
    });
}

export function iniciarHorario() {
    const botonesfiltrado1 = document.querySelectorAll('.filtro_disciplina');
    const botonesfiltrado2 = document.querySelectorAll('.filtro_horario');

    renderizarHorarios();
    actualizarBotonesActivos();

    botonesfiltrado1.forEach((boton) => {
        boton.addEventListener('click', () => {
            datosdiciplina = boton.dataset.info;
            renderizarHorarios();
            actualizarBotonesActivos();
        });
    });

    botonesfiltrado2.forEach((boton) => {
        boton.addEventListener('click', () => {
            datosturno = boton.dataset.id;
            renderizarHorarios();
            actualizarBotonesActivos();
        });
    });
}
