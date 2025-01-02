import { RouteHandlerMethod } from "fastify"
import { PaymentDocsSchemas } from "../docs/payment"
import { Routes } from "../interfaces/routes"
import { PaymentResources } from "../resources/payment"
import { FastifyTypedInstance } from "../types/types"
import { FactoryRoute } from "../utils/factory-route"

export class PaymentRoutes extends Routes {
    constructor(
        private resource: PaymentResources = new PaymentResources(),
        private docsSchema: PaymentDocsSchemas = new PaymentDocsSchemas()
    ) {
        super()
    }

    public registerRoutes(app: FastifyTypedInstance) {
        this.paymentRegistersRoutes(app)
        this.paymentHandlerRoutes(app)
    }

    private paymentRegistersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/payment",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resource.create as RouteHandlerMethod,
        })
    }

    private paymentHandlerRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/payment/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resource.get as RouteHandlerMethod,
        })
    }
}
