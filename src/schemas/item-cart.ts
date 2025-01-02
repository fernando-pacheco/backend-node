import { z } from "zod"
import { Schemas } from "../interfaces/schemas"
import { SchemaType } from "../types/schema"

export class ItemCartSchemas extends Schemas {
    public response: SchemaType = z.object({
        id: z.string(),
        product_id: z.string(),
        cart_id: z.string(),
        amount: z.number(),
    })

    public create: SchemaType = z.object({
        product_id: z.string(),
        cart_id: z.string(),
        amount: z.number().min(0),
    })

    public update: SchemaType = z.object({
        product_id: z.string().optional(),
        cart_id: z.string().optional(),
        amount: z.number().min(0).optional(),
    })

    public idParams: SchemaType = z.object({
        id: z.string().min(1, "ItemCart ID is required"),
    })

    public cartIDParams: SchemaType = z.object({
        cart_id: z.string().min(1, "Cart ID is required"),
    })
}
