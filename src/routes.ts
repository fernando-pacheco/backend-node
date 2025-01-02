import { UserRoutes } from "./routes/user"
import { FastifyTypedInstance } from "./types/types"

export class Routes {
    constructor(private user: UserRoutes = new UserRoutes()) {
        this.user = user
    }

    register = async (app: FastifyTypedInstance) => {
        this.user.registerRoutes(app)
    }
}
