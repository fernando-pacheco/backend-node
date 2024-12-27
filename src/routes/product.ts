import { ProductDocsSchemas } from "../docs/product"
import {
    ProductCreateResource,
    ProductDeleteResource,
    ProductGetResource,
    ProductPutResource,
    ProductsListResource,
} from "../resources/product"
import { FastifyTypedInstance } from "../types"
import { FabricRoute } from "../utils/fabric-route"

export function ProductRegistersRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/product",
        method: "post",
        docs: ProductDocsSchemas.create,
        resource: ProductCreateResource,
    })

    FabricRoute({
        app,
        endpoint: "/product",
        method: "get",
        docs: ProductDocsSchemas.list,
        resource: ProductsListResource,
    })
}

export function ProductHandlerRoutes(app: FastifyTypedInstance) {
    FabricRoute({
        app,
        endpoint: "/product/:id",
        method: "get",
        docs: ProductDocsSchemas.get,
        resource: ProductGetResource,
    })

    FabricRoute({
        app,
        endpoint: "/product/:id",
        method: "put",
        docs: ProductDocsSchemas.update,
        resource: ProductPutResource,
    })

    FabricRoute({
        app,
        endpoint: "/product/:id",
        method: "delete",
        docs: ProductDocsSchemas.delete,
        resource: ProductDeleteResource,
    })
}
