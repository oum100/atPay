<template>
    <div class="d-flex justify-center align-center fill-height">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </template>
  
  <script setup lang="ts">
    import { useAuthStore } from '~/stores/auth'
    import { useRouter } from 'vue-router'
    import Swal from 'sweetalert2'
    
    const authStore = useAuthStore()
    const router = useRouter()
    const {signOut} = useAuth()
    
    await signOut({ redirect: false })
    authStore.clearUser()
    
    await Swal.fire({
        icon: 'success',
        title: 'Signed out',
        text: 'You have been logged out.',
        timer: 1500,
        showConfirmButton: false
    })
    
    router.push('/auth/signin') // 🔁 เปลี่ยนเป็น '/' หรือหน้าอื่นที่คุณต้องการ
  </script>
  