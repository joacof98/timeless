import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBjVpSVI3FRpIIP2WYFgD_hP0j3mOgiEtk",
  authDomain: "timeless-d65f1.firebaseapp.com",
  projectId: "timeless-d65f1",
  storageBucket: "timeless-d65f1.appspot.com",
  messagingSenderId: "844181041867",
  appId: "1:844181041867:web:713495ae3ad67eb879e14e",
  measurementId: "G-X25SDCNG2T",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
//firebase.analytics();

export { storage, firebase as default};
