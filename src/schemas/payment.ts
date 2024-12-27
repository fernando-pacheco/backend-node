import { PaymentMethod } from "@prisma/client"
import { z } from "zod"

export const PaymentResponseSchema = z.object({
    id: z.string(),
    type: z.string(),
    payment_method: z.enum([
        PaymentMethod.PIX,
        PaymentMethod.CREDIT,
        PaymentMethod.DEBIT,
        PaymentMethod.WALLET,
    ]),
    value: z.number(),
})

export const PaymentCreateSchema = z.object({
    type: z.string(),
    payment_method: z.enum([
        PaymentMethod.PIX,
        PaymentMethod.CREDIT,
        PaymentMethod.DEBIT,
        PaymentMethod.WALLET,
    ]),
    value: z.number(),
})

export const PaymentUpdateSchema = z.object({
    type: z.string().optional(),
    payment_method: z
        .enum([
            PaymentMethod.PIX,
            PaymentMethod.CREDIT,
            PaymentMethod.DEBIT,
            PaymentMethod.WALLET,
        ])
        .optional(),
    value: z.number().optional(),
})

export const PaymentIDParamsSchema = z.object({
    id: z.string().min(1, "Payment ID is required"),
})
