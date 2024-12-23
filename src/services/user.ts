import { UserModel } from "../models/user"
import { User } from "../models/user"

export async function getUsers(): Promise<User[]> {
    const users = await UserModel.findMany()
    return users
}

export async function createUser(name: string, email: string): Promise<User> {
    const user = await UserModel.create({
        data: {
            name,
            email,
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
        },
    })

    return user
}
