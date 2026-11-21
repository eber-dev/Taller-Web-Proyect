const CLAVE = 'tema';
const raiz = document.documentElement;
const boton = document.querySelector('.tema-toggle');

function aplicar(tema) {
    raiz.dataset.tema = tema;
    const claro = tema === 'claro';
    boton.textContent = claro ? '🌙' : '☀️';
    boton.setAttribute(
        'aria-label',
        claro ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro',
    );
}

export function iniciarTema() {
    aplicar(raiz.dataset.tema || 'oscuro');

    boton.addEventListener('click', () => {
        const nuevo = raiz.dataset.tema === 'claro' ? 'oscuro' : 'claro';
        aplicar(nuevo);
        try {
            localStorage.setItem(CLAVE, nuevo);
        } catch {}
    });
}