import { RouteHandlerMethod } from "fastify"
import { ItemCartDocsSchemas } from "../docs/item-cart"
import { Routes } from "../interfaces/routes"
import { ItemCartResources } from "../resources/item-cart"
import { FastifyTypedInstance } from "../types/types"
import { FactoryRoute } from "../utils/factory-route"

export class ItemCartRoutes extends Routes {
    constructor(
        private resource: ItemCartResources = new ItemCartResources(),
        private docsSchema: ItemCartDocsSchemas = new ItemCartDocsSchemas()
    ) {
        super()
    }

    public registerRoutes(app: FastifyTypedInstance) {
        this.itemCartRegistersRoutes(app)
        this.itemCartHandlersRoutes(app)
    }

    private itemCartRegistersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/item-cart",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resource.create as RouteHandlerMethod,
        })
    }

    private itemCartHandlersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/item-cart/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resource.get as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/item-cart/:id",
            method: "put",
            docs: this.docsSchema.update,
            resource: this.resource.update as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/item-cart/:id",
            method: "delete",
            docs: this.docsSchema.delete,
            resource: this.resource.delete as RouteHandlerMethod,
        })
    }
}
