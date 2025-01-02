import { FastifyRequest } from "fastify"

export type RequestData<Body = unknown> = FastifyRequest<{
    Body: Body
    Params: { id: string }
}>
