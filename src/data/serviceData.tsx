export const carouselSlides = [
  {
    imgSrc: "/img/garden/imgJardin.jpg",
    title: "Bienvenidos a KindyStarts",
    subtitle: "Un lugar para crecer, jugar y aprender",
  },
  {
    imgSrc: "/img/garden/imgJardin2.jpg",
    title: "Inscripciones Abiertas 2026",
    subtitle: "Asegura tu lugar para el próximo ciclo. ¡Cupos limitados!",
  },
  {
    imgSrc: "/img/garden/imgJardin1.jpg",
    title: "20% de descuento",
    subtitle: "Reservando tu vacante antes del 31 de Diciembre.",
  },
];

export const activitiesData = [
  {
    title: "Día de pintura",
    date: "Miercoles, 10 de mayo 2025",
    description:
      "Hoy tuvimos un hermoso día de pintura en el jardín🎨. Los chicos y chicas disfrutaron de una jornada llena de color, creatividad y diversión. Con pinceles, rodillos, esponjas y hasta sus propias manos, exploraron distintas técnicas y mezclas de colores, dejando volar la imaginación.",
    photos: [
      "/img/galery/Image1.jpeg",
      "/img/galery/Image4.jpeg",
      "/img/galery/Image11.jpeg",
      "/img/galery/Image12.jpeg",
    ],
  },
  {
    title: "Día de granja",
    date: "Viernes, 15 de octubre 2025",
    description:
      "Hoy vivimos una jornada muy especial: ¡el día de granja! 🌻🐴🐇. Los chicos y chicas pudieron conocer de cerca distintos animales: gallinas, conejos, ovejas, cabritos y hasta una vaca muy simpática. Aprendieron sobre cómo se alimentan, qué cuidados necesitan y la importancia de respetar y cuidar a todos los seres vivos.",
    photos: [
      "/img/galery/Image5.jpeg",
      "/img/galery/Image7.jpeg",
      "/img/galery/Image9.jpeg",
      "/img/galery/Image13.jpeg",
    ],
  },
  {
    title: "Día de exposición ",
    date: "Viernes, 25 de Noviembre 2025",
    description:
      "Hoy celebramos con gran alegría nuestra exposición de trabajos🌟. Las salas del jardín se llenaron de color, creatividad y emoción. Las familias pudieron recorrer los espacios y observar los proyectos que los chicos y chicas realizaron durante este tiempo: pinturas, collages, maquetas, experimentos y muchas cosas más.",
    photos: [
      "/img/galery/Image8.jpeg",
      "/img/galery/Image10.jpeg",
      "/img/galery/Image3.jpeg",
      "/img/galery/Image.jpeg",
    ],
  },
];

export const pillarsData = [
  {
    title: "Primeros Pasos (Sala Maternal)",
    description:
      "Un programa especial de estimulación temprana y apego seguro para los más pequeñitos del jardín.",
  },
  {
    title: "Desarrollo Socio-Emocional",
    description:
      "Fomentamos la empatía, la amistad y la gestión de emociones a través del juego colaborativo.",
  },
  {
    title: "Estimulación Cognitiva",
    description:
      "Despertamos la curiosidad con desafíos lógicos, puzzles y preguntas que invitan a explorar el porqué de las cosas.",
  },
  {
    title: "Arte y Expresión",
    description:
      "Un espacio para ser creativos. Pintura, música, modelado y teatro para descubrir nuevas formas de comunicar.",
  },
  {
    title: "Lenguaje y Comunicación",
    description:
      " Desde las primeras canciones hasta la hora del cuento, enriquecemos su vocabulario y amor por la lectura.",
  },
  {
    title: "Psicomotricidad",
    description:
      "  Desde las primeras canciones hasta la hora del cuento, enriquecemos su vocabulario y amor por la lectura.",
  },
];

export const teamData = [
  {
    name: "Lucía P. Romagnoli",
    role: "Directora",
    imgSrc: "/img/team/directora.jpg"
  },
   {
    name: "Betina A. Acosta",
    role: "Maestra - Sala Azul",
    imgSrc: "/img/team/maestra_sa.jpg"
  },
   {
    name: "Mariana N. Gorosito",
    role: "Maestra - Sala Roja",
    imgSrc: "/img/team/maestra_sr.jpg"
  },
  {
    name: "Mercedes S. Torrico",
    role: "Prof. de Música",
    imgSrc: "/img/team/profesora_musica.jpg"
  }
]

export const users = [
  {
    role: 'admin',
    mail: 'admin@kindyStarts.com',
    pass: 'admin1234'
  },
    {
    role: 'teaching',
    mail: 'teachin@kindyStarts.com',
    pass: 'teach1234'
  },
    {
    role: 'family',
    mail: 'family@kindyStarts.com',
    pass: 'family1234'
  },
]

export const linksAdmData = [
  {title: 'Usuarios', description: 'Administrar los usuarios', link:'/users'},
  {title: 'Mensajes', description: 'Leer mensajes recibidos', link:'/messages'},
  {title: 'Actividades', description: 'Administrar actividades', link:'/novedades'},
]

export const linksTeachData = [
  {title: 'Alumnos', description: 'Información sobre mis niños/as', link:'/students'},
  {title: 'Novedades', description: 'Se realiza una descripcion de las cosas aprendidas', link:'/news'},
  {title: 'Fotos', description: 'Al finalizar el dia, se sube foto con las tareas realizadas', link:'/photos'},
]

export const linksFamilyData = [
  {title: 'Documentación', description: 'Adjuntar documentación requerida', link:'/documents'},
  {title: 'Novedades', description: 'Visualizar novedades', link:'/news'},
  {title: 'Fotos', description: 'Visualizar foto del dia', link:'/photos'},
]
