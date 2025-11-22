// js/auth-utils.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";

// 회원가입
export async function registerUser({ email, password, nickname, phone }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Firebase Auth 표시 이름
  await updateProfile(user, { displayName: nickname });

  // Firestore users 문서 생성
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    email,
    nickname,
    phone: phone || "",
    role: "user",      // 기본은 일반 유저
    money: 0,
    point: 0,
    createdAt: serverTimestamp()
  });

  return user;
}

// 로그인
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// 로그아웃
export function logoutUser() {
  return signOut(auth);
}

// 인증 상태 리스너
export function listenAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// 현재 유저 Firestore 정보
export async function fetchCurrentUserProfile(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ✅ Firebase Auth 에러코드 → 한국어 메시지 변환
export function translateAuthError(error) {
  const code = error?.code;

  const map = {
    "auth/invalid-email": "올바르지 않은 이메일 형식입니다.",
    "auth/user-not-found": "존재하지 않는 계정입니다.",
    "auth/wrong-password": "비밀번호가 일치하지 않습니다.",
    "auth/invalid-credential": "아이디 또는 비밀번호가 틀렸습니다.",
    "auth/too-many-requests": "잠시 후 다시 시도해주세요. 로그인 시도가 너무 많습니다.",
    "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
    "auth/weak-password": "비밀번호는 6자 이상이어야 합니다.",
    "auth/network-request-failed": "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.",
  };

  return map[code] || "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
