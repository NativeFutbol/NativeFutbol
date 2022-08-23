// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzCbFZ_r1jmhnu479V8tYt4cm2dYUH9Q0",
  authDomain: "native-futbol.firebaseapp.com",
  projectId: "native-futbol",
  storageBucket: "native-futbol.appspot.com",
  messagingSenderId: "214072949766",
  appId: "1:214072949766:web:cfbcd4bc18e0a9bebcd787",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
