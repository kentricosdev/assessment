import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAW2bgPRbAA_h_-T3yLSTlEA7hfRTI72ak",
  authDomain: "xcode-assessment.firebaseapp.com",
  projectId: "xcode-assessment",
  storageBucket: "xcode-assessment.appspot.com",
  messagingSenderId: "263176737499",
  appId: "1:263176737499:web:838237c30b0d2010e6f2fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };