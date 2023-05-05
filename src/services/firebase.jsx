// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDBFBqvqmppNMHKZo4II-6nmnYMeVqrC8",
  authDomain: "prigra-2de4f.firebaseapp.com",
  projectId: "prigra-2de4f",
  storageBucket: "prigra-2de4f.appspot.com",
  messagingSenderId: "532864371628",
  appId: "1:532864371628:web:f62642be977859d73cc809"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);