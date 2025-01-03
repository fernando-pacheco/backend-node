import { CartRoutes } from "./routes/cart"
import { ItemCartRoutes } from "./routes/item-cart"
import { OrderRoutes } from "./routes/order"
import { PaymentRoutes } from "./routes/payment"
import { ProductRoutes } from "./routes/product"
import { UserRoutes } from "./routes/user"
import { FastifyTypedInstance } from "./types/types"

export class Routes {
    constructor(
        private user: UserRoutes = new UserRoutes(),
        private product: ProductRoutes = new ProductRoutes(),
        private payment: PaymentRoutes = new PaymentRoutes(),
        private cart: CartRoutes = new CartRoutes(),
        private itemCart: ItemCartRoutes = new ItemCartRoutes(),
        private order: OrderRoutes = new OrderRoutes()
    ) {
        this.user = user
        this.product = product
        this.payment = payment
        this.cart = cart
        this.itemCart = itemCart
        this.order = order
    }

    register = async (app: FastifyTypedInstance) => {
        this.user.registerRoutes(app)
        this.product.registerRoutes(app)
        this.payment.registerRoutes(app)
        this.cart.registerRoutes(app)
        this.itemCart.registerRoutes(app)
        this.order.registerRoutes(app)
    }
}
