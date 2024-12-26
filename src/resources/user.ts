import {
    createUser,
    deleteUserByID,
    getUserByID,
    getUsers,
    updateUser,
} from "../models/user"
import { UserResponseSchema } from "../schemas/user"

export async function UserListResource() {
    const users = await getUsers()
    return users
}

export async function UserCreateResource(request: any, reply: any) {
    const body = request.body
    const newUser = await createUser(body)
    reply.status(201).send(newUser)
}

export async function UserGetResource(request: any, reply: any) {
    const { id } = request.params
    try {
        const user = await getUserByID(id)
        if (!user) {
            reply.status(404).send({ message: "User not found." })
            return
        }
        reply.status(200).send(UserResponseSchema.parse(user))
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}

export async function UserPutResource(request: any, reply: any) {
    const { id } = request.params
    const body = request.body
    try {
        const user = await getUserByID(id)

        if (!user) {
            reply.status(404).send({ message: "User not found." })
            return
        }

        if (Object.keys(body).length === 0) {
            reply.status(400).send({ message: "Empty body." })
            return
        }

        const updatedUser = await updateUser(id, body)
        reply.status(200).send(updatedUser)
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}

export async function UserDeleteResource(request: any, reply: any) {
    const { id } = request.params
    try {
        const user = await getUserByID(id)
        if (!user) {
            reply.status(404).send({ message: "User not found." })
            return
        }

        await deleteUserByID(id)

        reply
            .status(200)
            .send({ message: `User {${id}} successfully deleted.` })
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}
