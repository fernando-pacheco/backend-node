import { FastifyReply } from "fastify"
import { RequestData } from "../types/resource"

export abstract class Resources<T> {
    public abstract create(
        request: RequestData<T>,
        reply: FastifyReply
    ): Promise<void>

    public abstract get(
        request: RequestData<T>,
        reply: FastifyReply
    ): Promise<void>

    public abstract update(
        request: RequestData<T>,
        reply: FastifyReply
    ): Promise<void>

    public abstract delete(
        request: RequestData<T>,
        reply: FastifyReply
    ): Promise<void>

    protected handleError(
        reply: FastifyReply,
        error: unknown,
        statusCode = 500
    ) {
        const message =
            error instanceof Error ? error.message : "Internal server error."
        reply.status(statusCode).send({ message })
    }
}
