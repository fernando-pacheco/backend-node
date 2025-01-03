import { ProductServices } from "../services/product"
import { ProductSchemas } from "../schemas/product"
import { Product } from "@prisma/client"
import { FastifyReply } from "fastify"
import { Resources } from "../interfaces/resources"
import { RequestData } from "../types/resource"

export class ProductResources extends Resources<Product> {
    constructor(
        private service: ProductServices = new ProductServices(),
        private schema: ProductSchemas = new ProductSchemas()
    ) {
        super()

        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
        this.get = this.get.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    public async create(
        request: RequestData<{
            name: string
            id: string
            price: number
            created_at: Date | null
        }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const body = request.body
            const newProduct = await this.service.createProduct(body)
            reply.status(201).send(newProduct)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async list(
        request: RequestData<{ name: string; id: string; price: number }>,
        reply: FastifyReply
    ): Promise<void> {
        const products = await this.service.getProducts()
        reply.status(200).send(this.schema.listResponse.parse(products))
    }

    public async get(
        request: RequestData<{ name: string; id: string; price: number }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            const product = await this.ensureProductExists(id, reply)
            reply.status(200).send(this.schema.response.parse(product))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async update(
        request: RequestData<{
            name: string
            id: string
            price: number
            created_at: Date | null
        }>,
        reply: FastifyReply
    ): Promise<void> {
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

    public async delete(
        request: RequestData<{ name: string; id: string; price: number }>,
        reply: FastifyReply
    ): Promise<void> {
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
}
