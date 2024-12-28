import { PaymentRoutes } from "./routes/payment"
import { ProductRoutes } from "./routes/product"
import { UserRoutes } from "./routes/user"
import { FastifyTypedInstance } from "./types"

export class Routes {
    constructor(
        private user: UserRoutes = new UserRoutes(),
        private product: ProductRoutes = new ProductRoutes(),
        private payment: PaymentRoutes = new PaymentRoutes()
    ) {
        this.user = user
        this.product = product
        this.payment = payment
    }

    register = async (app: FastifyTypedInstance) => {
        this.user.registerRoutes(app)
        this.product.registerRoutes(app)
        this.payment.registerRoutes(app)
    }
}
