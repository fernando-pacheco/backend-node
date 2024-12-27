import { PaymentDocSchemas } from "../docs/payment"
import { PaymentResources } from "../resources/payment"
import { FastifyTypedInstance } from "../types"
import { FabricRoute } from "../utils/fabric-route"

export function PaymentRegistersRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/payment",
        method: "post",
        docs: PaymentDocSchemas.create,
        resource: PaymentResources.create,
    })
}

export function PaymentHandlerRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/payment/:id",
        method: "get",
        docs: PaymentDocSchemas.get,
        resource: PaymentResources.get,
    })
}
