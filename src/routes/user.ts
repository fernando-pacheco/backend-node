import { FabricRoute } from "../utils/fabric-route"
import { UserDocsSchemas } from "../docs/user"
import { UserResources } from "../resources/user"
import { FastifyTypedInstance } from "../types"

export function UserRegistersRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/users",
        method: "post",
        docs: UserDocsSchemas.create,
        resource: UserResources.create,
    })

    FabricRoute({
        app,
        endpoint: "/users",
        method: "get",
        docs: UserDocsSchemas.list,
        resource: UserResources.list,
    })
}

export function UserHandlerRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "get",
        docs: UserDocsSchemas.get,
        resource: UserResources.get,
    })

    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "put",
        docs: UserDocsSchemas.update,
        resource: UserResources.update,
    })

    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "delete",
        docs: UserDocsSchemas.delete,
        resource: UserResources.delete,
    })
}
