import { z } from "zod"
import { Schemas } from "../interfaces/schemas"

export class UserSchemas extends Schemas {
    public readonly response = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        created_at: z.date().optional(),
    })

    public readonly listResponse = z.array(this.response)

    public readonly listOrders = z.array(
        z.object({
            id: z.string(),
            payment_id: z.string(),
            user_id: z.string(),
            cart_id: z.string(),
        })
    )

    public readonly create = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
    })

    public readonly update = z.object({
        name: z.string().optional(),
        email: z.string().email("Invalid email address").optional(),
    })

    public readonly idParams = z.object({
        id: z.string().min(1, "User ID is required"),
    })
}
