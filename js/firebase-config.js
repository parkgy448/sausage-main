// js/firebase-config.js
// Firebase 프로젝트 설정을 넣어주세요.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoKaIkh3uGu_YPGfzQDqJTH-LuAZKr970",
  authDomain: "sausage-main.firebaseapp.com",
  projectId: "sausage-main",
  storageBucket: "sausage-main.firebasestorage.app",
  messagingSenderId: "445362758872",
  appId: "1:445362758872:web:e53edc4bdca3e75726e3ad"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
