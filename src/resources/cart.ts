import { FastifyReply } from "fastify"
import { CartSchemas } from "../schemas/cart"
import { CartServices } from "../services/cart"
import { Cart } from "@prisma/client"
import { Resources } from "../interfaces/resources"
import { RequestData } from "../types/resource"

export class CartResources extends Resources<Cart> {
    constructor(
        private service: CartServices = new CartServices(),
        private schema: CartSchemas = new CartSchemas()
    ) {
        super()

        this.create = this.create.bind(this)
        this.list = this.list.bind(this)
        this.listItemsCart = this.listItemsCart.bind(this)
        this.get = this.get.bind(this)
        this.delete = this.delete.bind(this)
        this.clean = this.clean.bind(this)
    }

    public async create(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ): Promise<void> {
        const newCart = await this.service.createCart()
        reply.status(201).send(this.schema.response.parse(newCart))
    }

    public async list(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ): Promise<void> {
        const carts = await this.service.getCarts()
        reply.status(200).send(this.schema.listResponse.parse(carts))
    }

    public async listItemsCart(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            await this.ensureCartExists(id, reply)
            const itemsCart = await this.service.listItemsCartByCartID(id)
            reply.status(200).send(this.schema.listItemsCart.parse(itemsCart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async get(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            const cart = await this.ensureCartExists(id, reply)
            reply.status(200).send(this.schema.response.parse(cart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public update(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ): Promise<void> {
        return Promise.resolve()
    }

    public async delete(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            await this.ensureCartExists(id, reply)
            await this.service.cleanCartByID(id)
            await this.service.deleteCartByID(id)
            reply
                .status(200)
                .send({ message: `Cart ${id} successfully deleted.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async clean(
        request: RequestData<{ id: string }>,
        reply: FastifyReply
    ) {
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
}
