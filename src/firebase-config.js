// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAoHb5SWOBRHpCMEQj8Xxtro3tV73h8Kj4",
    authDomain: "my-blogging-website-1e155.firebaseapp.com",
    projectId: "my-blogging-website-1e155",
    storageBucket: "my-blogging-website-1e155.firebasestorage.app",
    messagingSenderId: "797173340952",
    appId: "1:797173340952:web:191c36c1db17db44801c6d",
    measurementId: "G-V067W0KXE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };