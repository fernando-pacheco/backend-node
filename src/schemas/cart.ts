import { z } from "zod"
import { ItemCart } from "@prisma/client"

export class CartSchemas {
    public readonly response = z.object({
        id: z.string(),
    })

    public readonly listResponse = [this.response]

    public readonly listItemsCart = z.array(
        z.object({
            id: z.string(),
            cart_id: z.string(),
            product_id: z.string(),
            amount: z.number(),
        })
    )

    public readonly idParams = z.object({
        id: z.string().min(1, "Cart ID is required"),
    })
}
