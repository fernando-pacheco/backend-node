import { fastify, FastifyInstance } from "fastify"
import { fastifyCors } from "@fastify/cors"
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
    jsonSchemaTransform,
} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { Routes } from "./routes"

class Server {
    private AMB: string

    constructor(
        private app: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>(),
        private routes: Routes = new Routes(),
        private environments: Record<string, string> = {
            qa: "Homologação",
            prod: "Produção",
        }
    ) {
        this.app = app
        this.routes = routes
        this.AMB = this.environments[process.env.NODE_ENV || "qa"]

        this.configure()
        this.registerRoutes()
    }

    private configure() {
        this.app.setValidatorCompiler(validatorCompiler)
        this.app.setSerializerCompiler(serializerCompiler)

        this.app.register(fastifySwagger, {
            openapi: {
                info: {
                    title: `TypedAPI - ${this.AMB}`,
                    version: "1.0.0",
                },
            },
            transform: jsonSchemaTransform,
        })

        this.app.register(fastifySwaggerUi, {
            routePrefix: "/api",
        })

        this.app.register(fastifyCors, { origin: "*" })
    }

    private registerRoutes() {
        this.app.register(this.routes.register)
    }

    public async start() {
        try {
            const port = Number(process.env.API_PORT)
            const path = process.env.API_URL

            await this.app.listen({ port, path })
            console.log(`HTTP server running on http://${path}:${port}`)
        } catch (err) {
            console.error("Error starting server:", err)
            process.exit(1)
        }
    }
}

const server = new Server()
server.start()
