import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export interface User {
    id: string
    name: string
    email: string
}

export const UserModel = prisma.user
