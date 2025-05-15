<!-- /layouts/liffpos.vue -->
<script setup lang="ts">
    import liff from '@line/liff'
    import { onMounted, ref } from 'vue'

    const initialized = ref(false)
    const error = ref('')

    onMounted(async () => {
    try {
        const liff_id = useRuntimeConfig().line_liff_id
        console.log("liff_id: ",liff_id)
        await liff.init({ liffId:liff_id}) // Replace with actual LIFF ID
        initialized.value = true
    } catch (e: any) {
        console.error('LIFF Init Error:', e)
        error.value = e.message || 'Failed to initialize LIFF.'
    }
    })
</script>

<template>
  <v-app>
    <v-container>
      <v-alert v-if="error" type="error">{{ error }}</v-alert>
      <slot v-else-if="initialized" />
      <v-progress-circular v-else indeterminate color="primary" />
    </v-container>
  </v-app>
</template>
