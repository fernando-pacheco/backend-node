import { FastifyReply, FastifyRequest } from "fastify"
import { CartSchemas } from "../schemas/cart"
import { CartServices } from "../services/cart"
import { Cart, ItemCart } from "@prisma/client"

export class CartResources {
    constructor(
        private service: CartServices = new CartServices(),
        private schema: CartSchemas = new CartSchemas()
    ) {
        this.service = service
        this.schema = schema
    }

    create = async () => {
        const newCart = await this.service.createCart()
        return this.schema.response.parse(newCart)
    }

    list = async () => {
        const carts = await this.service.getCarts()
        return carts
    }

    listItemsCart = async (
        request: FastifyRequest<{ Params: ItemCart }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            await this.ensureCartExists(id, reply)
            const itemsCart = await this.service.listItemsCartByCartID(id)
            return itemsCart
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    get = async (
        request: FastifyRequest<{ Params: Cart }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            const cart = await this.ensureCartExists(id, reply)
            reply.status(200).send(this.schema.response.parse(cart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    delete = async (
        request: FastifyRequest<{ Params: Cart }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            await this.ensureCartExists(id, reply)
            await this.service.deleteCartByID(id)
            reply
                .status(200)
                .send({ message: `Cart ${id} successfully deleted.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    clean = async (
        request: FastifyRequest<{ Params: Cart }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            await this.ensureCartExists(id, reply)
            await this.service.cleanCartByID(id)
            reply
                .status(200)
                .send({ message: `Cart ${id} successfully cleaned.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    private async ensureCartExists(id: string, reply: FastifyReply) {
        const cart = await this.service.getCartByID(id)
        if (!cart) {
            reply.status(404).send({ message: "Cart not found." })
            return null
        }
        return cart
    }

    private handleError(reply: FastifyReply, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
