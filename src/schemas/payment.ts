import { z } from "zod"
import { PaymentMethod } from "@prisma/client"
import { Schemas } from "../interfaces/schemas"
import { SchemaType } from "../types/schema"

export class PaymentSchemas extends Schemas {
    public response: SchemaType = z.object({
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

    public create: SchemaType = z.object({
        type: z.string(),
        payment_method: z.enum([
            PaymentMethod.PIX,
            PaymentMethod.CREDIT,
            PaymentMethod.DEBIT,
            PaymentMethod.WALLET,
        ]),
        value: z.number().min(0),
    })

    public update: SchemaType = z.object({
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

    public idParams: SchemaType = z.object({
        id: z.string().min(1, "Payment ID is required"),
    })
}
