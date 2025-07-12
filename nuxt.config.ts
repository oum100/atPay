// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["@/assets/main.css"],
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      authSecret: process.env.NUXT_AUTH_SECRET || "",

      github_clientId: process.env.GITHUB_CLIENT_ID || "",
      github_clientSecret: process.env.GITHUB_CLIENT_SECRET || "",

      google_clientId: process.env.GOOGLE_CLIENT_ID || "",
      google_clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

      line_channel_access_token: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
      line_liff_id: process.env.LINE_LIFF_ID || "",
    },
  },
  vite: {
    server: {
      allowedHosts: [".ngrok-free.app"], // or specific subdomain
    },
  },
  modules: [
    "vuetify-nuxt-module",
    "@prisma/nuxt",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: "mdi",
      },
    },
  },

  auth: {
    originEnvKey: process.env.AUTH_ORIGIN,
    baseURL: process.env.AUTH_ORIGIN + "/api/auth",
    provider: {
      type: "authjs",
      trustHost: false,
      addDefaultCallbackUrl: true,
    },
    globalAppMiddleware: true,
  },

  
});