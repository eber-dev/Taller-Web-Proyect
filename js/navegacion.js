const secciones = document.querySelectorAll('.encabezado > nav button');

secciones.forEach((e) => {
    e.addEventListener('click', () => {
        secciones.forEach((p) => p.classList.remove('seleccionado'));
        e.classList.add('seleccionado');
    });
});
