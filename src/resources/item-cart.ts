import { ItemCart } from "@prisma/client"
import { Resources } from "../interfaces/resources"
import { ItemCartServices } from "../services/item-cart"
import { ItemCartSchemas } from "../schemas/item-cart"
import { FastifyReply } from "fastify"
import { RequestData } from "../types/resource"

export class ItemCartResources extends Resources<ItemCart> {
    constructor(
        private service: ItemCartServices = new ItemCartServices(),
        private schema: ItemCartSchemas = new ItemCartSchemas()
    ) {
        super()

        this.create = this.create.bind(this)
        this.get = this.get.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    public async create(
        request: RequestData<{
            id: string
            product_id: string
            amount: number
            cart_id: string
            created_at: Date | null
        }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const body = request.body
            const newItemCart = await this.service.createItemCart(body)
            reply.status(201).send(newItemCart)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async get(
        request: RequestData<{
            id: string
            product_id: string
            amount: number
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            const itemCart = await this.ensureItemCartExists(id, reply)
            reply.status(200).send(this.schema.response.parse(itemCart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async update(
        request: RequestData<{
            id: string
            product_id: string
            amount: number
            cart_id: string
            created_at: Date | null
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        const body = request.body
        try {
            await this.ensureItemCartExists(id, reply)
            if (Object.keys(body).length === 0) {
                reply.status(400).send({ message: "Empty body." })
                return
            }

            const updatedItemCart = await this.service.updateItemCart(id, body)
            reply.status(200).send(updatedItemCart)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async delete(
        request: RequestData<{
            id: string
            product_id: string
            amount: number
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            await this.ensureItemCartExists(id, reply)
            await this.service.deleteItemCart(id)
            reply
                .status(200)
                .send({ message: `ItemCart {${id}} successfully deleted.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    private async ensureItemCartExists(id: string, reply: FastifyReply) {
        const itemCart = await this.service.getItemCartByID(id)
        if (!itemCart) {
            reply.status(404).send({ message: "ItemCart not found." })
            return null
        }
        return itemCart
    }
}
