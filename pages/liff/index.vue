<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import liff from '@line/liff'

definePageMeta({
    auth:false
})

const route = useRoute()
const router = useRouter()
const error = ref()


onMounted(async () => {

  const liffState = route.query['liff.state']
  console.log("LiffState:",liffState)

  // const liff_id = useRuntimeConfig().line_liff_id
  const liff_id = '1656517227-vB0Gk4zY'
  await liff.init({ liffId: liff_id })

  if (!liff.isLoggedIn()){ 
    liff.login() 
  }

    //   👉 รอจนแน่ใจว่าล็อกอินแล้ว ค่อย redirect
  if (liff.isLoggedIn() && typeof liffState === 'string') {
    router.replace(liffState)
  }


})
</script>

<template>
  <!-- <v-container>
    <v-progress-circular indeterminate />
    <div>Initializing LIFF...</div>
  </v-container> -->
</template>
