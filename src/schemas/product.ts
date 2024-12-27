import { z } from "zod"
import { Schemas } from "../interfaces/schemas"

export class ProductSchemas extends Schemas {
    public readonly response = z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
    })

    public readonly listResponse = [this.response]

    public readonly create = z.object({
        name: z.string().min(1, "Name is required"),
        price: z.number().min(0, "Price is required"),
    })

    public readonly update = z.object({
        name: z.string().optional(),
        price: z.number().min(0).optional(),
    })

    public readonly idParams = z.object({
        id: z.string().min(1, "Product ID is required"),
    })
}
