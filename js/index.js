import { cargarmodulo } from './cambio.js';
import './navegacion.js';
import './hamburguesa.js';
import { iniciarTema } from './tema.js';
import { iniciarHorario } from './renderizarhorario.js';
import { iniciarTest } from './test.js';
import { iniciarTutorial } from './tutorial.js';
import { abrirReserva } from './reservas.js';

const inicio = document.querySelector('.inicio');
const nosotros = document.querySelector('.nosotros');
const servicios = document.querySelector('.servicios');
const horarios = document.querySelector('.horarios');
const test = document.querySelector('.test');
const gratis = document.querySelector('.gratis > button:last-child');

inicio.addEventListener('click', () => {
    cargarmodulo('inicio');
});

nosotros.addEventListener('click', () => {
    cargarmodulo('nosotros');
});

servicios.addEventListener('click', () => {
    cargarmodulo('servicios');
});
document.getElementById('contenido').addEventListener('click', (e) => {
    if (e.target.classList.contains('secundario')) {
        servicios.click();
    }
    if (e.target.classList.contains('btn-reglamento')) {
        document.querySelector('.reglamento-modal').showModal();
    }
    if (
        e.target.classList.contains('reglamento-cerrar') ||
        e.target.classList.contains('reglamento-modal')
    ) {
        document.querySelector('.reglamento-modal').close();
    }
});

horarios.addEventListener('click', async () => {
    await cargarmodulo('horarios');
    iniciarHorario();
});

gratis.addEventListener('click', () => {
    abrirReserva('formulario', 0);
});

test.addEventListener('click', async () => {
    if (document.querySelector('.test-modal')) return;
    const respuesta = await fetch('./pages/test.html');
    if (!respuesta.ok) return;
    if (document.querySelector('.test-modal')) return;
    const contenedor = document.createElement('div');
    contenedor.innerHTML = await respuesta.text();
    if (document.querySelector('.test-modal')) return;
    const dialogo = contenedor.firstElementChild;
    document.body.append(dialogo);
    iniciarTest(
        dialogo,
        () => {
            dialogo.remove();
            if (test.classList.contains('seleccionado')) {
                test.classList.remove('seleccionado');
                if (seleccionAnterior?.isConnected)
                    seleccionAnterior.classList.add('seleccionado');
            }
        },
        (quiereReservar) => {
            if (quiereReservar) {
                abrirReserva('formulario', 0);
            } else {
                horarios.click();
            }
        },
    );
});
// El módulo de navegación marca el test antes de su apertura.
let seleccionAnterior = inicio;
document
    .querySelectorAll('.encabezado > nav button:not(.test)')
    .forEach((boton) => {
        boton.addEventListener('click', () => {
            seleccionAnterior = boton;
        });
    });
cargarmodulo('inicio');
iniciarTutorial();
iniciarTema();