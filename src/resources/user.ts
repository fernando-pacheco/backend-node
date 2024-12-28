import { UserServices } from "../service/user"
import { UserSchemas } from "../schemas/user"
import { Resources } from "../interfaces/resources"
import { User } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"

export class UserResources extends Resources<User> {
    constructor(
        private service: UserServices = new UserServices(),
        private schema: UserSchemas = new UserSchemas()
    ) {
        super()
    }

    create = async (
        request: FastifyRequest<{ Body: User }>,
        reply: FastifyReply
    ) => {
        const body = request.body
        const newUser = await this.service.createUser(body)
        reply.status(201).send(newUser)
    }

    list = async () => {
        const users = await this.service.getUsers()
        return users
    }

    get = async (
        request: FastifyRequest<{ Params: User }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            const user = await this.ensureUserExists(id, reply)
            reply.status(200).send(this.schema.response.parse(user))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    update = async (
        request: FastifyRequest<{ Body: User; Params: User }>,
        reply: FastifyReply
    ) => {
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

    delete = async (
        request: FastifyRequest<{ Params: User }>,
        reply: FastifyReply
    ) => {
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

    private handleError(reply: FastifyReply, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
