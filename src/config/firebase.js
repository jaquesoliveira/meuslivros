import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBTAkbLAMUyzldjItlMz03HN0WushG8p2w",
  authDomain: "sisbronse.firebaseapp.com",
  databaseURL: "https://sisbronse.firebaseio.com",
  projectId: "sisbronse",
  storageBucket: "sisbronse.appspot.com",
  messagingSenderId: "176257604639",
  appId: "1:176257604639:web:1eb3f46596fd0c86f7092a",
  measurementId: "G-XV5T1TRHBJ"
};

  export default firebase.initializeApp(firebaseConfig);