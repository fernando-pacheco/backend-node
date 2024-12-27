import { z, ZodArray } from "zod"

export abstract class Schemas {
    abstract get response(): object
    abstract listResponse?: ZodArray<any>
    abstract get create(): object
    abstract get update(): object
    abstract get idParams(): object
}
