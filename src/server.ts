import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
    validatorCompiler,
    serializerCompiler,
} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "TypedAPI",
            version: "1.0.0",
        },
    },
})
app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})
app.register(fastifyCors, { origin: "*" })

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running!")
})

app.get("/", () => {
    return "HelloWorld"
})
