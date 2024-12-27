import { ProductRoutes } from "./routes/product"
import { FastifyTypedInstance } from "./types"

export class Routes {
    constructor(private product: ProductRoutes = new ProductRoutes()) {
        this.product = product
    }

    register = async (app: FastifyTypedInstance) => {
        this.product.registerRoutes(app)
    }
}
