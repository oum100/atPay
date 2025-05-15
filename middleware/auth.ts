// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  // ยกเว้นเส้นทางที่เกี่ยวข้องกับการเข้าสู่ระบบ
  if (to.path.startsWith('/auth')) return

  // เรียก API เพื่อตรวจสอบสถานะการเข้าสู่ระบบ
  const session = await $fetch('/api/auth/session').catch(() => null)

  // หากไม่มี session หรือไม่มีผู้ใช้ที่เข้าสู่ระบบ
  if (!session?.user) {
    const callbackUrl = to.fullPath
    return navigateTo(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }
})
