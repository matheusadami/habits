import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

function initializeFirebaseAuth() {
  const firebaseConfig = {
    appId: import.meta.env.VITE_FIREBASE_APPID,
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID
  }
  
  return initializeApp(firebaseConfig)
}

export const app = initializeFirebaseAuth()
export const auth = getAuth(app)

export function hasAuthUser() {
  return !!auth.currentUser
}

export const getAuthUserUid = (): string | undefined => auth.currentUser?.uid