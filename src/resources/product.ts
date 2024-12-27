import { ProductService } from "../service/product"
import { ProductSchemas } from "../schemas/product"
import { Resources } from "../interfaces/resources"
import { Product } from "@prisma/client"

export class ProductResources extends Resources<Product> {
    constructor(
        private service: ProductService = new ProductService(),
        private schema: ProductSchemas = new ProductSchemas()
    ) {
        super()
    }

    create = async (request: any, reply: any) => {
        try {
            const body = request.body
            const newProduct = await this.service.createProduct(body)
            reply.status(201).send(newProduct)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    list = async () => {
        const products = await this.service.getProducts()
        return products
    }

    get = async (request: any, reply: any) => {
        const { id } = request.params
        try {
            const product = await this.ensureProductExists(id, reply)
            reply.status(200).send(this.schema.response.parse(product))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    update = async (request: any, reply: any) => {
        const { id } = request.params
        const body = request.body
        try {
            await this.ensureProductExists(id, reply)
            if (Object.keys(body).length === 0) {
                reply.status(400).send({ message: "Empty body." })
                return
            }

            const updatedProduct = await this.service.updateProduct(id, body)
            reply.status(200).send(updatedProduct)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    delete = async (request: any, reply: any) => {
        const { id } = request.params
        try {
            await this.ensureProductExists(id, reply)
            await this.service.deleteProductByID(id)
            reply
                .status(200)
                .send({ message: `Product {${id}} successfully deleted.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    private async ensureProductExists(id: string, reply: any) {
        const product = await this.service.getProductByID(id)
        if (!product) {
            reply.status(404).send({ message: "Product not found." })
            return null
        }
        return product
    }

    private handleError(reply: any, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
