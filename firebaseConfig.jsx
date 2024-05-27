// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtfU0ii5oY13-WcVXJ8Z20TnC_MomaeiI",
  authDomain: "girlz-couple-dresses.firebaseapp.com",
  projectId: "girlz-couple-dresses",
  storageBucket: "girlz-couple-dresses.appspot.com",
  messagingSenderId: "254704829222",
  appId: "1:254704829222:web:dbbe83fd4fc81c1e8d37e7",
  measurementId: "G-WVF5BZ4H1L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
