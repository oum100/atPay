import { H3Event } from 'h3';
import User from '@/types/auth'
import bcrypt from 'bcryptjs'
import {validateNewUser} from '@/models/user'
import prisma from "~/lib/prisma";

export default defineEventHandler( async(event:H3Event)=>{
    const body = await readBody(event) || {}

    const {error} = validateNewUser(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: 'Invalid user data'
        })
    }

    const foundUser = await prisma.user.findUnique({
        where:{email:body.email}
    })

    if(foundUser){
         throw createError({
            statusCode:500,
            statusMessage:'User already existed'
        })       
    }

    try{
        const newUser = await prisma.user.create({
            data:{
                email: body.email,
                name: body.name,
                password: await bcrypt.hash(body.password, bcrypt.genSaltSync(10)),
            }
        })

        return {
            success: true,
            statusMessage: 'New user created complete',
            data:{
                ...newUser,
                password:undefined
            }
        }
    }catch(err){
        throw createError({
            statusCode: 500,
            statusMessage: 'Register failed, please try again'
        })
    }
})