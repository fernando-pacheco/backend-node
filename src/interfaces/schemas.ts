import { z, ZodObject } from "zod"

export abstract class Schemas {
    abstract get response(): ZodObject<any>
    abstract get create(): ZodObject<any>
    abstract get update(): ZodObject<any>
    abstract get idParams(): ZodObject<any>
}
