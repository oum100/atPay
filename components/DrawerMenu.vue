<template>
  <v-navigation-drawer
    app
    :model-value="drawer"
    :permanent="permanent"
    :temporary="!permanent"
    @update:model-value="emit('update:drawer', $event)"
  >
    <v-list dense nav density="compact">
      <template v-for="(item, index) in filteredMenu" :key="index">

        <v-list-group v-if="item.children && item.children.length" :value="isGroupActive(item)">
          <template v-slot:activator="{props}">
            <v-list-item v-bind="props" class="text-subtitle-1">
              <template #prepend>
                <v-icon>{{ item.icon }}</v-icon>
              </template>
              <v-list-item-title class="text-subtitle-1">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item v-for="(child, cIndex) in item.children" :key="cIndex" :to="child.to" link>
            <template #prepend>
              <v-icon>{{ child.icon }}</v-icon>
            </template>
            <v-list-item-title class="text-subtitle-1">{{ child.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else :to="item.to" link>
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-subtitle-1">{{ item.title }}</v-list-item-title>
        </v-list-item>

      </template>
    </v-list>
  </v-navigation-drawer>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import menuData from '@/assets/menu.json'
  import {menuItems} from '@/types/menu'
  import type { MenuItem } from '@/types/menu'
  
  const props = defineProps({
      drawer: {
      type: Boolean,
      required: true
      },
      permanent: {
      type: Boolean,
      default: false
      }
  })
  
  const emit = defineEmits(['update:drawer'])
  
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
  