import z from "zod";

export const signUpInput = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
})

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})


export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>

