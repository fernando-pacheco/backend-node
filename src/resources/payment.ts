import { PaymentServices } from "../service/payment"
import { PaymentSchemas } from "../schemas/payment"
import { Payment } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"

export class PaymentResources {
    constructor(
        private service: PaymentServices = new PaymentServices(),
        private schema: PaymentSchemas = new PaymentSchemas()
    ) {
        this.service = service
        this.schema = schema
    }

    create = async (
        request: FastifyRequest<{ Body: Payment }>,
        reply: FastifyReply
    ) => {
        const body = request.body
        const newPayment = await this.service.createPayment(body)
        reply.status(201).send(newPayment)
    }

    get = async (
        request: FastifyRequest<{ Params: Payment }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            const payment = await this.ensurePaymentExists(id, reply)
            reply.status(200).send(this.schema.response.parse(payment))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    private async ensurePaymentExists(id: string, reply: FastifyReply) {
        const product = await this.service.getPaymentByID(id)
        if (!product) {
            reply.status(404).send({ message: "Payment not found." })
            return null
        }
        return product
    }

    private handleError(reply: FastifyReply, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
