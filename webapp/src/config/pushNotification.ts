import axios from "@/lib/axios"
import { auth } from '@/services/firebase'
import { onAuthStateChanged, User } from "firebase/auth"

if ('serviceWorker' in navigator) {
  configServiceWorker() 
}

async function configServiceWorker() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      configPushNotification(user)
    }
  })
}

async function unregisterCurrentServiceWorker() {
  const registration = await navigator.serviceWorker.getRegistration()
  await registration?.unregister()
}

async function configPushNotification(user: User) {
  await unregisterCurrentServiceWorker()
    
  const grantedNotificationPermission = 'granted'
  const response = await Notification.requestPermission()
  if (response.includes(grantedNotificationPermission)) {
    const register = await navigator.serviceWorker.register('./sw/serviceWorker.js', {scope: '/sw/'})
  
    const notificationsPublicKey = import.meta.env.VITE_PUSH_NOTIFICATION_PUBLIC_KEY

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: notificationsPublicKey
    })
    
    const userUid = user.uid
    await saveSubscription(userUid, subscription)
  }
}

async function saveSubscription(userUid: string, subscription: PushSubscription) {
  await axios.post('/push-notification/subscribe', {userUid, subscription: JSON.stringify(subscription)}, {
    headers: {"Content-Type":"application/json"}
  })
}

export {}