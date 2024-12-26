import { FabricRoute } from "../utils/fabric-route"
import {
    UserGetDocSchema,
    UserCreateDocSchema,
    UserListDocSchema,
    UserDeleteDocSchema,
    UserPutDocSchema,
} from "../docs/user"
import {
    UserCreateResource,
    UserDeleteResource,
    UserGetResource,
    UserListResource,
    UserPutResource,
} from "../resources/user"
import { FastifyTypedInstance } from "../types"

export function UserRegistersRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/users",
        method: "get",
        docs: UserListDocSchema,
        resource: UserListResource,
    })

    FabricRoute({
        app,
        endpoint: "/users",
        method: "post",
        docs: UserCreateDocSchema,
        resource: UserCreateResource,
    })
}

export function UserHandlerRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "get",
        docs: UserGetDocSchema,
        resource: UserGetResource,
    })

    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "put",
        docs: UserPutDocSchema,
        resource: UserPutResource,
    })

    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "delete",
        docs: UserDeleteDocSchema,
        resource: UserDeleteResource,
    })
}
