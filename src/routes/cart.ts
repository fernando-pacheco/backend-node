import { RouteHandlerMethod } from "fastify"
import { CartDocsSchemas } from "../docs/cart"
import { Routes } from "../interfaces/routes"
import { CartResources } from "../resources/cart"
import { FastifyTypedInstance } from "../types"
import { FabricRoute } from "../utils/fabric-route"

export class CartRoutes extends Routes {
    constructor(
        private resource: CartResources = new CartResources(),
        private docsSchema: CartDocsSchemas = new CartDocsSchemas()
    ) {
        super()
    }

    public registerRoutes(app: FastifyTypedInstance) {
        this.cartRegistersRoutes(app)
        this.cartHandlersRoutes(app)
    }

    private cartRegistersRoutes(app: FastifyTypedInstance) {
        FabricRoute({
            app,
            endpoint: "/cart",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resource.create,
        })

        FabricRoute({
            app,
            endpoint: "/cart",
            method: "get",
            docs: this.docsSchema.list,
            resource: this.resource.list,
        })
    }

    private cartHandlersRoutes(app: FastifyTypedInstance) {
        FabricRoute({
            app,
            endpoint: "/cart/:id/item-cart",
            method: "get",
            docs: this.docsSchema.listItemsCart,
            resource: this.resource.listItemsCart as RouteHandlerMethod,
        })

        FabricRoute({
            app,
            endpoint: "/cart/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resource.get as RouteHandlerMethod,
        })
    }
}
