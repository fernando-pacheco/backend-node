import {
    createProduct,
    deleteProductByID,
    getProductByID,
    getProducts,
    updateProduct,
} from "../models/product"
import { ProductResponseSchema } from "../schemas/product"

export async function ProductCreateResource(request: any, reply: any) {
    const body = request.body
    const newProduct = await createProduct(body)
    reply.status(201).send(newProduct)
}

export async function ProductsListResource() {
    const products = await getProducts()
    return products
}

export async function ProductGetResource(request: any, reply: any) {
    const { id } = request.params
    try {
        const product = await getProductByID(id)
        if (!product) {
            reply.status(404).send({ message: "Product not found." })
            return
        }

        reply.status(200).send(ProductResponseSchema.parse(product))
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}

export async function ProductPutResource(request: any, reply: any) {
    const { id } = request.params
    const body = request.body
    try {
        const product = getProductByID(id)
        if (!product) {
            reply.status(404).send({ message: "Product not found." })
            return
        }

        if (Object.keys(body).length === 0) {
            reply.status(400).send({ message: "Empty body." })
            return
        }

        const updatedProduct = await updateProduct(id, body)
        reply.status(200).send(updatedProduct)
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}

export async function ProductDeleteResource(request: any, reply: any) {
    const { id } = request.params
    try {
        const product = await getProductByID(id)
        if (!product) {
            reply.status(404).send({ message: "Product not found." })
            return
        }

        await deleteProductByID(id)
        reply
            .status(200)
            .send({ message: `Product {${id}} successfully deleted.` })
    } catch (error) {
        reply.status(500).send({ message: "Internal server error." })
    }
}
