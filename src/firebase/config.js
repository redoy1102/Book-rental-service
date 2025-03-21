import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJixw__1L4XG2KCjOXO4BG6Zc7ejqIn4Q",
  authDomain: "book-rental-service-1b3c9.firebaseapp.com",
  projectId: "book-rental-service-1b3c9",
  storageBucket: "book-rental-service-1b3c9.firebasestorage.app",
  messagingSenderId: "257056036152",
  appId: "1:257056036152:web:d412315f4d3552ed2a5dcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
