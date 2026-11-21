import { horariosGym } from './horario.js';

const CLAVE = 'reservasBushido';

// Lista de clases que se pueden reservar: una por cada día de cada horario.
const clases = [];
for (const horario of horariosGym) {
    if (horario.requiereReserva) {
        for (const dia of horario.dias) {
            clases.push({
                idHorario: horario.id,
                disciplina: horario.disciplina,
                dia: dia,
                horaInicio: horario.horaInicio,
                horaFin: horario.horaFin,
            });
        }
    }
}

const leerReservas = () => {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === null) return [];
    return JSON.parse(guardado);
};

const guardarReservas = (reservas) => {
    localStorage.setItem(CLAVE, JSON.stringify(reservas));
};

// Evita que lo que escribe el usuario se lea como HTML.
const limpiar = (texto) => {
    return texto.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
};

export const iniciarReserva = (dialogo, modo, idHorario) => {
    const titulo = dialogo.querySelector('#reserva-titulo');
    const contenido = dialogo.querySelector('#reserva-contenido');
    const cerrar = () => dialogo.close();

    // Pantalla con la lista de reservas guardadas.
    const mostrarLista = () => {
        titulo.textContent = 'MIS RESERVAS';
        const reservas = leerReservas();
        let items = '';
        for (let i = 0; i < reservas.length; i++) {
            const reserva = reservas[i];
            items += `<li class="reserva-item"><div><strong>${reserva.disciplina}</strong><p>${reserva.dia} · ${reserva.horaInicio} - ${reserva.horaFin}</p><p>${limpiar(reserva.nombre)}</p></div><button type="button" class="cancelar" data-posicion="${i}">CANCELAR</button></li>`;
        }
        if (reservas.length === 0) {
            items = '<li class="reserva-vacio">Todavía no tienes reservas en este navegador.</li>';
        }
        contenido.innerHTML = `<ul class="reserva-list">${items}</ul><div class="reserva-actions"><button type="button" class="reserva-primary nueva">NUEVA RESERVA</button></div>`;

        // Cada botón CANCELAR borra la reserva que está en su posición.
        const botonesCancelar = contenido.querySelectorAll('.cancelar');
        for (const boton of botonesCancelar) {
            boton.addEventListener('click', () => {
                const actuales = leerReservas();
                actuales.splice(Number(boton.dataset.posicion), 1);
                guardarReservas(actuales);
                mostrarLista();
            });
        }
        // mostrarFormulario se define más abajo; se usa recién al hacer clic.
        contenido.querySelector('.nueva').addEventListener('click', () => {
            idHorario = 0;
            mostrarFormulario();
        });
    };

    // Pantalla que se muestra después de guardar.
    const mostrarConfirmacion = (reserva) => {
        titulo.textContent = '¡RESERVA CONFIRMADA!';
        contenido.innerHTML = `<p class="reserva-texto">${limpiar(reserva.nombre)}, te esperamos el <strong>${reserva.dia}</strong> de <strong>${reserva.horaInicio} a ${reserva.horaFin}</strong> en <strong>${reserva.disciplina}</strong>.</p><div class="reserva-actions"><button type="button" class="ver">VER MIS RESERVAS</button><button type="button" class="reserva-primary salir">CERRAR</button></div>`;
        contenido.querySelector('.ver').addEventListener('click', mostrarLista);
        contenido.querySelector('.salir').addEventListener('click', cerrar);
    };

    // Revisa los datos y, si están bien, guarda la reserva.
    const enviar = (formulario) => {
        const error = contenido.querySelector('.reserva-error');
        const nombre = formulario.nombre.value.trim();
        const correo = formulario.correo.value.trim().toLowerCase();
        const telefono = formulario.telefono.value.trim();
        const clase = clases[formulario.clase.value];

        if (nombre.length < 3) {
            error.textContent = 'Escribe tu nombre completo.';
            return;
        }
        if (!correo.includes('@') || !correo.includes('.')) {
            error.textContent = 'Escribe un correo válido.';
            return;
        }
        if (telefono.length !== 9 || telefono[0] !== '9' || isNaN(telefono)) {
            error.textContent = 'El celular debe tener 9 números y empezar con 9.';
            return;
        }

        const reservas = leerReservas();
        for (const reserva of reservas) {
            if (
                reserva.correo === correo &&
                reserva.disciplina === clase.disciplina &&
                reserva.dia === clase.dia &&
                reserva.horaInicio === clase.horaInicio
            ) {
                error.textContent = 'Ya reservaste esa clase con este correo.';
                return;
            }
        }

        const nueva = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            disciplina: clase.disciplina,
            dia: clase.dia,
            horaInicio: clase.horaInicio,
            horaFin: clase.horaFin,
        };
        reservas.push(nueva);
        guardarReservas(reservas);
        mostrarConfirmacion(nueva);
    };

    // Pantalla con el formulario.
    const mostrarFormulario = () => {
        titulo.textContent = 'RESERVA TU CLASE';

        // Si venimos de una tarjeta (idHorario distinto de 0), solo mostramos esa clase.
        let opciones = '';
        for (let i = 0; i < clases.length; i++) {
            const clase = clases[i];
            if (idHorario !== 0 && clase.idHorario !== idHorario) continue;
            opciones += `<option value="${i}">${clase.disciplina} · ${clase.dia} · ${clase.horaInicio} - ${clase.horaFin}</option>`;
        }

        contenido.innerHTML = `<form class="reserva-form" novalidate><label>Nombre completo<input name="nombre" /></label><label>Correo<input name="correo" type="email" /></label><label>Celular<input name="telefono" maxlength="9" placeholder="9XXXXXXXX" /></label><label>Clase<select name="clase">${opciones}</select></label><p class="reserva-error"></p><div class="reserva-actions"><button type="submit" class="reserva-primary">CONFIRMAR RESERVA</button></div></form>`;

        const formulario = contenido.querySelector('.reserva-form');
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            enviar(formulario);
        });
    };

    dialogo.querySelector('.reserva-close').addEventListener('click', cerrar);
    dialogo.addEventListener('close', () => {
        dialogo.remove();
    });
    dialogo.showModal();

    if (modo === 'lista') mostrarLista();
    else mostrarFormulario();
};

// Carga pages/reserva.html y abre el modal, igual que se hace con el test.
export const abrirReserva = async (modo, idHorario) => {
    if (document.querySelector('.reserva-modal')) return;
    const respuesta = await fetch('./pages/reserva.html');
    if (!respuesta.ok) return;
    if (document.querySelector('.reserva-modal')) return;
    const contenedor = document.createElement('div');
    contenedor.innerHTML = await respuesta.text();
    const dialogo = contenedor.firstElementChild;
    document.body.append(dialogo);
    iniciarReserva(dialogo, modo, idHorario);
};

// Botones "Reservar plaza" de las tarjetas (se vuelven a crear al filtrar).
export const enlazarBotonesReservar = () => {
    const botones = document.querySelectorAll('.btn-reservar');
    for (const boton of botones) {
        if (boton.classList.contains('btn-libre')) continue;
        boton.addEventListener('click', () => {
            abrirReserva('formulario', Number(boton.dataset.id));
        });
    }
};

// Botones de la página que se acaba de cargar (inicio, servicios y horarios).
export const enlazarReservas = () => {
    const botonesGratis = document.querySelectorAll('.principal, .etiqueta-part2 > button');
    for (const boton of botonesGratis) {
        boton.addEventListener('click', () => {
            abrirReserva('formulario', 0);
        });
    }
    const misReservas = document.querySelector('.mis-reservas');
    if (misReservas) {
        misReservas.addEventListener('click', () => {
            abrirReserva('lista', 0);
        });
    }
};