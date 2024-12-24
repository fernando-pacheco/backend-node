import { FastifyInstance } from "fastify"
import { UserListRoutes, UserRoutes } from "./routes/user"

export async function routes(app: FastifyInstance) {
    UserListRoutes(app)
    UserRoutes(app)
}
