// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADP2pEpGvyy8DQojA0FTdxbO2r0LgW5rs",
  authDomain: "tekno-interior.firebaseapp.com",
  projectId: "tekno-interior",
  storageBucket: "tekno-interior.appspot.com",
  messagingSenderId: "152596767967",
  appId: "1:152596767967:web:7d14d02a5b623427eff56a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
