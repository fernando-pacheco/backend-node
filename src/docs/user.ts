import { DocsSchemas } from "../interfaces/docs-schemas"
import { UserSchemas } from "../schemas/user"
import { MessageResponses } from "../utils/message-responses"

export class UserDocsSchemas extends DocsSchemas {
    constructor(private schema: UserSchemas = new UserSchemas()) {
        super()
    }

    public get create() {
        return {
            schema: {
                tags: ["Users"],
                description: "Create a new user",
                body: this.schema.create,
                response: {
                    201: this.schema.response,
                    ...MessageResponses([400, 500]),
                },
            },
        }
    }

    public get list() {
        return {
            schema: {
                tags: ["Users"],
                description: "List users",
                responses: {
                    200: this.schema.listResponse,
                    ...MessageResponses([500]),
                },
            },
        }
    }

    public get get() {
        return {
            schema: {
                tags: ["Users"],
                description: "Get user by ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.response,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get update() {
        return {
            schema: {
                tags: ["Users"],
                description: "Update user by ID",
                params: this.schema.idParams,
                body: this.schema.update,
                response: {
                    200: this.schema.response,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get delete() {
        return {
            schema: {
                tags: ["Users"],
                description: "Delete user by ID",
                params: this.schema.idParams,
                response: {
                    ...MessageResponses([200, 400, 404, 500]),
                },
            },
        }
    }
}
