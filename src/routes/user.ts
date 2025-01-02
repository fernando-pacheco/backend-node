import { FactoryRoute } from "../utils/factory-route"
import { UserDocsSchemas } from "../docs/user"
import { UserResources } from "../resources/user"
import { FastifyTypedInstance } from "../types/types"
import { Routes } from "../interfaces/routes"
import { RouteHandlerMethod } from "fastify"

export class UserRoutes extends Routes {
    constructor(
        private resource: UserResources = new UserResources(),
        private docsSchema: UserDocsSchemas = new UserDocsSchemas()
    ) {
        super()
    }

    public registerRoutes(app: FastifyTypedInstance) {
        this.userRegistersRoutes(app)
        this.userHandlersRoutes(app)
        this.userInfoRoutes(app)
    }

    private userRegistersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/user",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resource.create as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/user",
            method: "get",
            docs: this.docsSchema.list,
            resource: this.resource.list as RouteHandlerMethod,
        })
    }

    private userHandlersRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/user/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resource.get as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/user/:id/orders",
            method: "get",
            docs: this.docsSchema.listOrders,
            resource: this.resource.listOrders as RouteHandlerMethod,
        })

        FactoryRoute({
            app,
            endpoint: "/user/:id",
            method: "put",
            docs: this.docsSchema.update,
            resource: this.resource.update as RouteHandlerMethod,
        })
    }

    private userInfoRoutes(app: FastifyTypedInstance) {
        FactoryRoute({
            app,
            endpoint: "/user/:id",
            method: "delete",
            docs: this.docsSchema.delete,
            resource: this.resource.delete as RouteHandlerMethod,
        })
    }
}
