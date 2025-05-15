<!-- 📄 pages/index.vue -->
<template>
    <div class="d-flex justify-center">
      <v-img
        src="../assets/images/Maopao4-removebg.png"
        alt="Maopao Logo"
        max-width="250"
      />
    </div>

    <div :class="themeClass" class="index-page">
      <h1 class="font-sriracha">@PAY ยินดีต้อนรับ </h1>
      <p>The current theme is: <strong>{{ appTheme }}</strong></p>
    </div>
    
    <div class="max-w-5xl mx-auto mt-5 px-5">
      <h3 class="text-xl font-bold">
        Authentication Overview
      </h3>
      <p class="text-sm">
        See all available authentication & session information below.
      </p>
      <div class="">
        <pre v-if="status"><span>Status:</span> {{ status }}</pre>
        <pre v-if="data"><span>Data:</span> {{ data }}</pre>
        <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
        <!-- <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre> -->
      </div>

    </div>    
  </template>
  
  <script setup>
    const { data, status, getCsrfToken, getProviders } = useAuth()

    const providers = await getProviders()
    const csrfToken = await getCsrfToken()
    definePageMeta({
      auth:false,
      // layout:'admin'
    })
    // App theme (light/dark) ที่คุณควบคุมเอง
    const appTheme = useAppTheme()
    
    // Vuetify theme instance (ใช้สำหรับดึงสีจาก Vuetify theme)
    const { theme } = useTheme()
    
    // ดึง primary background & text จาก Vuetify theme ปัจจุบัน
    const themeClass = computed(() => {
      return appTheme.value === 'dark'
        ? 'bg-grey-darken-4 text-white'
        : 'bg-grey-lighten-5 text-black'
    })

    // const route = useRoute()
    // const router = useRouter()
    // onMounted(() => {
    //   const liffState = route.query['liff.state']
    //   if (typeof liffState === 'string') {
    //     router.replace(liffState)
    //   }
    // })        

  </script>
  
  <style scoped>
  .index-page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    transition: background-color 0.3s, color 0.3s;
  }
  </style>
  