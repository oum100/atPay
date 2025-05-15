
// composables/useLiff.ts
import liff from '@line/liff'

export const useLiff = () => {
  const user = ref<any>(null)
  const error = ref<string | null>(null)
  const isReady = ref(false)
  const liffId:string = '1656517227-vB0Gk4zY' //'2003108655-0xrnX2Lx'

  const initLiff = async () => {
    try {
      await liff.init({ liffId: liffId }) // replace with your actual LIFF ID
      isReady.value = true

      // Auto-login if not already
      if (!liff.isLoggedIn()) {
        liff.login()
        return
      }

      const profile = await liff.getProfile()
      const email = liff.getDecodedIDToken()?.email

      // Save user profile
      user.value = {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        email
      }

      // Send to your backend
      await $fetch('/api/save-line-user', {
        method: 'POST',
        body: {
          userId: profile.userId,
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          email
        }
      })
    } catch (err: any) {
      error.value = err.message || 'LIFF init failed'
    }
  }

  return {
    initLiff,
    user,
    error,
    isReady
  }
}
