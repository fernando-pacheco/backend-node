import { MessageResponseSchema } from "../schemas/message"
import {
    PaymentCreateSchema,
    PaymentIDParamsSchema,
    PaymentResponseSchema,
} from "../schemas/payment"
import { MessageResponses } from "../utils/message-responses"

export const PaymentDocSchemas = {
    create: {
        schema: {
            tags: ["Payments"],
            description: "Create a payment method",
            body: PaymentCreateSchema,
            response: {
                201: PaymentResponseSchema,
                ...MessageResponses([400, 500]),
            },
        },
    },
    get: {
        schema: {
            tags: ["Payments"],
            description: "Get payment method by ID",
            params: PaymentIDParamsSchema,
            response: {
                200: PaymentResponseSchema,
                ...MessageResponses([404, 500]),
            },
        },
    },
}
