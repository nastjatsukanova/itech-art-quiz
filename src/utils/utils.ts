import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../components/store/firebase";
import firebase from "firebase/compat/app";



export const signIn = (userEmail: string, password: string) => {
    firebase.initializeApp(firebaseConfig);
    return firebase.auth().signInWithEmailAndPassword(userEmail, password);
};

export const signUp = (userEmail: string, verificationPassword: string) => {
    firebase.initializeApp(firebaseConfig);
    return firebase.auth().createUserWithEmailAndPassword(userEmail, verificationPassword);
};

export const generateID = () => Number(String(Date.now()).split("").splice(-3, 3).join(""));
