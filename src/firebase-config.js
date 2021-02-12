import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATJcrjSlBCREta8cF6eK3dGTfaHFHyj_c",
  authDomain: "portfolio-4cd7f.firebaseapp.com",
  databaseURL: "https://portfolio-4cd7f-default-rtdb.firebaseio.com",
  projectId: "portfolio-4cd7f",
  storageBucket: "portfolio-4cd7f.appspot.com",
  messagingSenderId: "908104533512",
  appId: "1:908104533512:web:12e555554fa9f9d8a5b3bd",
  measurementId: "G-MM2RQNEBN1"
});

const db = firebaseApp

export default db;
