import { PaymentServices } from "../src/services/payment"
import { PrismaClient, Payment, PaymentMethod } from "@prisma/client"

describe("PaymentServices", () => {
    let paymentService: PaymentServices
    let prismaMock: PrismaClient

    beforeEach(() => {
        prismaMock = new PrismaClient()
        paymentService = new PaymentServices(prismaMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("createPayment", () => {
        it("should create a payment", async () => {
            const paymentData: Payment = {
                id: "1", // Valor do ID gerado pelo Prisma
                type: "Invoice",
                payment_method: PaymentMethod.CREDIT, // Usando PaymentMethod do Prisma
                value: 150.0,
            }

            jest.spyOn(prismaMock.payment, "create").mockResolvedValue(
                paymentData
            )

            const result = await paymentService.createPayment(paymentData)

            expect(prismaMock.payment.create).toHaveBeenCalledWith({
                data: {
                    type: paymentData.type,
                    payment_method: paymentData.payment_method,
                    value: paymentData.value,
                },
            })
            expect(result).toEqual(paymentData)
        })
    })

    describe("getPaymentByID", () => {
        it("should return a payment by ID", async () => {
            const payment: Payment = {
                id: "1",
                type: "Invoice",
                payment_method: PaymentMethod.PIX,
                value: 100.0,
            }

            jest.spyOn(prismaMock.payment, "findUnique").mockResolvedValue(
                payment
            )

            const result = await paymentService.getPaymentByID("1")

            expect(prismaMock.payment.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            })
            expect(result).toEqual(payment)
        })

        it("should return null if payment does not exist", async () => {
            jest.spyOn(prismaMock.payment, "findUnique").mockResolvedValue(null)

            const result = await paymentService.getPaymentByID("999")

            expect(prismaMock.payment.findUnique).toHaveBeenCalledWith({
                where: { id: "999" },
            })
            expect(result).toBeNull()
        })
    })

    describe("getPaymentByOrderID", () => {
        it("should return null (as this method is not implemented)", async () => {
            const result = await paymentService.getPaymentByOrderID("1")
            expect(result).toBeNull()
        })
    })
})
