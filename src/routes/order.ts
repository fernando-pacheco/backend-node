import { RouteHandlerMethod } from "fastify"
import { OrderDocsSchemas } from "../docs/order"
import { Routes } from "../interfaces/routes"
import { OrderResources } from "../resources/order"
import { FastifyTypedInstance } from "../types/types"
import { FactoryRoute } from "../utils/factory-route"

export class OrderRoutes extends Routes {
    constructor(
        private resource: OrderResources = new OrderResources(),
        private docsSchema: OrderDocsSchemas = new OrderDocsSchemas()
    ) {
        super()
    }

    public registerRoutes(app: FastifyTypedInstance) {
        this.orderRegistersRoutes(app)
        this.orderHandlersRoutes(app)
        this.orderInfoRoutes(app)
    }

    private orderRegistersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/order",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resource.create as RouteHandlerMethod,
        })
    }

    private orderHandlersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/order/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resource.get as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/order/:id",
            method: "delete",
            docs: this.docsSchema.delete,
            resource: this.resource.delete as RouteHandlerMethod,
        })
    }

    private orderInfoRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/order/:id/cart",
            method: "get",
            docs: this.docsSchema.getCart,
            resource: this.resource.getCart as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/order/:id/payment",
            method: "get",
            docs: this.docsSchema.getPayment,
            resource: this.resource.getPayment as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/order/:id/user",
            method: "get",
            docs: this.docsSchema.getUser,
            resource: this.resource.getUser as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/order/:id/info",
            method: "get",
            docs: this.docsSchema.info,
            resource: this.resource.info as RouteHandlerMethod,
        })
    }
}
