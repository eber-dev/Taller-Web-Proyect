import { cargarmodulo } from './cambio.js';
import './navegacion.js';
import './hamburguesa.js';
import { iniciarHorario } from './renderizarhorario.js';
import { iniciarTest } from './test.js';

const inicio = document.querySelector('.inicio');
const nosotros = document.querySelector('.nosotros');
const servicios = document.querySelector('.servicios');
const horarios = document.querySelector('.horarios');
const test = document.querySelector('.test');

inicio.addEventListener('click', () => {
    cargarmodulo('inicio');
});

nosotros.addEventListener('click', () => {
    cargarmodulo('nosotros');
});

servicios.addEventListener('click', () => {
    cargarmodulo('servicios');
});

horarios.addEventListener('click', async () => {
    await cargarmodulo('horarios');
    iniciarHorario();
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
        () => {
            horarios.click();
            // El proyecto aún no cuenta con una reserva en línea; se muestran los horarios.
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
