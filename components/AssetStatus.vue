<template>
  <div class="ml-2">
    <v-chip
      :color="statusLabel.color"
      variant="flat"
      class="font-weight-bold"
      density="compact"
      style="position: absolute; top:22%; left:50%; z-index: 1; width:180px; transform: translate(-50%, -50%); justify-content: center;"
    >
      <span>{{ statusLabel.enText }}</span>&nbsp;
      <span>({{ statusLabel.translatedText }})</span>
    </v-chip>
  </div>
</template>


<script setup lang="ts">
    import { computed } from 'vue'

const props = defineProps<{
  status: string
  language?: 'EN' | 'TH' | 'CH' | 'VN' | 'JP'
}>()

type LangCode = 'EN' | 'TH' | 'CH' | 'VN' | 'JP'
type StatusKey = 'AVAILABLE' | 'RESERVE' | 'BUSY' | 'OFFLINE'

const translations = {
  AVAILABLE: {
    EN: 'AVAILABLE',
    TH: 'ว่าง',
    CH: '可用',
    VN: 'Sẵn sàng',
    JP: '使用可能',
  },
  RESERVE: {
    EN: 'RESERVE',
    TH: 'จอง',
    CH: '保留',
    VN: 'Đặt trước',
    JP: '予約中',
  },
  BUSY: {
    EN: 'BUSY',
    TH: 'กำลังทำงาน',
    CH: '使用中',
    VN: 'Đang sử dụng',
    JP: '使用中',
  },
  OFFLINE: {
    EN: 'OFFLINE',
    TH: 'หยุดให้บริการ',
    CH: '暂停服务',
    VN: 'Ngừng phục vụ',
    JP: '使用不可',
  },
} as const

const colors: Record<StatusKey, string> = {
  AVAILABLE: '#20F504',
  RESERVE: 'orange',
  BUSY: 'red',
  OFFLINE: 'grey',
}

const statusLabel = computed(() => {
  const lang: LangCode = props.language || 'EN'
  const key = props.status as StatusKey

  const fallbackText = props.status.toUpperCase()

  const t = translations[key] ?? {}
  return {
    color: colors[key] ?? 'grey',
    enText: t.EN ?? fallbackText,
    translatedText: t[lang] ?? fallbackText,
  }
})


</script>


