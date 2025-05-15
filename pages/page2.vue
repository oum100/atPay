<!-- 📄 layouts/default.vue -->
<template>
    <v-app>
        <!-- App Bar -->
        <v-app-bar app color="grey-darken-3" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-app-bar-title>Wireframe Header</v-app-bar-title>
        </v-app-bar>

        <!-- Navigation Drawer -->
        <v-navigation-drawer app v-model="drawer" :permanent="permanent" :temporary="!permanent">
            <v-list>
                <v-list-item title="Menu Item 1" />
                <v-list-item title="Menu Item 2" />
            </v-list>
        </v-navigation-drawer>

        <!-- Main Content Area -->
        <v-main app>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" class="border-box h-300 mb-4">Main Content Block 1</v-col>
                    <v-col cols="6" class="border-box h-200">Left Panel</v-col>
                    <v-col cols="6" class="border-box h-200">Right Panel</v-col>
                </v-row>
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-footer app color="grey-darken-2" dark>
            <v-col class="text-center py-2" cols="12">
                Wireframe Footer
            </v-col>
        </v-footer>
    </v-app>
</template>

<script setup>
definePageMeta({
    auth: false,
    layout: 'blank'
})
const drawer = ref(false)
const permanent = ref(false)        // ❌ ไม่ permanent ตอน mounted

const { mdAndUp } = useDisplay()

watch(drawer, (newVal) => {
    if (newVal && mdAndUp.value) {
        permanent.value = true          // ✅ ค่อยเปิด permanent เมื่อกดเปิด drawer
    }
    if (!newVal) {
        permanent.value = false         // ❌ ปิด permanent เมื่อ drawer ปิด
    }
})



</script>

<style scoped>
.border-box {
    border: 2px dashed #9e9e9e;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}

.h-300 {
    height: 300px;
}

.h-200 {
    height: 200px;
}
</style>