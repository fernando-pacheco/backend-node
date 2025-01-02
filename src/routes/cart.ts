import { RouteHandlerMethod } from "fastify"
import { CartDocsSchemas } from "../docs/cart"
import { Routes } from "../interfaces/routes"
import { CartResources } from "../resources/cart"
import { FastifyTypedInstance } from "../types/types"
import { FactoryRoute } from "../utils/factory-route"

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
        this.cartInfoRoutes(app)
    }

    private cartRegistersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/cart",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resource.create as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/cart",
            method: "get",
            docs: this.docsSchema.list,
            resource: this.resource.list as RouteHandlerMethod,
        })
    }

    private cartHandlersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/cart/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resource.get as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/cart/:id",
            method: "delete",
            docs: this.docsSchema.delete,
            resource: this.resource.delete as RouteHandlerMethod,
        })
    }

    private cartInfoRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/cart/:id/items-cart",
            method: "get",
            docs: this.docsSchema.listItemsCart,
            resource: this.resource.listItemsCart as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/cart/:id/clean",
            method: "delete",
            docs: this.docsSchema.clean,
            resource: this.resource.clean as RouteHandlerMethod,
        })
    }
}
