import { UserServices } from "../services/user"
import { UserSchemas } from "../schemas/user"
import { Resources } from "../interfaces/resources"
import { User } from "@prisma/client"
import { FastifyReply } from "fastify"
import { RequestData } from "../types/resource"

export class UserResources extends Resources<User> {
    constructor(
        private service: UserServices = new UserServices(),
        private schema: UserSchemas = new UserSchemas()
    ) {
        super()

        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
        this.get = this.get.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    public async create(
        request: RequestData<{
            name: string
            id: string
            email: string
            created_at: Date
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const body = request.body
        const newUser = await this.service.createUser(body)
        reply.status(201).send(newUser)
    }

    public async list(): Promise<User[]> {
        const users = await this.service.getUsers()
        return users
    }

    public async get(
        request: RequestData<{
            name: string
            id: string
            email: string
            created_at: Date
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            const user = await this.ensureUserExists(id, reply)
            reply.status(200).send(this.schema.response.parse(user))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async update(
        request: RequestData<{
            name: string
            id: string
            email: string
            created_at: Date
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        const body = request.body
        try {
            await this.ensureUserExists(id, reply)
            if (Object.keys(body).length === 0) {
                reply.status(400).send({ message: "Empty body." })
                return
            }

            const updatedUser = await this.service.updateUser(id, body)
            reply.status(200).send(updatedUser)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async delete(
        request: RequestData<{
            id: string
            name: string
            email: string
            created_at: Date
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            await this.ensureUserExists(id, reply)
            await this.service.deleteUserByID(id)
            reply
                .status(200)
                .send({ message: `User {${id}} successfully deleted.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    private async ensureUserExists(id: string, reply: FastifyReply) {
        const user = await this.service.getUserByID(id)
        if (!user) {
            reply.status(404).send({ message: "User not found." })
            return null
        }
        return user
    }
}
