import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCnbjnsxAQ13n_T5UvUdkdEs29c3so3DHo",
  authDomain: "adoptify-eb542.firebaseapp.com",
  projectId: "adoptify-eb542",
  storageBucket: "adoptify-eb542.appspot.com",
  messagingSenderId: "443905874778",
  appId: "1:443905874778:web:773edf12ce6f144853f163",
  measurementId: "G-WK82FGRCGV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);