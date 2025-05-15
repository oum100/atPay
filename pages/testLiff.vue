<!-- pages/index.vue -->
<template>
    <v-container>
      <v-btn @click="initLiff">Login with LINE</v-btn>
  
      <div v-if="user">
        <h3>Welcome, {{ user.displayName }}</h3>
        <img :src="user.pictureUrl" width="100" />
        <p>User ID: {{ user.userId }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
  
      <div v-if="error">Error: {{ error }}</div>
    </v-container>
  </template>
  
  <script setup lang="ts">
    definePageMeta({
        auth:false,
        layout:'blank'
    })
  const { initLiff, user, error } = useLiff()
  
  onMounted(() => {
    initLiff()
  })
  </script>
  