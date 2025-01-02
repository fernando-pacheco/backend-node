import { FactoryRouteProps } from "../interfaces/factory-route"

export function FactoryRoute({
    app,
    endpoint,
    method,
    docs,
    resource,
}: FactoryRouteProps) {
    app[method](endpoint, docs, resource)
}
