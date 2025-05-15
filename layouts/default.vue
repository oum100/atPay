<template>
  <v-app>
    <!-- 🔵 Fixed App Bar -->
    <v-app-bar color="primary" dark fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title class="font-kanit text-h4">atPAY</v-app-bar-title>
      <v-spacer />

      <div v-if="status === 'authenticated'">
        <v-btn prepend-icon="mdi-logout" variant="text" @click="signOut({ callbackUrl: '/' })">SignOut</v-btn>
      </div>
      <div v-else>
        <v-btn prepend-icon="mdi-login" variant="text" to="/auth/signin">SignIn</v-btn>
      </div>

      <v-btn icon @click="toggleTheme">
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>



    </v-app-bar>

    <!-- 🔵 Manual layout starts here -->
 
      <!-- ⬅️ Drawer on the left -->
      <DrawerMenu :drawer="drawer"/>
      <!-- <v-navigation-drawer 
        app
        v-model="drawer" 
        :permanent="permanent"
        :temporary="!permanent"
        >
        <v-list>
          <v-list-item title="Dashboard" />
          <v-list-item title="Settings" />
        </v-list>
      </v-navigation-drawer> -->

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
  import DrawerMenu from '~/components/DrawerMenu.vue'
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
  const {status,data,signIn, signOut } = useAuth()

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
