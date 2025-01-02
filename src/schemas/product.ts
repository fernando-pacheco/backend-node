import { z } from "zod"
import { Schemas } from "../interfaces/schemas"
import { SchemaType } from "../types/schema"

export class ProductSchemas extends Schemas {
    public response: SchemaType = z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
    })

    public listResponse: SchemaType = z.array(this.response)

    public create: SchemaType = z.object({
        name: z.string().min(1, "Name is required"),
        price: z.number().min(0, "Price is required"),
    })

    public update: SchemaType = z.object({
        name: z.string().optional(),
        price: z.number().min(0).optional(),
    })

    public idParams: SchemaType = z.object({
        id: z.string().min(1, "Product ID is required"),
    })
}
