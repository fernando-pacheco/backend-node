import { PrismaClient } from "@prisma/client"
import { PaymentProps } from "../interfaces/payment"

const prisma = new PrismaClient()
const PaymentModel = prisma.payment

export async function createPayment(body: PaymentProps): Promise<PaymentProps> {
    const payment = await PaymentModel.create({
        data: {
            type: body.type,
            payment_method: body.payment_method,
            value: body.value,
        },
    })

    return payment
}

export async function getPaymentByID(id: string): Promise<PaymentProps | null> {
    const payment = await PaymentModel.findUnique({
        where: { id },
    })

    return payment
}

export async function getPaymentByOrderID(
    order_id: string
): Promise<PaymentProps | null> {
    return null
}
