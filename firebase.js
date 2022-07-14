// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI3YkhbMPtq8hBQx-lpEK6MxB3DJ9RVOk",
  authDomain: "auth-88ff0.firebaseapp.com",
  projectId: "auth-88ff0",
  storageBucket: "auth-88ff0.appspot.com",
  messagingSenderId: "992066735501",
  appId: "1:992066735501:web:5fb842a03b9fc488dac1c4",
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
