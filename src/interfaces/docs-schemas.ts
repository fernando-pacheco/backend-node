import { FastifySchema } from "fastify"

export abstract class DocsSchemas {
    public abstract get create(): { schema: FastifySchema }
    public abstract get get(): { schema: FastifySchema }
}
