import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBhEqOlAcRosstYkaADYGPsSFRXTkMi7U",
    authDomain: "agrocode-e333e.firebaseapp.com",
    projectId: "agrocode-e333e",
    storageBucket: "agrocode-e333e.appspot.com",
    messagingSenderId: "965980454930",
    appId: "1:965980454930:web:9d8bb606ff3136968b18cb",
    measurementId: "G-5F9SJMJPW3"
};

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
var storage = getFirestore(app);

export { auth, storage }