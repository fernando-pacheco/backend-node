import { ProductServices } from "../service/product"
import { ProductSchemas } from "../schemas/product"
import { Product } from "@prisma/client"
import { FastifyReply, FastifyRequest } from "fastify"
import { Resources } from "../interfaces/resources"

export class ProductResources extends Resources<Product> {
    constructor(
        private service: ProductServices = new ProductServices(),
        private schema: ProductSchemas = new ProductSchemas()
    ) {
        super()
    }

    create = async (
        request: FastifyRequest<{ Body: Product }>,
        reply: FastifyReply
    ) => {
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

    get = async (
        request: FastifyRequest<{ Params: Product }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            const product = await this.ensureProductExists(id, reply)
            reply.status(200).send(this.schema.response.parse(product))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    update = async (
        request: FastifyRequest<{ Body: Product; Params: Product }>,
        reply: FastifyReply
    ) => {
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

    delete = async (
        request: FastifyRequest<{ Params: Product }>,
        reply: FastifyReply
    ) => {
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

    private async ensureProductExists(id: string, reply: FastifyReply) {
        const product = await this.service.getProductByID(id)
        if (!product) {
            reply.status(404).send({ message: "Product not found." })
            return null
        }
        return product
    }

    private handleError(reply: FastifyReply, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
