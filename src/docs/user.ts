import {
    UserCreateSchema,
    UserIDParamsSchema,
    UserResponseSchema,
    UsersListResponseSchema,
    UserUpdateSchema,
} from "../schemas/user"
import { MessageResponseSchema } from "../schemas/message"
import { MessageResponses } from "../utils/message-responses"

export const UserDocsSchemas = {
    create: {
        schema: {
            tags: ["Users"],
            description: "Create a new user",
            body: UserCreateSchema,
            response: {
                201: UserResponseSchema,
                ...MessageResponses([500]),
            },
        },
    },
    list: {
        schema: {
            tags: ["Users"],
            description: "List users",
            response: {
                200: UsersListResponseSchema,
                ...MessageResponses([500]),
            },
        },
    },
    get: {
        schema: {
            tags: ["Users"],
            description: "Get user by ID",
            params: UserIDParamsSchema,
            response: {
                200: UserResponseSchema,
                ...MessageResponses([404, 500]),
            },
        },
    },
    update: {
        schema: {
            tags: ["Users"],
            description: "Put user, selected by ID",
            params: UserIDParamsSchema,
            body: UserUpdateSchema,
            response: {
                200: UserResponseSchema,
                ...MessageResponses([400, 404, 500]),
            },
        },
    },
    delete: {
        schema: {
            tags: ["Users"],
            description: "Delete user by ID",
            params: UserIDParamsSchema,
            response: {
                ...MessageResponses([200, 404, 500]),
            },
        },
    },
}
