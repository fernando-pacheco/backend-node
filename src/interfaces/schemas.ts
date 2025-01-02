import { SchemaType } from "../types/schema"

export abstract class Schemas {
    public abstract readonly response: SchemaType
    public abstract readonly create: SchemaType
    public abstract readonly update: SchemaType
    public abstract readonly idParams: SchemaType
}
