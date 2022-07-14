// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2duniGRGAC19rKRCIw8788rBi9YxW2uw",
  authDomain: "pay-easy-scooter.firebaseapp.com",
  projectId: "pay-easy-scooter",
  storageBucket: "pay-easy-scooter.appspot.com",
  messagingSenderId: "93316121345",
  appId: "1:93316121345:web:6aa16bd44fd37899f65100",
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
