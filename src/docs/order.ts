import { FastifySchema } from "fastify"
import { DocsSchemas } from "../interfaces/docs-schemas"
import { OrderSchemas } from "../schemas/order"
import { MessageResponses } from "../utils/message-responses"

export class OrderDocsSchemas extends DocsSchemas {
    constructor(private schema: OrderSchemas = new OrderSchemas()) {
        super()
    }

    public get create(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Orders"],
                body: this.schema.create,
                description: "Create a new order",
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
                tags: ["Orders"],
                description: "Get order by ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.response,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get getUser(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Orders"],
                description: "Get user by order ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.getUser,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get getPayment(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Orders"],
                description: "Get payment by order ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.getPayment,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get getCart(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Orders"],
                description: "Get cart by order ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.getCart,
                    ...MessageResponses([400, 404, 500]),
                },
            },
        }
    }

    public get info(): { schema: FastifySchema } {
        return {
            schema: {
                tags: ["Orders"],
                description: "Get order infos by ID",
                params: this.schema.idParams,
                response: {
                    200: this.schema.info,
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
                tags: ["Orders"],
                description: "Get order infos by ID",
                params: this.schema.idParams,
                response: {
                    ...MessageResponses([200, 400, 404, 500]),
                },
            },
        }
    }
}
