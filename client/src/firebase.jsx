// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-59396.firebaseapp.com",
  projectId: "mern-stack-59396",
  storageBucket: "mern-stack-59396.firebasestorage.app",
  messagingSenderId: "112863848157",
  appId: "1:112863848157:web:a7eff2a57b06a51a921d34"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);