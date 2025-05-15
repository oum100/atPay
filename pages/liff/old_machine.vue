<script setup lang="ts">
definePageMeta({
    auth:false,
    layout:'blank'
})

import liff from '@line/liff'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const machineId = route.params.machine as string
const profile = ref<any>(null)
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    await liff.init({ liffId: '1656517227-vB0Gk4zY' }) // 👈 ใช้ LIFF ID จริง
    if (!liff.isLoggedIn()) liff.login()
    
    const user = await liff.getProfile()
    profile.value = {
      name: user.displayName,
      userId: user.userId,
      pictureUrl: user.pictureUrl,
      machineId,
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})



</script>

<template>
  <v-container>
    
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-progress-circular indeterminate v-if="loading" />
    <div class="d-flex justify-center">
        <div v-if="profile">
            <p class="d-flex justify-center">👤 {{ profile.name }}</p>
            <div class="d-flex justify-center">
                <v-avatar>
                  <img :src="profile.pictureUrl" width="100" />
                </v-avatar>
            </div>
            
            <p class="d-flex justify-center">LINE ID: {{ profile.userId }}</p>
        </div>
    </div>


    <h1 class="d-flex justify-center">Machine: {{ machineId }}</h1>
  </v-container>
</template>
