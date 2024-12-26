import {
    UserCreateSchema,
    UserIDParamsSchema,
    UserResponseSchema,
    UsersListResponseSchema,
    UserUpdateSchema,
} from "../schemas/user"
import { MessageResponseSchema } from "../schemas/message"

export const UserListDocSchema = {
    schema: {
        tags: ["Users"],
        description: "List users",
        response: {
            200: UsersListResponseSchema,
            500: MessageResponseSchema,
        },
    },
}

export const UserCreateDocSchema = {
    schema: {
        tags: ["Users"],
        description: "Create a new user",
        body: UserCreateSchema,
        response: {
            201: UserResponseSchema,
            500: MessageResponseSchema,
        },
    },
}

export const UserGetDocSchema = {
    schema: {
        tags: ["Users"],
        description: "Get user by ID",
        params: UserIDParamsSchema,
        response: {
            200: UserResponseSchema,
            404: MessageResponseSchema,
            500: MessageResponseSchema,
        },
    },
}

export const UserPutDocSchema = {
    schema: {
        tags: ["Users"],
        description: "Put user, selected by ID",
        params: UserIDParamsSchema,
        body: UserUpdateSchema,
        response: {
            200: UserResponseSchema,
            400: MessageResponseSchema,
            404: MessageResponseSchema,
            500: MessageResponseSchema,
        },
    },
}

export const UserDeleteDocSchema = {
    schema: {
        tags: ["Users"],
        description: "Delete user by ID",
        params: UserIDParamsSchema,
        response: {
            200: MessageResponseSchema,
            404: MessageResponseSchema,
            500: MessageResponseSchema,
        },
    },
}
