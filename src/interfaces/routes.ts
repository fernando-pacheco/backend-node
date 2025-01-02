import { FastifyTypedInstance } from "../types/types"

export abstract class Routes {
    public abstract registerRoutes(app: FastifyTypedInstance): void
}
