import { FastifyInstance } from "fastify"
import { ProductRoutes } from "./routes/product"

export class Routes {
    constructor(private product: ProductRoutes = new ProductRoutes()) {
        this.product = product
    }

    register = async (app: FastifyInstance) => {
        this.product.registerRoutes(app)
    }
}
