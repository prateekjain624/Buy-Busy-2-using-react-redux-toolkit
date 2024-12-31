// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtySNS0udGPvk7KOoyTH-FhLeK5wDP-7A",
  authDomain: "buy-busy2-dfb5f.firebaseapp.com",
  projectId: "buy-busy2-dfb5f",
  storageBucket: "buy-busy2-dfb5f.firebasestorage.app",
  messagingSenderId: "425580793325",
  appId: "1:425580793325:web:60770b5436a337dbe0ebe4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
