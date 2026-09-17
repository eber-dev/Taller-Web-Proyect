const menuHamburguesa = document.querySelector('.menu-hamburguesa');
const nav = document.querySelector('.encabezado > nav');
const secciones = document.querySelectorAll('.encabezado > nav button');

menuHamburguesa.addEventListener('click', () => {
    nav.classList.toggle('menu-abierto');
});

secciones.forEach((boton) => {
    boton.addEventListener('click', () => {
        nav.classList.remove('menu-abierto');
    });
});
