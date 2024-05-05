// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGa_LTsLHoFK0FYvij_YKq0_LFEY5p4p0",
  authDomain: "otp-project-4cbfc.firebaseapp.com",
  projectId: "otp-project-4cbfc",
  storageBucket: "otp-project-4cbfc.appspot.com",
  messagingSenderId: "1050949387761",
  appId: "1:1050949387761:web:60444e24c6de643bad3050",
  measurementId: "G-C840H4WNJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)