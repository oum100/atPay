// plugins/init-auth.client.ts
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(() => {
  const { status, data: session } = useAuth()
  const authStore = useAuthStore()

  watchEffect(() => {
    if (status.value === 'authenticated' && session.value?.user) {
      authStore.setUser(session.value.user)
    } else if (status.value === 'unauthenticated') {
      authStore.clearUser()
    }
  })
})
