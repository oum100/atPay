// stores/useLocaleStore.ts
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({locale: 'en'}),

  actions: {
    setLocale(lang: 'en' | 'th') {
      this.locale = lang
      if (import.meta.client) localStorage.setItem('locale', lang)
       useCookie('locale').value = lang //update cookie

    //   const { locale } = useI18n()
    //   locale.value = lang
    }
  }
})


// import { defineStore } from 'pinia'
// import { useI18n } from 'vue-i18n'

// export const useLocaleStore = defineStore('locale', {
//   state: () => ({ locale: 'en' }),
//   actions: {
//     setLocale(lang: 'en' | 'th') {
//       this.locale = lang

//       // update cookie
//       useCookie('locale').value = lang

//       // update i18n
//       const i18n = useI18n()
//       i18n.locale.value = lang
//     }
//   }
// })
