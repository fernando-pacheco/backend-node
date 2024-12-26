import { FabricRoute } from "../utils/fabric-route"
import {
    UserGetRouteSchema,
    UserCreateRouteSchema,
    UserListRouteSchema,
    UserDeleteRouteSchema,
    UserPutRouteSchema,
} from "./schemas/user"
import {
    UserCreateResource,
    UserDeleteResource,
    UserGetResource,
    UserListResource,
    UserPutResource,
} from "../resources/user"
import { FastifyTypedInstance } from "../types"

export function UserListRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/users",
        method: "get",
        docs: UserListRouteSchema,
        resource: UserListResource,
    })

    FabricRoute({
        app,
        endpoint: "/users",
        method: "post",
        docs: UserCreateRouteSchema,
        resource: UserCreateResource,
    })
}

export function UserRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "get",
        docs: UserGetRouteSchema,
        resource: UserGetResource,
    })

    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "put",
        docs: UserPutRouteSchema,
        resource: UserPutResource,
    })

    FabricRoute({
        app,
        endpoint: "/users/:id",
        method: "delete",
        docs: UserDeleteRouteSchema,
        resource: UserDeleteResource,
    })
}
