import { FastifyInstance } from "fastify"
import { UserHandlerRoutes, UserRegistersRoutes } from "./routes/user"

export async function routes(app: FastifyInstance) {
    UserRegistersRoutes(app)
    UserHandlerRoutes(app)
}
