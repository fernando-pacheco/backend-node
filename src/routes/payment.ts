import { PaymentCreateDocSchema, PaymentGetDocSchema } from "../docs/payment"
import { PaymentCreateResource, PaymentGetResource } from "../resources/payment"
import { FastifyTypedInstance } from "../types"
import { FabricRoute } from "../utils/fabric-route"

export function PaymentRegistersRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/payment",
        method: "post",
        docs: PaymentCreateDocSchema,
        resource: PaymentCreateResource,
    })
}

export function PaymentHandlerRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/payment/:id",
        method: "get",
        docs: PaymentGetDocSchema,
        resource: PaymentGetResource,
    })
}
