import { Order } from "@prisma/client"
import { Resources } from "../interfaces/resources"
import { OrderSchemas } from "../schemas/order"
import { OrderServices } from "../services/order"
import { FastifyRequest, FastifyReply } from "fastify"
import { RequestData } from "../types/resource"

export class OrderResources extends Resources<Order> {
    constructor(
        private service: OrderServices = new OrderServices(),
        private schema: OrderSchemas = new OrderSchemas()
    ) {
        super()

        this.create = this.create.bind(this)
        this.get = this.get.bind(this)
        this.getCart = this.getCart.bind(this)
        this.getPayment = this.getPayment.bind(this)
        this.getUser = this.getUser.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    public async create(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
            created_at: Date | null
        }>,
        reply: FastifyReply
    ): Promise<void> {
        try {
            const body = request.body
            const newOrder = await this.service.createOrder(body)
            reply.status(201).send(this.schema.response.parse(newOrder))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async get(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            const order = await this.ensureOrderExists(id, reply)
            reply.status(200).send(this.schema.response.parse(order))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async getCart(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const cart = await this.service.getCartByOrderID(id)
            reply.status(200).send(this.schema.getCart.parse(cart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async getPayment(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const payment = await this.service.getPaymentByOrderID(id)
            reply.status(200).send(this.schema.getPayment.parse(payment))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async getUser(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const user = await this.service.getUserByOrderID(id)
            reply.status(200).send(this.schema.getUser.parse(user))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async update(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        const body = request.body
        try {
            await this.ensureOrderExists(id, reply)
            if (Object.keys(body).length === 0) {
                reply.status(400).send({ message: "Empty body." })
            }
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    public async delete(
        request: RequestData<{
            id: string
            payment_id: string
            user_id: string
            cart_id: string
        }>,
        reply: FastifyReply
    ): Promise<void> {
        const { id } = request.params
        try {
            await this.ensureOrderExists(id, reply)
            await this.service.deleteOrderByID(id)
            reply
                .status(200)
                .send({ message: `Order ${id} successfully deleted.` })
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    private async ensureOrderExists(id: string, reply: FastifyReply) {
        const order = await this.service.getOrderByID(id)
        if (!order) {
            reply.status(404).send({ message: "Order not found." })
            return null
        }
        return order
    }
}
