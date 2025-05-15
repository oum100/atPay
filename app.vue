<!-- 📄 app.vue -->
<template>
  <v-app>
    <v-theme-provider :theme="theme">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </v-theme-provider>
  </v-app>
</template>

<script setup lang="ts">
const theme = useAppTheme()
</script>
