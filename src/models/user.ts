import { PrismaClient } from "@prisma/client"
import { UserProps } from "../interfaces/user"

const prisma = new PrismaClient()

const UserModel = prisma.user

export async function getUsers(): Promise<UserProps[]> {
    const users = await UserModel.findMany()
    return users
}

export async function createUser(body: UserProps): Promise<UserProps> {
    const user = await UserModel.create({
        data: {
            name: body.name,
            email: body.email,
        },
    })

    return user
}

export async function updateUser(
    id: string,
    body: UserProps
): Promise<UserProps> {
    const user = await UserModel.update({
        where: { id },
        data: {
            name: body.name,
            email: body.email,
        },
    })

    return user
}

export async function getUserByID(id: string): Promise<UserProps | null> {
    const user = await UserModel.findUnique({
        where: { id },
    })

    return user
}

export async function deleteUserByID(id: string) {
    await UserModel.delete({
        where: { id },
    })
}
