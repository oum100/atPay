<template>
  <v-app>
    <!-- 🔵 Fixed App Bar -->
    <v-app-bar color="primary" dark fixed>
      <v-app-bar-nav-icon @click="toggleDrawer" variant="text"/>
      <v-app-bar-title class="font-kanit text-h4">atPAY</v-app-bar-title>

      <!-- <v-spacer /> -->
      <!-- AppBar Menu -->
      <!-- <v-btn variant="plain" to="/" v-if="language=='EN'">Product</v-btn>
      <v-btn variant="plain" to="/" v-if="language=='TH'">สินค้า</v-btn>
      <v-btn variant="plain" to="/">Services</v-btn>
      <v-btn variant="plain" to="/">Customer</v-btn>
      <v-btn variant="plain" to="/">About Us</v-btn>
      <v-btn variant="plain" to="/">Contact Us</v-btn> -->
      <AppBarMenu/>
      <!-- End of AppBar Menu -->

      <v-spacer />

      <div v-if="status === 'authenticated'">
        <v-btn prepend-icon="mdi-logout" variant="plain" @click="signOut({ callbackUrl: '/' })">SignOut</v-btn>
      </div>
      <div v-else>
        <v-btn prepend-icon="mdi-login" variant="plain" to="/auth/signin">SignIn</v-btn>
        <v-btn prepend-icon="mdi-account-plus" variant="plain" to="/auth/signup">SignUp</v-btn>
      </div>

      <v-btn icon @click="toggleTheme">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>

    </v-app-bar>
 
    <!-- ⬅️ Drawer on the left -->
    <DrawerMenu :drawer="drawer"/>

      <!-- 🟩 Main content auto expands -->
    <v-main app class="custom-main" :class="{ 'drawer-open': drawer && mdAndUp }">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>


    <!-- 🔵 Footer -->
    <v-footer app class="text-center">
      <v-col cols="12">&copy; {{ new Date().getFullYear() }} Maopao</v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
  import DrawerMenu from '@@/components/DrawerMenu.vue'
  import { useAuthStore } from '@@/stores/auth'
  import type { MenuItem, SupportedLang } from '@@/types/appBarMenu'
  import {menuItems} from '@@/types/appBarMenu'
  import AppBarMenu from '@@/components/AppBarMenu.vue'

  const drawer = ref(false)
  const theme = useAppTheme()

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const themeIcon = computed(() =>
    theme.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
  )

  // ฟังก์ชันสลับการแสดง Drawer
  const toggleDrawer = () => {
    drawer.value = !drawer.value
  }

  const permanent = ref(false)        // ❌ ไม่ permanent ตอน mounted
  const { mdAndUp } = useDisplay()    //
  const {status, signOut } = useAuth()

  //Language Setting
  const authStore = useAuthStore()
  const supportedLangs: SupportedLang[] = ['EN', 'TH', 'JP', 'VN']
  const language = computed<SupportedLang>(() => {
    const lang = authStore.user?.language?.toUpperCase()
    return supportedLangs.includes(lang as SupportedLang)
      ? (lang as SupportedLang)
      : 'EN' // fallback
  })


  watch(drawer, (newVal) => {
      if (newVal && mdAndUp.value) {
          permanent.value = true          // ✅ ค่อยเปิด permanent เมื่อกดเปิด drawer
      }
      if (!newVal) {
          permanent.value = false         // ❌ ปิด permanent เมื่อ drawer ปิด
      }
  })

  //Start Monitor session
  const {startWatching} = useSessionWatcher()
  watchEffect(() => {
    if (status.value === 'authenticated') {
      startWatching()
    }
  })
  //End of Monitor session

</script>

<style scoped>
.mt-app-bar {
  margin-top: 64px; /* default v-app-bar height */
}

.custom-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 64px; /* manually offset for app-bar height */
  padding-left: 0;
  transition: padding-left 0.3s ease;
}

/* ดัน content ตอน drawer เปิด */
@media (min-width: 960px) {
  .custom-main.drawer-open {
    padding-left: 240px; /* drawer width */
  }
}
</style>
