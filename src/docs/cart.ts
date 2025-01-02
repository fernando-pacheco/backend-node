import { FastifySchema } from "fastify"
import { DocsSchemas } from "../interfaces/docs-schemas"
import { CartSchemas } from "../schemas/cart"
import { MessageResponses } from "../utils/message-responses"

export class CartDocsSchemas extends DocsSchemas {
    constructor(private schema: CartSchemas = new CartSchemas()) {
        super()
    }

    public get create(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Carts"],
                description: "Create a cart",
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
                tags: ["Carts"],
                description: "List carts",
                response: {
                    200: this.schema.listResponse,
                    ...MessageResponses([500]),
                },
            },
        }
    }

    public get listItemsCart(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Carts"],
                description: "List items by cart ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.listItemsCart,
                    ...MessageResponses([500]),
                },
            },
        }
    }

    public get get(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Carts"],
                description: "Get cart by ID",
                response: {
                    200: this.schema.response,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get update(): { schema: FastifySchema } {
        return { schema: {} }
    }

    public get delete(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Carts"],
                description: "Delete cart by ID",
                response: {
                    ...MessageResponses([200, 400, 404, 500]),
                },
            },
        }
    }

    public get clean(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Carts"],
                description: "Clean up cart by ID",
                response: {
                    ...MessageResponses([200, 400, 404, 500]),
                },
            },
        }
    }
}
