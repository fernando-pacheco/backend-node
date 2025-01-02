import { z } from "zod"
import { Schemas } from "../interfaces/schemas"
import { SchemaType } from "../types/schema"

export class UserSchemas extends Schemas {
    public response: SchemaType = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        created_at: z.date().optional(),
    })

    public listResponse: SchemaType = z.array(this.response)

    public create: SchemaType = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
    })

    public update: SchemaType = z.object({
        name: z.string().optional(),
        email: z.string().email("Invalid email address").optional(),
    })

    public idParams: SchemaType = z.object({
        id: z.string().min(1, "User ID is required"),
    })
}
