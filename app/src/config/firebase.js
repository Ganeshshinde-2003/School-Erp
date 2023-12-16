// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC59aP3HXo2TRt9YvtBNU7VqnjgnFaGjFk",
  authDomain: "lmsapp-5ab03.firebaseapp.com",
  projectId: "lmsapp-5ab03",
  storageBucket: "lmsapp-5ab03.appspot.com",
  messagingSenderId: "786247972605",
  appId: "1:786247972605:web:6b28136cee8cbd4f857094",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
