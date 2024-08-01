// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAzkNbpIlqTpfjPO8HkX4l88DDAwz7LBc",
  authDomain: "netflix-gpt-2c2eb.firebaseapp.com",
  projectId: "netflix-gpt-2c2eb",
  storageBucket: "netflix-gpt-2c2eb.appspot.com",
  messagingSenderId: "558038375554",
  appId: "1:558038375554:web:555698cc717648230a689b",
  measurementId: "G-2PRWJ5G34R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
