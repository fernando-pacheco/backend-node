import { FastifySchema } from "fastify"
import { DocsSchemas } from "../interfaces/docs-schemas"
import { ProductSchemas } from "../schemas/product"
import { MessageResponses } from "../utils/message-responses"

export class ProductDocsSchemas extends DocsSchemas {
    constructor(private schema: ProductSchemas = new ProductSchemas()) {
        super()
    }

    public get create(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Products"],
                description: "Create a new product",
                body: this.schema.create,
                response: {
                    201: this.schema.response,
                    ...MessageResponses([400, 500]),
                },
            },
        }
    }

    public get list(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Products"],
                description: "List products",
                response: {
                    200: this.schema.listResponse,
                    ...MessageResponses([500]),
                },
            },
        }
    }

    public get get(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Products"],
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
                tags: ["Products"],
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
                tags: ["Products"],
                description: "Delete product by ID",
                params: this.schema.idParams,
                response: {
                    ...MessageResponses([200, 400, 404, 500]),
                },
            },
        }
    }
}
