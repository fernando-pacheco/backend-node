import { MessageResponseSchema } from "../schemas/message"
import {
    PaymentCreateSchema,
    PaymentIDParamsSchema,
    PaymentResponseSchema,
} from "../schemas/payment"

export const PaymentCreateDocSchema = {
    schema: {
        tags: ["Payments"],
        description: "Create a payment method",
        body: PaymentCreateSchema,
        response: {
            201: PaymentResponseSchema,
            400: MessageResponseSchema,
            500: MessageResponseSchema,
        },
    },
}

export const PaymentGetDocSchema = {
    schema: {
        tags: ["Payments"],
        description: "Get payment method by ID",
        params: PaymentIDParamsSchema,
        response: {
            200: PaymentResponseSchema,
            404: MessageResponseSchema,
            500: MessageResponseSchema,
        },
    },
}
