import {
    ProductCreateSchema,
    ProductIDParamsSchema,
    ProductResponseSchema,
    ProductsListResponseSchema,
    ProductUpdateSchema,
} from "../schemas/product"
import { MessageResponses } from "../utils/message-responses"

export const ProductDocsSchemas = {
    create: {
        schema: {
            tags: ["Products"],
            description: "Create a new product",
            body: ProductCreateSchema,
            response: {
                200: ProductResponseSchema,
                ...MessageResponses([500]),
            },
        },
    },
    list: {
        schema: {
            tags: ["Products"],
            description: "List products",
            responses: {
                200: ProductsListResponseSchema,
                ...MessageResponses([500]),
            },
        },
    },
    get: {
        schema: {
            tags: ["Products"],
            description: "Get product by ID",
            params: ProductIDParamsSchema,
            response: {
                200: ProductResponseSchema,
                ...MessageResponses([404, 500]),
            },
        },
    },
    update: {
        schema: {
            tags: ["Products"],
            description: "Update product by ID",
            body: ProductUpdateSchema,
            params: ProductIDParamsSchema,
            response: {
                200: ProductResponseSchema,
                ...MessageResponses([400, 404, 500]),
            },
        },
    },
    delete: {
        schema: {
            tags: ["Products"],
            description: "Delete product by ID",
            params: ProductIDParamsSchema,
            response: {
                ...MessageResponses([200, 404, 500]),
            },
        },
    },
}
