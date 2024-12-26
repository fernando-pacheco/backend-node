import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
    jsonSchemaTransform,
} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { routes } from "./routes"

const app = fastify().withTypeProvider<ZodTypeProvider>()
const AMB = process.env.NODE_ENV === "qa" ? "Homologação" : "Produção"

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: `TypedAPI - ${AMB}`,
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
    routePrefix: "/api",
})
app.register(fastifyCors, { origin: "*" })

app.listen({
    port: Number(process.env.API_PORT),
    path: process.env.API_URL,
}).then(() => {
    console.log("HTTP server running!")
})

app.register(routes)
