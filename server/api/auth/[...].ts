import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '~/lib/prisma'
// import prisma from '#prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import LineProvider from "next-auth/providers/line"
import bcrypt from 'bcryptjs'


export default NuxtAuthHandler({
    adapter: PrismaAdapter(prisma) as any,
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/auth/signin',       // หน้า login
        error: '/auth/error', // หน้า error ตอน login fail
      },    
    session: {
    //   strategy: 'database', // ใช้ session บน database (Session Table ใน Prisma)
      strategy: 'jwt', // ใช้ session บน database (Session Table ใน Prisma)
    },

    providers:[
        // Social Login Provider เช่น Google
        // @ts-expect-error
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    
        // @ts-expect-error
        GitHubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),        

        // @ts-expect-error
        LineProvider.default({
            clientId: process.env.LINE_CLIENT_ID!,
            clientSecret: process.env.LINE_CLIENT_SECRET!,

            issuer: 'https://access.line.me',
            wellKnown: 'https://access.line.me/.well-known/openid-configuration',
            authorization: {
              params: {
                scope: 'openid profile email',
                prompt: 'consent'
              }
            },
            idToken: true,
            profile(profile:any) {
              return {
                id: profile.sub,
                name: profile.name ?? profile.nickname,
                email: profile.email,
                image: profile.picture
              }
            }            
        }),   

        // Credentials Login (email/password)
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials:any) {
            const user = await prisma.user.findUnique({
                where: { email: credentials?.email },
            })
    
            if (!user || !user.password) {
                return null
            }
    
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (!isValid) return null
    
            return user
            },
        }),        
    ],

    callbacks: {
      /**
       * Called when user tries to sign in via social provider.
      */

      async signIn({user,account,profile, email, credentials}) {
        if(account?.provider !== 'credentials'){
          const existingUser = await prisma.user.findUnique({where:{email:profile?.email} })

          if(existingUser){
            const existingAccount = await prisma.account.findFirst({
              where: {
                provider: account?.provider,
                providerAccountId: account?.providerAccountId
              }
            })

            if (!existingAccount) {
              await prisma.account.create({
                data: {
                  userId: existingUser.id, // ← หรือ .id ถ้าคุณใช้ id
                  provider: account?.provider as string,
                  providerAccountId: account?.providerAccountId as string,
                  type: account?.type as string,
                  access_token: account?.access_token as string,
                  refresh_token: account?.refresh_token as string,
                  id_token: account?.id_token as string,
                  expires_at: account?.expires_at as number,
                  scope: account?.scope,
                  token_type: account?.token_type,
                  session_state: account?.session_state
                }
              })
            }

            // เพิ่ม appKey ถ้ายังไม่มี
            return true
          }
        }
        return true; // Example: Allow sign-in
      },

      async session({session,token}){
          session.user = {
            id: token.id!,
            name: token.name,
            email: token.email,
            image: token.picture,
            provider: token.provider
          }
          // console.log('Session: ',session)
          return session
      },    

      async jwt({token,user,account,profile}){
        if(user){
          token.id = user.id || user.uuid  // ใช้ uuid จาก Prisma เป็นหลัก
          token.email = user.email
          token.name = user.name
          token.picture = user.image
          token.provider = account?.provider
        }
        // console.log("Jwt: ",token)
        return token
      },      
      
    }    

})
