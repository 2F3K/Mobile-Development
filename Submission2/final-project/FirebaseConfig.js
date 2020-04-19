import * as firebase from 'firebase';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBAXxmk4zWJ7xgfzYC3rgEKnud7lwNHtMs",
  authDomain: "grocerylist-eab95.firebaseapp.com",
  databaseURL: "https://grocerylist-eab95.firebaseio.com",
  projectId: "grocerylist-eab95",
  storageBucket: "grocerylist-eab95.appspot.com",
  messagingSenderId: "75420614485",
  appId: "1:75420614485:web:34592c5fb5115e7ecf79dc"
};
// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();