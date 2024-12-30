import { DocsSchemas } from "../interfaces/docs-schemas"
import { CartSchemas } from "../schemas/cart"
import { MessageResponses } from "../utils/message-responses"

export class CartDocsSchemas {
    constructor(private schema: CartSchemas = new CartSchemas()) {
        this.schema = schema
    }

    public get create() {
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

    public get list() {
        return {
            schema: {
                tags: ["Carts"],
                description: "List carts",
                responses: {
                    200: this.schema.listResponse,
                    ...MessageResponses([500]),
                },
            },
        }
    }

    public get listItemsCart() {
        return {
            schema: {
                tags: ["Carts"],
                description: "List items by cart ID",
                params: this.schema.idParams,
                responses: {
                    200: this.schema.listItemsCart,
                    ...MessageResponses([500]),
                },
            },
        }
    }

    public get get() {
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

    public get delete() {
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

    public get clean() {
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
