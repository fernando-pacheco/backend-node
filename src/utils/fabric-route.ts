import { FabricRouteProps } from "../interfaces/fabric-route"

export function FabricRoute({
    app,
    endpoint,
    method,
    docs,
    resource,
}: FabricRouteProps) {
    app[method](endpoint, docs, resource)
}
