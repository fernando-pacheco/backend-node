import { z } from "zod"

export const ProductResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
})

export const ProductsListResponseSchema = z.array(ProductResponseSchema)

export const ProductCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().min(0, "Price is required"),
})

export const ProductUpdateSchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
})

export const ProductIDParamsSchema = z.object({
    id: z.string().min(1, "Product ID is required"),
})
