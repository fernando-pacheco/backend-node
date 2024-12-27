import { createPayment, getPaymentByID } from "../src/models/payment"
import {
    PaymentCreateResource,
    PaymentGetResource,
} from "../src/resources/payment"
import { PaymentResponseSchema } from "../src/schemas/payment"

jest.mock("../src/models/payment")

describe("PaymentCreateResource", () => {
    it("should create a payment and return it with status 201", async () => {
        const requestBody = {
            type: "Restaurante",
            payment_method: "PIX",
            value: 10,
        }
        const mockPayment = { id: "1", ...requestBody }

        ;(createPayment as jest.Mock).mockResolvedValue(mockPayment)

        const mockRequest = { body: requestBody }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await PaymentCreateResource(mockRequest, mockReply)

        expect(createPayment).toHaveBeenCalledWith(requestBody)
        expect(mockReply.status).toHaveBeenCalledWith(201)
        expect(mockReply.send).toHaveBeenCalledWith(mockPayment)
    })
})

describe("PaymentGetResource", () => {
    it("should return a payment if found", async () => {
        const mockPayment = {
            id: "1",
            type: "Restaurante",
            payment_method: "PIX",
            value: 10,
        }

        ;(getPaymentByID as jest.Mock).mockResolvedValue(mockPayment)

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await PaymentGetResource(mockRequest, mockReply)

        expect(getPaymentByID).toHaveBeenCalledWith("1")
        expect(mockReply.status).toHaveBeenCalledWith(200)
        expect(mockReply.send).toHaveBeenCalledWith(
            PaymentResponseSchema.parse(mockPayment)
        )
    })

    it("should return 404 if payment is not found", async () => {
        ;(getPaymentByID as jest.Mock).mockResolvedValue(null)

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await PaymentGetResource(mockRequest, mockReply)

        expect(mockReply.status).toHaveBeenCalledWith(404)
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "Payment not found.",
        })
    })
})
