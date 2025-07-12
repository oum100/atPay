<template>
    <div v-for="(item, index) in filteredMenu" :key="index" :value="isGroupActive(item)">
        <!-- Menu have child -->
        <v-menu v-if="item.children && item.children.length" open-on-hover>
            <template  v-slot:activator="{ props }">
                <v-btn variant="plain" v-bind="props">
                    <template #prepend>
                        <v-icon>{{ item.icon }}</v-icon>
                    </template>
                    {{ item.title[language] }}
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for= "(child, cIndex) in item.children" :key="cIndex" :value="cIndex" :to="child.to" link>
                    <template #prepend>
                        <v-icon>{{ child.icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ child.title[language] }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- Menu have no child -->
        <v-menu v-else>
            <template  v-slot:activator="{ props }">
                <v-btn variant="plain" v-bind="props" :to="item.to" link>
                    <template #prepend>
                        <v-icon>{{ item.icon }}</v-icon>
                    </template>
                    {{ item.title[language] }}
                </v-btn>
            </template>
        </v-menu>
    </div>

</template>

<script setup lang="ts">
    import type { MenuItem, SupportedLang } from '@@/types/appBarMenu'
    import { menuItems } from '@@/types/appBarMenu';
    import { useAuthStore } from '@/stores/auth'

    const props = defineProps({
    })

    const authStore = useAuthStore()
    const route = useRoute()

    // ฟังก์ชันตรวจสอบสิทธิ์การเข้าถึงเมนู
    const hasAccess = (roles: string[] = []) => {
        if (!roles || roles.length === 0) return true
        if (!authStore.user || !authStore.user.roles) return false
        return roles.some(role =>
            authStore.user!.roles?.some(userRole => userRole.role === role)
        )
    }

    //Language Setting
    const supportedLangs: SupportedLang[] = ['EN', 'TH', 'JP', 'VN']
    const language = computed<SupportedLang>(() => {
        const lang = authStore.user?.language?.toUpperCase()
        return supportedLangs.includes(lang as SupportedLang)
        ? (lang as SupportedLang)
        : 'EN' // fallback
    })    

    // กรองเมนูตามสิทธิ์ของผู้ใช้
    const filteredMenu = computed(() => {
        const filterMenu = (items: MenuItem[]): MenuItem[] => {
        return items
            .map(item => {      
            // ตรวจสอบสิทธิ์ของเมนูหลัก
            if (!hasAccess(item.roles)) {
                return null;
            }

            // หากมีเมนูย่อย ให้กรองเมนูย่อยตามสิทธิ์
            if (item.children && item.children.length) {
                const filteredChildren = filterMenu(item.children);
                if (filteredChildren.length > 0) {
                return { ...item, children: filteredChildren };
                }
                return null;
            }

            // เมนูหลักที่ไม่มีเมนูย่อยและผู้ใช้มีสิทธิ์เข้าถึง
            return item;
            })
            .filter((item): item is MenuItem => item !== null);
        };
        return filterMenu(menuItems);
    });

    
    // ฟังก์ชันตรวจสอบว่า group ควรเปิดหรือไม่
    const isGroupActive = (item: any) => {
        return item.children?.some((child: any) => child.to === route.path)
    }    
    

</script>