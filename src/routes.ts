import { FastifyInstance } from "fastify"
import { UserHandlerRoutes, UserRegistersRoutes } from "./routes/user"
import { PaymentHandlerRoutes, PaymentRegistersRoutes } from "./routes/payment"

export async function routes(app: FastifyInstance) {
    // Users
    UserRegistersRoutes(app)
    UserHandlerRoutes(app)

    // Payments
    PaymentRegistersRoutes(app)
    PaymentHandlerRoutes(app)
}
