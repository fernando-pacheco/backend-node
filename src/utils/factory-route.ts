import { FactoryRouteProps } from "../interfaces/fabric-route"

export function FactoryRoute({
    app,
    endpoint,
    method,
    docs,
    resource,
}: FactoryRouteProps) {
    app[method](endpoint, docs, resource)
}
