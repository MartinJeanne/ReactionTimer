import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC9O66NoVZRNv37zdtNzETuwSL-DH5Cqdg",
    authDomain: "reactiontimer-firebase.firebaseapp.com",
    projectId: "reactiontimer-firebase",
    storageBucket: "reactiontimer-firebase.appspot.com",
    messagingSenderId: "748725425560",
    appId: "1:748725425560:web:e8d4f0456127e0167387ed"
}

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore()

export { projectFirestore }