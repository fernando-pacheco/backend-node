export abstract class Resources<T> {
    public abstract create(request: any, reply: any): Promise<void>

    public abstract list(request: any, reply: any): Promise<T[]>

    public abstract get(request: any, reply: any): Promise<void>

    public abstract update(request: any, reply: any): Promise<void>

    public abstract delete(request: any, reply: any): Promise<void>
}
