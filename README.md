KindyStarts - Aplicación de Gestión de Jardín Maternal✨

KindyStarts es una aplicación web (SPA) diseñada para centralizar la comunicación y gestión de un jardín maternal, conectando a Administradores, Docentes y Familias en una sola plataforma.

Este proyecto fue construido con un enfoque "mobile-first", utilizando un stack moderno de React y herramientas de UI de alta calidad.

---

Capturas de pantalla (Screenshots)

Home
![Captura Home](./public/img/screenshots/image5.png)


Login
![Captura Login](./public/img/screenshots/image.png)


Registrate
![Captura Registrate](./public/img/screenshots/image4.png)


Panel Admin
![Captura panel Adm](./public/img/screenshots/image-1.png)


Panel Docente
![Captura panel docente](./public/img/screenshots/image3.png)


Contacto
![Captura Contacto](/public/img/screenshots/image6.png)


Galería de Actividades
![Captura galeria actividades](./public/img/screenshots/image-2.png)


Preguntas frecuentes
![Captura Preguntas frecuentes](./public/img/screenshots/image8.png)

¿Cómo inscribirse?
![Captura ¿Cómo inscribirse?](./public/img/screenshots/image7.png)

---
🚀 Tecnologías Utilizadas
Este proyecto fue construido utilizando:

Framework: React 18 (con Vite).

Lenguaje: TypeScript.

Componentes de UI: shadcn/ui - Una colección de componentes reutilizables construidos sobre Radix UI.

Estilos: Tailwind CSS - Para un diseño rápido y responsivo.

Routing: React Router v6 - Para la navegación y la creación de rutas protegidas.

Manejo de Formularios: React Hook Form - Para formularios de alto rendimiento.

Validación de Schemas: Zod - Para validar formularios (Login, Registro, Contacto, Subida de Archivos).

Manejo de Estado (Global): React Context API - Para gestionar la autenticación y el estado del usuario en toda la app.

Carruseles: Embla Carousel - Utilizado en el Home y en las galerías (con plugins de Autoplay y Fade).

Iconos: Lucide React.

---
✨ Características Principales
Sistema de Autenticación y Roles

Login por Roles: Valida usuarios contra un mock de datos (data/users.ts) y diferencia entre roles: admin, teaching (docente) y family.

Persistencia de Sesión: Utiliza localStorage y el AuthProvider para mantener al usuario logueado incluso después de refrescar la página.

Logout Seguro: Maneja correctamente el logout y la navegación, evitando "páginas fantasma" del caché del navegador.

Rutas Protegidas (ProtectedRoute): Un componente "guardián" que restringe el acceso a las ruta (/admin/*, /family/*) basándose en el rol del usuario guardado en el AuthContext.

---
Paneles de Control Dinámicos

Layout Dinámico: La Navbar y el Footer cambian dinámicamente. 

El Navbar muestra diferentes links según el rol, y el Footer se oculta para admin y teaching.

Paneles de Tareas (Launchpads): En lugar de un dashboard tradicional, cada rol tiene un panel 
de inicio (CardLinks) con tarjetas que enlazan a sus respectivas funciones.

Efectos de UI Modernos: Las tarjetas de navegación incluyen efectos hover (levantamiento, 
sombra y revelado de flecha) para una UX más moderna.

---
Módulos de Administración (Admin)

Gestión de Usuarios: Página con una tabla para visualizar y gestionar usuarios.

Bandeja de Mensajes: Un diseño tipo "Inbox" de email para leer y gestionar los mensajes del
formulario de contacto, con estado "Leído" / "Pendiente".

Gestión de Actividades: Un layout de tarjetas que permite al admin ver, editar y borrar 
actividades. Incluye un modal con un carrusel para ver todas las fotos.

---
Módulos de Docente y Familia

Portal de Familia: Incluye un formulario funcional para la subida de archivos (con validación de tipo y tamaño usando Zod y FileList).

Galería de Actividades: Componente reutilizable (ActivityCard) que muestra una descripción fecha, y una galería de fotos con un Lightbox (modal) que incluye un carrusel automático (embla-carousel-autoplay) y con efecto fade (embla-carousel-fade).

---
Componentes y UI General

Home: Carrusel principal a pantalla completa con texto superpuesto.

Páginas Estáticas: Secciones de "Propuesta Educativa" y "Equipo de Trabajo" diseñadas con shadcn/ui.

Layout Responsivo: Todo el sitio está construido con un enfoque "Mobile-First" usando Tailwind CSS.

Header Fijo (Sticky): El Navbar se mantiene fijo en la parte superior durante el scroll.

---



