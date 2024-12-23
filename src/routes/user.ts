import z from "zod"
import {
    CreateUserRequestSchema,
    UserResponseSchema,
    UsersListResponseSchema,
} from "../schemas/user"
import { createUser, getUserByID, getUsers } from "../services/user"
import { FastifyTypedInstance } from "../types"

export async function routes(app: FastifyTypedInstance) {
    app.get(
        "/users",
        {
            schema: {
                tags: ["Users"],
                description: "List users",
                response: {
                    200: UsersListResponseSchema,
                },
            },
        },
        async () => {
            const users = await getUsers()
            return users
        }
    )

    app.post(
        "/users",
        {
            schema: {
                tags: ["Users"],
                description: "Create a new user",
                body: CreateUserRequestSchema,
                response: {
                    201: UserResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { name, email } = request.body
            const newUser = await createUser(name, email)
            reply.status(201).send(newUser)
        }
    )

    app.get(
        "/users/:id",
        {
            schema: {
                tags: ["Users"],
                description: "Get user by ID",
                params: z.object({
                    id: z.string().min(1, "User ID is required"),
                }),
                response: {
                    200: UserResponseSchema,
                    404: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params

            try {
                const user = getUserByID(id)

                if (!user) {
                    reply.status(404).send({ message: "User not found." })
                    return
                }

                const validatedResponse = UserResponseSchema.parse(user)
                reply.status(200).send(validatedResponse)
            } catch (error) {
                reply.status(500).send({ message: "Internal server Error" })
            }
        }
    )
}
