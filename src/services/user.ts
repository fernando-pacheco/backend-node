import { PrismaClient, User } from "@prisma/client"

export class UserServices {
    private UserModel: PrismaClient["user"]

    constructor(private prisma: PrismaClient = new PrismaClient()) {
        this.prisma = prisma
        this.UserModel = this.prisma.user
    }

    async createUser(body: User): Promise<User> {
        const user = await this.UserModel.create({
            data: {
                name: body.name,
                email: body.email,
            },
        })

        return user
    }

    async getUsers(): Promise<User[]> {
        const users = await this.UserModel.findMany()
        return users
    }

    async getUserByID(id: string): Promise<User | null> {
        const user = await this.UserModel.findUnique({
            where: { id },
        })

        return user
    }

    async updateUser(id: string, body: User): Promise<User> {
        const user = await this.UserModel.update({
            where: { id },
            data: {
                name: body.name,
                email: body.email,
            },
        })

        return user
    }

    async deleteUserByID(id: string): Promise<void> {
        await this.UserModel.delete({
            where: { id },
        })
    }
}
