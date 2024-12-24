import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export interface User {
    id: string
    name: string
    email: string
    created_at: Date
}

export const UserModel = prisma.user
