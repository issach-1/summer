// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDSrp9Tk_CXBnunp6V-_PngPCSZb1y3Kw",
  authDomain: "army-4d3fe.firebaseapp.com",
  projectId: "army-4d3fe",
  storageBucket: "army-4d3fe.appspot.com",
  messagingSenderId: "1000438813669",
  appId: "1:1000438813669:web:1bf54f3c319ec87b44150c",
  measurementId: "G-N8CSTCNT5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
