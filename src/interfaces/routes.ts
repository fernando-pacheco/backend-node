import { FastifyTypedInstance } from "../types"

export abstract class Routes {
    public abstract registerRoutes(app: FastifyTypedInstance): void
}
