import { getAuth, GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW9zYFnCKMqMFHsswQZc5a1nZR21wskq8",
  authDomain: "syntaxual-ai-ed4a2.firebaseapp.com",
  projectId: "syntaxual-ai-ed4a2",
  storageBucket: "syntaxual-ai-ed4a2.firebasestorage.app",
  messagingSenderId: "233797958232",
  appId: "1:233797958232:web:b2c67d4e5c1968e9d1682d",
  measurementId: "G-ZSL04RFCRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
