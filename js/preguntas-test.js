export const disciplinas = {
    defensa: {
        nombre: 'Defensa Personal',
        imagen: '05_Defensa_Personal.jpg',
        descripcion:
            'Técnicas prácticas para protegerte con control en situaciones reales.',
    },
    karate: {
        nombre: 'Karate Do',
        imagen: '01_Karate.jpg',
        descripcion:
            'Tradición, disciplina y control en el combate estructurado.',
    },
    jiu: {
        nombre: 'Jiu-Jitsu',
        imagen: '03_Jiu_Jitsu.jpg',
        descripcion:
            'Control, palancas y técnica para desenvolverte en el suelo.',
    },
    muay: {
        nombre: 'Muay Thai',
        imagen: '02_Muay_Thai.jpg',
        descripcion:
            'Golpes con puños, codos, rodillas y piernas junto con acondicionamiento físico.',
    },
    kick: {
        nombre: 'Kickboxing',
        imagen: '04_Kickboxing.jpg',
        descripcion:
            'Combinaciones de golpes y patadas, velocidad y trabajo cardiovascular.',
    },
};
// Puntos en orden: Defensa Personal, Karate Do, Jiu-Jitsu, Muay Thai y Kickboxing.
export const preguntas = [
    {
        categoria: 'Mentalidad y motivación',
        titulo: '¿Cuál es la verdadera razón por la que',
        acento: 'decides subir al tatami?',
        intro: 'El combate empieza en el propósito. Define la intención que alimentará tu disciplina diaria en Bushido Academy.',
        opciones: [
            {
                nombre: 'Supervivencia real',
                titulo: 'Dominar mi cuerpo y defensa personal efectiva',
                descripcion:
                    'Aprender a repeler agresiones de forma automática, contundente y con control absoluto.',
                puntos: [5, 2, 3, 1, 1],
            },
            {
                nombre: 'Catarsis física',
                titulo: 'Liberar tensión extrema y ganar potencia física',
                descripcion:
                    'Quemar cada gota de sudor, golpear sacos, descargar el estrés del día a día y transformar mi resistencia.',
                puntos: [1, 1, 1, 5, 4],
            },
            {
                nombre: 'Filosofía Bushido',
                titulo: 'Cultivar disciplina mental y serenidad bajo presión',
                descripcion:
                    'Forjar temple de acero, respirar en el caos y trasladar el dominio marcial a todas las áreas de mi vida.',
                puntos: [1, 5, 3, 1, 1],
            },
            {
                nombre: 'Espíritu competidor',
                titulo: 'Competir al más alto nivel y desafiar mis límites',
                descripcion:
                    'Medirme contra los mejores, entrar al ring o tatami y experimentar el fuego de la competición deportiva.',
                puntos: [0, 2, 4, 4, 5],
            },
        ],
    },
    {
        categoria: 'Dimensión de combate',
        titulo: '¿Qué tipo de sensaciones resuenan más',
        acento: 'con tu instinto de lucha?',
        intro: 'Cada disciplina domina un espacio específico del combate. Escoge la dinámica donde sientes que desatarás tu potencial.',
        opciones: [
            {
                nombre: 'Striking devastador',
                titulo: 'El arte del golpeo devastador de pie',
                descripcion:
                    'Impacto total: combinaciones fluidas de puños, patadas de tibia demoledoras, codos y rodillas en el clinch.',
                puntos: [1, 2, 0, 6, 4],
            },
            {
                nombre: 'Ajedrez humano',
                titulo: 'Agarre, control absoluto y sumisiones en el suelo',
                descripcion:
                    'Anular la fuerza bruta del oponente mediante palancas biomecánicas, estrangulaciones y dominio en el suelo.',
                puntos: [3, 0, 6, 0, 0],
            },
            {
                nombre: 'La dulce ciencia',
                titulo: 'Defensa pura, esquivas reflejas y precisión de puño',
                descripcion:
                    'Juego de pies prodigioso, cabeceo milimétrico, ángulos de guardia impenetrables y pegada quirúrgica.',
                puntos: [2, 2, 0, 3, 6],
            },
            {
                nombre: 'Evolución total',
                titulo: 'Combate total integrando todas las distancias',
                descripcion:
                    'La máxima expresión de las artes marciales: transición sin costuras entre pie, lucha olímpica y suelo letal.',
                puntos: [6, 2, 4, 3, 2],
            },
        ],
    },
    {
        categoria: 'Experiencia previa',
        titulo: '¿Cuál es tu punto de partida',
        acento: 'en las artes marciales?',
        intro: 'En Bushido Academy no importa dónde comienzas, sino tu compromiso con el camino. Adaptamos la pedagogía exactamente a tu punto actual.',
        opciones: [
            {
                nombre: 'Principiante absoluto',
                descripcion:
                    'Nunca he practicado antes o hace mucho tiempo. Quiero aprender bases sólidas con paciencia, sin ego y paso a paso.',
            },
            {
                nombre: 'Con experiencia o deporte de contacto',
                descripcion:
                    'He practicado antes o vengo de otra disciplina (crossfit, boxeo base, judo, etc.). Tengo nociones y buena motricidad.',
            },
            {
                nombre: 'Nivel avanzado / competidor',
                descripcion:
                    'Tengo años de experiencia sobre el tatami. Busco campamento de entrenamiento técnico exigente, sparring técnico y pulir detalles.',
            },
        ],
    },
    {
        categoria: 'Nivel de contacto',
        titulo: '¿Qué nivel de intensidad estás dispuesto',
        acento: 'a dar en cada sesión?',
        intro: 'La seguridad de nuestros miembros es sagrada. Tu intensidad define el ritmo de tus asaltos y la metodología del instructor.',
        opciones: [
            {
                nombre: 'Progresivo y técnico',
                descripcion:
                    'Prioridad en la mecánica, sin lesiones, trabajo en parejas coordinado y sin golpes al rostro a plena potencia.',
                detalle: 'Seguridad prioritaria',
            },
            {
                nombre: 'Físico y cardio extremo',
                descripcion:
                    'Ritmo alto de pulsaciones, golpeo a pads y manoplas a potencia real con pausas mínimas de recuperación.',
                detalle: 'Alta resistencia',
            },
            {
                nombre: 'Combate y sparring real',
                descripcion:
                    'Poner a prueba las técnicas bajo fuego controlado con protecciones completas y adrenalina competitiva.',
                detalle: 'Fuego y adrenalina',
            },
        ],
    },
    {
        categoria: 'Dedicación y rutina',
        titulo: '¿Cuánto tiempo estás decidido',
        acento: 'a dedicar a tu transformación?',
        intro: 'El progreso es fruto de la consistencia. Tu disponibilidad define cómo organizaremos tu hoja de ruta en Bushido Academy.',
        opciones: [
            {
                nombre: '2 días por semana',
                titulo: 'Constancia equilibrada',
                descripcion:
                    'Ideal para compaginar con trabajo exigente, familia u otras actividades deportivas sin quemarte.',
                detalle: 'Ritmo sostenible',
            },
            {
                nombre: '3 a 4 días por semana',
                titulo: 'Progresión acelerada',
                descripcion:
                    'El punto óptimo de retención motora, memoria muscular y metamorfosis física palpable en menos de 60 días.',
                detalle: 'Máximo rendimiento',
            },
            {
                nombre: '5 o más días por semana',
                titulo: 'Mentalidad de guerrero',
                descripcion:
                    'El tatami es tu segundo hogar. Acceso total a turnos de mañana y tarde, seminarios y open mat.',
                detalle: 'Inmersión completa',
            },
        ],
    },
];
