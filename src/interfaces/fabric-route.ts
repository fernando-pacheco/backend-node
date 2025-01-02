import { RouteShorthandOptions, RouteHandlerMethod } from "fastify"
import { FastifyTypedInstance } from "../types/types"

export interface FabricRouteProps {
    app: FastifyTypedInstance
    endpoint: string
    method: "get" | "post" | "put" | "delete"
    docs: RouteShorthandOptions
    resource: RouteHandlerMethod
}
