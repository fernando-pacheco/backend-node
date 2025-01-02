import { FastifySchema } from "fastify"
import { DocsSchemas } from "../interfaces/docs-schemas"
import { PaymentSchemas } from "../schemas/payment"
import { MessageResponses } from "../utils/message-responses"

export class PaymentDocsSchemas extends DocsSchemas {
    constructor(private schema: PaymentSchemas = new PaymentSchemas()) {
        super()
    }

    public get create() {
        return {
            schema: {
                tags: ["Payments"],
                description: "Create a payment method",
                body: this.schema.create,
                response: {
                    201: this.schema.response,
                    ...MessageResponses([400, 500]),
                },
            },
        }
    }

    public get get() {
        return {
            schema: {
                tags: ["Payments"],
                description: "Get payment method by ID",
                params: this.schema.idParams,
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
        return { schema: {} }
    }
}
