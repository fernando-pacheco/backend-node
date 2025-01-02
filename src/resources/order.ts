import { Order } from "@prisma/client"
import { Resources } from "../interfaces/resources"
import { OrderSchemas } from "../schemas/order"
import { OrderServices } from "../services/order"
import { FastifyRequest, FastifyReply } from "fastify"

export class OrderResources extends Resources<Order> {
    constructor(
        private service: OrderServices = new OrderServices(),
        private schema: OrderSchemas = new OrderSchemas()
    ) {
        super()
    }

    create = async (
        request: FastifyRequest<{ Body: Order }>,
        reply: FastifyReply
    ) => {
        try {
            const body = request.body
            const newOrder = await this.service.createOrder(body)
            reply.status(201).send(this.schema.response.parse(newOrder))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    get = async (
        request: FastifyRequest<{ Params: Order }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            const order = this.ensureOrderExists(id, reply)
            reply.status(200).send(this.schema.response.parse(order))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    getCart = async (
        request: FastifyRequest<{ Params: Order }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const cart = this.service.getCartByOrderID(id)
            reply.status(200).send(this.schema.getCart.parse(cart))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    getPayment = async (
        request: FastifyRequest<{ Params: Order }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const payment = this.service.getPaymentByOrderID(id)
            reply.status(200).send(this.schema.getPayment.parse(payment))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    getUser = async (
        request: FastifyRequest<{ Params: Order }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const user = this.service.getUserByOrderID(id)
            reply.status(200).send(this.schema.getUser.parse(user))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    info = async (
        request: FastifyRequest<{ Params: Order }>,
        reply: FastifyReply
    ) => {
        const { id } = request.params
        try {
            this.ensureOrderExists(id, reply)
            const orderInfo = this.service.getOrderInfo(id)
            reply.status(200).send(this.schema.info.parse(orderInfo))
        } catch (error) {
            this.handleError(reply, error, 400)
        }
    }

    update = async (
        request: FastifyRequest<{ Params: Order; Body: Order }>,
        reply: FastifyReply
    ) => {
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

    delete = async (
        request: FastifyRequest<{ Params: Order }>,
        reply: FastifyReply
    ) => {
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

    private handleError(reply: FastifyReply, error: unknown, statusCode = 500) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
