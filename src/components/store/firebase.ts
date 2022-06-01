import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
    apiKey: "AIzaSyD51oVTOwJS13dViRVUVcmJII7vUxfU7OQ",
    authDomain: "quiz-react-95e1f.firebaseapp.com",
    databaseURL: "https://quiz-react-95e1f-default-rtdb.firebaseio.com",
    projectId: "quiz-react-95e1f",
    storageBucket: "quiz-react-95e1f.appspot.com",
    messagingSenderId: "378287482708",
    appId: "1:378287482708:web:e61f25cc6581d3c5e38ac1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);
