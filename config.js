import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWhEifm-I1mkiW7FCzNSL7m-1Qr5XSGaU",
  authDomain: "todo-firebase-meraj.firebaseapp.com",
  projectId: "todo-firebase-meraj",
  storageBucket: "todo-firebase-meraj.appspot.com",
  messagingSenderId: "573287958240",
  appId: "1:573287958240:web:979ea992b351572e003285",
};

// Initialize Firebase
//Exporting auth
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
