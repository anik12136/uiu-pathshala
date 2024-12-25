// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "uiu-pathshala-e3ddd.firebaseapp.com",
  projectId: "uiu-pathshala-e3ddd",
  storageBucket: "uiu-pathshala-e3ddd.firebasestorage.app",
  messagingSenderId: "985413969476",
  appId: "1:985413969476:web:2c853ae9b314235906fe11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;