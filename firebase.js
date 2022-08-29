// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBf1ISi2747HGnPYw_i-Y2jQralDPOkMY",
  authDomain: "native-futbol-3d27e.firebaseapp.com",
  projectId: "native-futbol-3d27e",
  storageBucket: "native-futbol-3d27e.appspot.com",
  messagingSenderId: "115790908064",
  appId: "1:115790908064:web:10c7f591c4e2f35dd1d7c5",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore(app);

export { auth, db };
