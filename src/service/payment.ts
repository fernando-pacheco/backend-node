import { PrismaClient, Payment } from "@prisma/client"

export class PaymentServices {
    private PaymentModel: PrismaClient["payment"]

    constructor(private prisma: PrismaClient = new PrismaClient()) {
        this.prisma = prisma
        this.PaymentModel = this.prisma.payment
    }

    async createPayment(body: Payment): Promise<Payment> {
        const payment = await this.PaymentModel.create({
            data: {
                type: body.type,
                payment_method: body.payment_method,
                value: body.value,
            },
        })
        return payment
    }

    async getPaymentByID(id: string): Promise<Payment | null> {
        const payment = await this.PaymentModel.findUnique({
            where: { id },
        })
        return payment
    }

    async getPaymentByOrderID(order_id: string): Promise<Payment | null> {
        return null
    }
}
