import { z } from 'zod'


export const userSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    contact_phone: z.string(),
    password: z.string(),
    role: z.string().optional()
    
})

export const registerUserSchema = z.object({
    full_name: z.string(),
    email: z.string(),
    contact_phone: z.string(),
    // password: z.string(),
    role: z.string().optional()
})
export const loginUserSchema = z.object({
    email: z.string(),
    password: z.string()
})

