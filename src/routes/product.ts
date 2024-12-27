import { ProductDocsSchemas } from "../docs/product"
import { Routes } from "../interfaces/routes"
import { ProductResources } from "../resources/product"
import { FastifyTypedInstance } from "../types"
import { FabricRoute } from "../utils/fabric-route"

export class ProductRoutes extends Routes {
    constructor(
        private resources: ProductResources = new ProductResources(),
        private docsSchema: ProductDocsSchemas = new ProductDocsSchemas()
    ) {
        super()
    }

    public registerRoutes(app: FastifyTypedInstance) {
        this.productRegistersRoutes(app)
        this.productHandlersRoutes(app)
    }

    private productRegistersRoutes(app: FastifyTypedInstance) {
        FabricRoute({
            app,
            endpoint: "/product",
            method: "post",
            docs: this.docsSchema.create,
            resource: this.resources.create,
        })

        FabricRoute({
            app,
            endpoint: "/product",
            method: "get",
            docs: this.docsSchema.list,
            resource: this.resources.list,
        })
    }

    private productHandlersRoutes(app: FastifyTypedInstance) {
        FabricRoute({
            app,
            endpoint: "/product/:id",
            method: "get",
            docs: this.docsSchema.get,
            resource: this.resources.get,
        })

        FabricRoute({
            app,
            endpoint: "/product/:id",
            method: "put",
            docs: this.docsSchema.update,
            resource: this.resources.update,
        })

        FabricRoute({
            app,
            endpoint: "/product/:id",
            method: "delete",
            docs: this.docsSchema.delete,
            resource: this.resources.delete,
        })
    }
}
