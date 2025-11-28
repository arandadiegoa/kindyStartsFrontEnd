import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Tu configuración de Firebase
// (Copia esto desde la consola de Firebase: Project settings -> General -> Your apps)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-GP739S3VTT"
};

// 1. Inicializamos la App
const app = initializeApp(firebaseConfig);

// 2. Exportamos la instancia de Storage ya inicializada
export const storage = getStorage(app);