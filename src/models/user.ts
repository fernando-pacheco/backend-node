import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface User {
    id: string
    name: string
    email: string
    created_at: Date
}

const UserModel = prisma.user

export async function getUsers(): Promise<User[]> {
    const users = await UserModel.findMany()
    return users
}

export async function createUser(body: User): Promise<User> {
    const user = await UserModel.create({
        data: {
            name: body.name,
            email: body.email,
        },
    })

    return user
}

export async function updateUser(id: string, body: User): Promise<User> {
    const user = await UserModel.update({
        where: { id },
        data: {
            name: body.name,
            email: body.email,
        },
    })

    return user
}

export async function getUserByID(id: string): Promise<User | null> {
    const user = await UserModel.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
        },
    })

    return user
}

export async function deleteUserByID(id: string) {
    await UserModel.delete({
        where: { id },
    })
}
