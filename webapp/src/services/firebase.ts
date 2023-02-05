import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

function initializeFirebaseAuth() {
  const firebaseConfig = {
    appId: "1:102703015367:web:eda3391603e147225ea5e2",
    apiKey: "AIzaSyCKJqdlOlxOGcQT10KnjEUsxcaFk_5hfNc",
    authDomain: "nlw-setup-habits.firebaseapp.com",
    projectId: "nlw-setup-habits",
    storageBucket: "nlw-setup-habits.appspot.com",
    messagingSenderId: "102703015367"
  }
  
  return initializeApp(firebaseConfig)
}

export const app = initializeFirebaseAuth()
export const auth = getAuth(app)

export function hasAuthUser() {
  return !!auth.currentUser
}

export const getAuthUserUid = (): string | undefined => auth.currentUser?.uid