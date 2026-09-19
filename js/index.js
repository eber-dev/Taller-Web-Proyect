import { cargarmodulo } from '../js/cambio.js';
import './navegacion.js';
import './hamburguesa.js';
import { iniciarHorario } from './renderizarhorario.js';

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

test.addEventListener('click', () => {
    cargarmodulo('test');
});

cargarmodulo('inicio');
