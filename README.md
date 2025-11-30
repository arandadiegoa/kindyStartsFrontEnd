KindyStarts - Aplicación de Gestión de Jardín Maternal✨

KindyStarts es una aplicación web (SPA) diseñada para centralizar la comunicación y gestión de un jardín maternal, conectando a Administradores, Docentes y Familias en una sola plataforma.

Este proyecto fue construido con una arquitectura moderna, escalable y Serverless.

---
Users de prueba

Admin

mail: luciaLopez@kindyStarts.com
pass: admin1234

Docente

mail: betinaAcosta@kindyStarts.com
pass: betina1234

Family

mail: diegoa@kindyStarts.com
pass: diegoa1234

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


Panel Family
![Captura panel family](./public/img/screenshots/image9.png)


Contacto
![Captura Contacto](/public/img/screenshots/image6.png)


Galería de Actividades
![Captura galeria actividades](./public/img/screenshots/image-2.png)


Preguntas frecuentes
![Captura Preguntas frecuentes](./public/img/screenshots/image8.png)

¿Cómo inscribirse?
![Captura ¿Cómo inscribirse?](./public/img/screenshots/image7.png)

---
🛠 Tecnologías Utilizadas
Este proyecto fue construido utilizando un stack tecnológico de última generación:

Core: React 18 (con Vite).

Lenguaje: TypeScript - Para un código robusto y tipado.

Backend as a Service (BaaS): Firebase (Google).

🔐 Authentication: Gestión de identidades y login seguro.

🔥 Firestore Database: Base de datos NoSQL en tiempo real para usuarios, actividades y mensajes.

☁️ Storage: Almacenamiento en la nube para fotografías y archivos.

UI/UX:

shadcn/ui - Componentes reutilizables de alta calidad (basados en Radix UI).

Tailwind CSS - Estilizado rápido y responsivo (Mobile-First).

Lucide React - Iconografía moderna.

Embla Carousel - Carruseles táctiles con plugins de Autoplay y Fade.

Gestión de Estado & Lógica:

React Context API - Manejo global de sesión y autenticación.

React Router v6 - Navegación y protección de rutas.

React Hook Form + Zod - Manejo de formularios de alto rendimiento con validación de esquemas estricta.

---
✨ Características Principales

🔐 Sistema de Autenticación y Roles (Serverless)

Login Directo con Firebase: Autenticación segura contra Google Identity Platform, eliminando la

necesidad de un backend intermedio para el login.

Roles Dinámicos: Gestión de permisos (admin, teaching, family) almacenados en Firestore. El frontend

consulta el rol del usuario tras la autenticación y redirige al portal correspondiente.

Persistencia de Sesión: Mantiene al usuario logueado mediante onAuthStateChanged y Context API.

Rutas Protegidas: Componente ProtectedRoute que actúa como "guardián", impidiendo el acceso no 

autorizado a paneles administrativos o docentes mediante URL directa.

---
Paneles de Control Dinámicos

UX Adaptativa: La Navbar y el Footer mutan según el rol del usuario logueado.

Launchpads: Paneles de inicio visuales con tarjetas interactivas (efectos de elevación y sombra) para 

acceso rápido a las funciones de cada rol.

---
Módulos de Administración (Admin)

CRUD Completo de Actividades:

Creación/Edición: Formularios modales validados con Zod.

Gestión de Imágenes: Integración con Firebase Storage para subida múltiple de fotos, previsualización en 

tiempo real, validación de cantidad (máx. 5) y barra de progreso.

Actualización Optimista: La interfaz se actualiza instantáneamente al crear o borrar, mejorando la 

percepción de velocidad.

Gestión de Usuarios: Visualización y administración de perfiles sincronizados con Firestore.

Bandeja de Mensajes: Sistema tipo "Inbox" para gestionar consultas del formulario de contacto.

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
⚙️ Configuración del Entorno

Para ejecutar este proyecto, necesitas configurar las variables de entorno de Firebase. Crea un archivo .

env en la raíz del proyecto:

Fragmento de código

VITE_API_KEY=tu_api_key_de_firebase
VITE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_PROJECT_ID=tu-proyecto
VITE_STORAGE_BUCKET=tu-proyecto.firebasestorage.app
VITE_MESSAGING_SENDER_ID=tu_sender_id
VITE_APP_ID=tu_app_id
Nota: Asegúrate de habilitar Authentication (Email/Password), Firestore y Storage en tu consola de Firebase y configurar las reglas de CORS para el Storage si estás en desarrollo.

---
📦 Instalación y Uso

Instalar dependencias:

Bash

npm install

---
Correr servidor de desarrollo:

Bash

npm run dev


