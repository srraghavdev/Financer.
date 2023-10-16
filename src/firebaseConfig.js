// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore,doc,setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxVFw9W2VkHJVFaiww1xutL1y0ve5NziY",
  authDomain: "financer-e921e.firebaseapp.com",
  projectId: "financer-e921e",
  storageBucket: "financer-e921e.appspot.com",
  messagingSenderId: "147714530572",
  appId: "1:147714530572:web:13ad42724ed42777e57d29"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()
export {app,auth,db,provider}