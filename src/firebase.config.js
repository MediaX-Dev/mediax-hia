// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcDwsFoGH_wBCuu2B4q3p3b3NWOrO2GxY",
  authDomain: "happening-in-agra.firebaseapp.com",
  projectId: "happening-in-agra",
  storageBucket: "happening-in-agra.appspot.com",
  messagingSenderId: "1517234104",
  appId: "1:151723413804:web:50d97f3ae22257f5c89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore()

export {db, auth};