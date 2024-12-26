import {
    FastifyInstance,
    RouteShorthandOptions,
    RouteHandlerMethod,
} from "fastify"
import { FastifyTypedInstance } from "../types"

interface RouteProps {
    app: FastifyTypedInstance
    endpoint: string
    method: "get" | "post" | "put" | "delete"
    docs: RouteShorthandOptions
    resource: RouteHandlerMethod
}

export function FabricRoute({
    app,
    endpoint,
    method,
    docs,
    resource,
}: RouteProps) {
    app[method](endpoint, docs, resource)
}
