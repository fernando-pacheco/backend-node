import { PaymentServices } from "../services/payment"
import { PaymentSchemas } from "../schemas/payment"
import { $Enums, Payment } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"
import { Resources } from "../interfaces/resources"
import { RequestData } from "../types/resource"

export class PaymentResources extends Resources<Payment> {
    constructor(
        private service: PaymentServices = new PaymentServices(),
        private schema: PaymentSchemas = new PaymentSchemas()
    ) {
        super()

        this.create = this.create.bind(this)
        this.get = this.get.bind(this)
    }

    public async create(
        request: RequestData<{
            id: string
            type: string
            payment_method: $Enums.PaymentMethod
            value: number
            created_at: Date | null
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const body = request.body
        const newPayment = await this.service.createPayment(body)
        reply.status(201).send(newPayment)
    }

    public async get(
        request: RequestData<{
            id: string
            type: string
            payment_method: $Enums.PaymentMethod
            value: number
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            const payment = await this.ensurePaymentExists(id, reply)
            reply.status(200).send(this.schema.response.parse(payment))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public update(
        request: RequestData<{
            id: string
            type: string
            payment_method: $Enums.PaymentMethod
            value: number
        }>,
        reply: FastifyReply
    ): Promise<void> {
        return Promise.resolve()
    }

    public delete(
        request: RequestData<{
            id: string
            type: string
            payment_method: $Enums.PaymentMethod
            value: number
        }>,
        reply: FastifyReply
    ): Promise<void> {
        return Promise.resolve()
    }

    private async ensurePaymentExists(id: string, reply: FastifyReply) {
        const product = await this.service.getPaymentByID(id)
        if (!product) {
            reply.status(404).send({ message: "Payment not found." })
            return null
        }
        return product
    }
}
