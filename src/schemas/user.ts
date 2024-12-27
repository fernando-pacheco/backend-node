import { z } from "zod"

export const UserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date().optional(),
})

export const UsersListResponseSchema = z.array(UserResponseSchema)

export const UserCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
})

export const UserUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
})

export const UserIDParamsSchema = z.object({
    id: z.string().min(1, "User ID is required"),
})
