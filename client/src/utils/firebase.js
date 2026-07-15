import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-b3zVxWWkVO-Vsmx_eJ50jQypryGxnSQ",
  authDomain: "eventconnect-dev.firebaseapp.com",
  projectId: "eventconnect-dev",
  storageBucket: "eventconnect-dev.firebasestorage.app",
  messagingSenderId: "325321688543",
  appId: "1:325321688543:web:2a3b233590e2ffd291706a",
  measurementId: "G-3PG676ETL4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);          
export const googleProvider = new GoogleAuthProvider();
