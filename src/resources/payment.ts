import { createPayment, getPaymentByID } from "../models/payment"
import { PaymentResponseSchema } from "../schemas/payment"

export const PaymentResources = {
    create: PaymentCreateResource,
    get: PaymentGetResource,
}

async function PaymentCreateResource(request: any, reply: any) {
    const body = request.body
    const newPayment = await createPayment(body)
    reply.status(201).send(newPayment)
}

async function PaymentGetResource(request: any, reply: any) {
    const { id } = request.params
    try {
        const payment = await getPaymentByID(id)
        if (!payment) {
            reply.status(404).send({ message: "Payment not found." })
            return
        }
        reply.status(200).send(PaymentResponseSchema.parse(payment))
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}
