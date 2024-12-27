import { FastifyReply, FastifyRequest } from "fastify"

export abstract class Resources<T> {
    public abstract create(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void>

    public abstract list(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<T[]>

    public abstract get(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void>

    public abstract update(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void>

    public abstract delete(
        request: FastifyRequest,
        reply: FastifyReply
    ): Promise<void>
}
