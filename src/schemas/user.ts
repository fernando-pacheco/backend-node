import { z } from "zod"

export const UserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
})

export const CreateUserRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
})

export const UsersListResponseSchema = z.array(UserResponseSchema)
