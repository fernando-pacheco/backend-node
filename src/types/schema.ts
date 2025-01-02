import { ZodObject, ZodArray, ZodTypeAny } from "zod"

export type SchemaType = ZodObject<any> | ZodArray<ZodTypeAny>
