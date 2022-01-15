import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDr2QEZJWu4Q7F4QELlowJw4xT-7VckOVM",
    authDomain: "reaction-timer-5124d.firebaseapp.com",
    projectId: "reaction-timer-5124d",
    storageBucket: "reaction-timer-5124d.appspot.com",
    messagingSenderId: "867268321260",
    appId: "1:867268321260:web:8553d865198eb0e4f86ac9"
  };

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore()

export { projectFirestore }