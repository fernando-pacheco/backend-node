import { FastifySchema } from "fastify"
import { DocsSchemas } from "../interfaces/docs-schemas"
import { ItemCartSchemas } from "../schemas/item-cart"
import { MessageResponses } from "../utils/message-responses"

export class ItemCartDocsSchemas extends DocsSchemas {
    constructor(private schema: ItemCartSchemas = new ItemCartSchemas()) {
        super()
    }

    public get create(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["ItemsCart"],
                description: "Create a new item cart",
                body: this.schema.create,
                response: {
                    201: this.schema.response,
                    ...MessageResponses([400, 500]),
                },
            },
        }
    }

    public get get(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["ItemsCart"],
                description: "Get product by ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.response,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get update(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["ItemsCart"],
                description: "Update product by ID",
                body: this.schema.update,
                params: this.schema.idParams,
                response: {
                    200: this.schema.response,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get delete(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["ItemsCart"],
                description: "Delete product by ID",
                params: this.schema.idParams,
                response: {
                    ...MessageResponses([200, 400, 404, 500]),
                },
            },
        }
    }
}
