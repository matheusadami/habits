import webPush from 'web-push'

export function config() {
  const pushNotificationGCMKey = process.env.PUSH_NOTIFICATION_GCM_KEY
  const pushNotificationPublicKey = process.env.PUSH_NOTIFICATION_PUBLIC_KEY
  const pushNotificationPrivateKey = process.env.PUSH_NOTIFICATION_PRIVATE_KEY
  
  if (pushNotificationGCMKey && pushNotificationPublicKey && pushNotificationPrivateKey) {
    webPush.setGCMAPIKey(pushNotificationGCMKey)
    return webPush.setVapidDetails('mailto:matheus.adami.dev@gmail.com', pushNotificationPublicKey, pushNotificationPrivateKey)
  }

  throw new Error('Public and private keys don\'t exists')
}