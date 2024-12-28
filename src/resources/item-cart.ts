import { ItemCart } from "@prisma/client"
import { Resources } from "../interfaces/resources"
import { ItemCartServices } from "../services/item-cart"
import { ItemCartSchemas } from "../schemas/item-cart"
import { FastifyReply, FastifyRequest } from "fastify"
import { CartServices } from "../services/cart"

export class ItemCartResources extends Resources<ItemCart> {
    constructor(
        private service: ItemCartServices = new ItemCartServices(),
        private serviceCart: CartServices = new CartServices(),
        private schema: ItemCartSchemas = new ItemCartSchemas()
    ) {
        super()
    }

    create = async (
        request: FastifyRequest<{ Body: ItemCart }>,
        reply: FastifyReply
    ) => {
        try {
            const body = request.body
            const newItemCart = await this.service.createItemCart(body)
            reply.status(201).send(newItemCart)
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    get = async (
        request: FastifyRequest<{ Params: ItemCart }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            const itemCart = await this.ensureItemCartExists(id, reply)
            reply.status(200).send(this.schema.response.parse(itemCart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    update = async (
        request: FastifyRequest<{ Body: ItemCart; Params: ItemCart }>,
        reply: FastifyReply
    ) => {
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

    delete = async (
        request: FastifyRequest<{ Params: ItemCart }>,
        reply: FastifyReply
    ) => {
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

    private handleError(reply: FastifyReply, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
