import { DefaultSession } from 'next-auth'
// import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    uuid: string
  }  

  interface Session {
    user: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
      provider?: string,    
      language: string | 'en'
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    email?: string | null
    name?: string | null
    picture?: string | null
    provider?: string,
    language?: string | 'en'
  }
}