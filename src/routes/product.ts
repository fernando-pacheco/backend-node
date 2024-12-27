import { ProductDocsSchemas } from "../docs/product"
import { ProductResources } from "../resources/product"
import { FastifyTypedInstance } from "../types"
import { FabricRoute } from "../utils/fabric-route"

export function ProductRegistersRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/product",
        method: "post",
        docs: ProductDocsSchemas.create,
        resource: ProductResources.create,
    })

    FabricRoute({
        app,
        endpoint: "/product",
        method: "get",
        docs: ProductDocsSchemas.list,
        resource: ProductResources.list,
    })
}

export function ProductHandlerRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/product/:id",
        method: "get",
        docs: ProductDocsSchemas.get,
        resource: ProductResources.get,
    })

    FabricRoute({
        app,
        endpoint: "/product/:id",
        method: "put",
        docs: ProductDocsSchemas.update,
        resource: ProductResources.update,
    })

    FabricRoute({
        app,
        endpoint: "/product/:id",
        method: "delete",
        docs: ProductDocsSchemas.delete,
        resource: ProductResources.delete,
    })
}
