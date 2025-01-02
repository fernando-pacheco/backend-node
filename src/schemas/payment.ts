import { z } from "zod"
import { PaymentMethod } from "@prisma/client"
import { Schemas } from "../interfaces/schemas"

export class PaymentSchemas extends Schemas {
    public readonly response = z.object({
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

    public readonly create = z.object({
        type: z.string(),
        payment_method: z.enum([
            PaymentMethod.PIX,
            PaymentMethod.CREDIT,
            PaymentMethod.DEBIT,
            PaymentMethod.WALLET,
        ]),
        value: z.number().min(0),
    })

    public readonly update = z.object({
        type: z.string().optional(),
        payment_method: z
            .enum([
                PaymentMethod.PIX,
                PaymentMethod.CREDIT,
                PaymentMethod.DEBIT,
                PaymentMethod.WALLET,
            ])
            .optional(),
        value: z.number().min(0).optional(),
    })

    public readonly idParams = z.object({
        id: z.string().min(1, "Payment ID is required"),
    })
}
