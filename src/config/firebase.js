import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBTAkbLAMUyzldjItlMz03HN0WushG8p2w",
    authDomain: "sisbronse.firebaseapp.com",
    databaseURL: "https://sisbronse.firebaseio.com",
    projectId: "sisbronse",
    storageBucket: "sisbronse.appspot.com",
    messagingSenderId: "176257604639",
    appId: "1:176257604639:web:3f568191e14f67a7f7092a",
    measurementId: "G-F0ZS2BYKNS"
  };

  export default firebase.initializeApp(firebaseConfig);