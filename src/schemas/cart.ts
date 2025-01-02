import { z } from "zod"
import { Schemas } from "../interfaces/schemas"
import { SchemaType } from "../types/schema"

export class CartSchemas extends Schemas {
    public response = z.object({
        id: z.string(),
    })

    public create: SchemaType = z.object({})

    public update: SchemaType = z.object({})

    public listResponse: SchemaType = z.array(this.response)

    public listItemsCart: SchemaType = z.array(
        z.object({
            id: z.string(),
            cart_id: z.string(),
            product_id: z.string(),
            amount: z.number(),
        })
    )

    public idParams: SchemaType = z.object({
        id: z.string().min(1, "Cart ID is required"),
    })
}
