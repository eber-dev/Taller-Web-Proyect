const contenido = document.getElementById('contenido');

export async function cargarmodulo(pagina) {
    const promesa = await fetch(`../pages/${pagina}.html`);
    const modulo = await promesa.text();

    contenido.innerHTML = modulo;

    window.scrollTo(0, 0);
}
