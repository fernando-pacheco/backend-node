import { FastifySchema } from "fastify"

export abstract class DocsSchemas {
    public abstract create: { schema: FastifySchema }
    public abstract get: { schema: FastifySchema }
    public abstract list?: { schema: FastifySchema }
    public abstract update?: { schema: FastifySchema }
    public abstract delete?: { schema: FastifySchema }
}
