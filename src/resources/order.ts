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

    public create(request: FastifyRequest, reply: FastifyReply) {}

    public delete(request: FastifyRequest, reply: FastifyReply) {}

    public get(request: FastifyRequest, reply: FastifyReply) {}

    public update(request: FastifyRequest, reply: FastifyReply) {}
}
