import * as firebase from "firebase";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyBWYjB0EqecbNWD_J-0Ac1K1Sr6bgej1Xw",
    authDomain: "kaizen-6d3d0.firebaseapp.com",
    databaseURL: "https://kaizen-6d3d0.firebaseio.com",
    projectId: "kaizen-6d3d0",
    storageBucket: "kaizen-6d3d0.appspot.com",
    messagingSenderId: "837352375289",
    appId: "1:837352375289:web:1a4d98b404519028eaf328",
    measurementId: "G-HCJZKCLY8R"
});

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();*/

export default firebase;