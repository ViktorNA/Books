import firebase from "firebase";

export const config = {
    apiKey: "AIzaSyAthi3AJlz4zbPIRWRCJQVgF0hgvmTFnko",
    authDomain: "book-cart-b1798.firebaseapp.com",
    databaseURL: "https://book-cart-b1798.firebaseio.com",
    projectId: "book-cart-b1798",
    storageBucket: "book-cart-b1798.appspot.com",
    messagingSenderId: "157892045395"
};

firebase.initializeApp(config);

export default firebase;
