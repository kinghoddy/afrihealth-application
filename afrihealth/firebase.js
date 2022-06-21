// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4kgOTRhgCcC2yXVjoNOtQ0P_HaKfu5Ac",
  authDomain: "afrihealth-353912.firebaseapp.com",
  databaseURL: "https://afrihealth-353912-default-rtdb.firebaseio.com",
  projectId: "afrihealth-353912",
  storageBucket: "afrihealth-353912.appspot.com",
  messagingSenderId: "476282858688",
  appId: "1:476282858688:web:84b0b9853f614ebdefd125",
  measurementId: "G-RDJ1N7F500",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
