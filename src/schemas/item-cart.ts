import { z } from "zod"
import { Schemas } from "../interfaces/schemas"

export class ItemCartSchemas extends Schemas {
    public readonly response = z.object({
        id: z.string(),
        product_id: z.string(),
        cart_id: z.string(),
        amount: z.number(),
    })

    public readonly create = z.object({
        product_id: z.string(),
        cart_id: z.string(),
        amount: z.number().min(0),
    })

    public readonly update = z.object({
        product_id: z.string().optional(),
        cart_id: z.string().optional(),
        amount: z.number().min(0).optional(),
    })

    public readonly idParams = z.object({
        id: z.string().min(1, "ItemCart ID is required"),
    })

    public readonly cartIDParams = z.object({
        cart_id: z.string().min(1, "Cart ID is required"),
    })
}
