import z from "zod"
import { Schemas } from "../interfaces/schemas"
import { PaymentMethod } from "@prisma/client"

export class OrderSchemas extends Schemas {
    public readonly response = z.object({
        id: z.string(),
        payment_id: z.string(),
        user_id: z.string(),
        cart_id: z.string(),
    })

    public readonly listResponse = [this.response]

    public readonly idParams = z.object({
        id: z.string().min(1, "Order ID is required"),
    })

    public readonly create = z.object({
        payment_id: z.string().min(1, "Payment ID is required"),
        user_id: z.string().min(1, "User ID is required"),
        cart_id: z.string().min(1, "Cart ID is required"),
    })

    public readonly update = z.object({})

    public readonly getPayment = z.object({
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

    public readonly getCart = z.object({
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

    public readonly getUser = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        created_at: z.date().optional(),
    })

    public readonly info = z.object({
        id: z.string(),
        payment: this.getPayment,
        user: this.getUser,
        cart: this.getCart,
    })
}
