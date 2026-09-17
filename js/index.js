import { cargarmodulo } from '../js/cambio.js';
import './navegacion.js';
import './hamburguesa.js';

const inicio = document.querySelector('.inicio');
const nosotros = document.querySelector('.nosotros');
const servicios = document.querySelector('.servicios');
const horarios = document.querySelector('.horarios');
const test = document.querySelector('.test');
const contenido = document.getElementById('contenido');

function clean() {
    contenido.textContent = '';
}

inicio.addEventListener('click', () => {
    clean();
    cargarmodulo('inicio');
});

nosotros.addEventListener('click', () => {
    clean();
    cargarmodulo('nosotros');
});

servicios.addEventListener('click', () => {
    clean();
    cargarmodulo('servicios');
});

horarios.addEventListener('click', () => {
    clean();
    cargarmodulo('horarios');
});

test.addEventListener('click', () => {
    clean();
    cargarmodulo('test');
});

cargarmodulo('inicio');
