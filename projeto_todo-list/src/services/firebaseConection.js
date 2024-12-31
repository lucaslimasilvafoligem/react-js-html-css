import { initializeApp } from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDdTTzhZmvNesGtV4aKTSaoNCGNAKKvFEQ",
  authDomain: "chamados-28c05.firebaseapp.com",
  projectId: "chamados-28c05",
  storageBucket: "chamados-28c05.appspot.com",
  messagingSenderId: "818979833822",
  appId: "1:818979833822:web:70087791f8e109c91b7f4f",
  measurementId: "G-CPK8D2KQKS"
};

export const app = initializeApp(firebaseConfig);