import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWXNN5ivFcNYVsSyPY_IddqdTJsh7cAJI",
  authDomain: "xcore-f2521.firebaseapp.com",
  projectId: "xcore-f2521",
  storageBucket: "xcore-f2521.appspot.com",
  messagingSenderId: "578586144504",
  appId: "1:578586144504:web:28500ef1bf4b7d5309550d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };