import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración que te proporcionó Firebase (cámbiala por la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyDhiIyxRRK0IEatzHlQHH3zgLxwSfdvh8A",
  authDomain: "gestor-de-tareas-d764c.firebaseapp.com",
  projectId: "gestor-de-tareas-d764c",
  storageBucket: "gestor-de-tareas-d764c.firebasestorage.app",
  messagingSenderId: "721949856268",
  appId: "1:721949856268:web:1b9e152b45bb87bcf89429",
  measurementId: "G-X9EM8TF646"
};

// Inicialización
const app = initializeApp(firebaseConfig);

// Exporta los servicios que necesites
export const auth = getAuth(app);
export const db = getFirestore(app);