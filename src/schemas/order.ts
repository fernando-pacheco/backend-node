import z from "zod"
import { Schemas } from "../interfaces/schemas"
import { PaymentMethod } from "@prisma/client"
import { SchemaType } from "../types/schema"

export class OrderSchemas extends Schemas {
    public idParams: SchemaType = z.object({
        id: z.string().min(1, "Order ID is required"),
    })

    public create: SchemaType = z.object({
        payment_id: z.string().min(1, "Payment ID is required"),
        user_id: z.string().min(1, "User ID is required"),
        cart_id: z.string().min(1, "Cart ID is required"),
    })

    public update: SchemaType = z.object({})

    public getPayment: SchemaType = z.object({
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

    public getCart: SchemaType = z.object({
        id: z.string(),
        itemsCart: z.array(
            z.object({
                id: z.string(),
                product: z.object({
                    id: z.string(),
                    name: z.string(),
                    price: z.number(),
                }),
                amount: z.number(),
            })
        ),
    })

    public getUser: SchemaType = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        created_at: z.date().optional(),
    })

    public response: SchemaType = z.object({
        id: z.string(),
        payment: this.getPayment,
        user: this.getUser,
        cart: this.getCart,
    })

    public listResponse: SchemaType = z.array(this.response)
}
