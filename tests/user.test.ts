import {
    createUser,
    deleteUserByID,
    getUserByID,
    getUsers,
    updateUser,
} from "../src/models/user"
import {
    UserCreateResource,
    UserDeleteResource,
    UserGetResource,
    UserListResource,
    UserPutResource,
} from "../src/resources/user"
import { UserResponseSchema } from "../src/schemas/user"

jest.mock("../src/models/user") // Mock das funções do modelo

describe("UserListResource", () => {
    it("should return a list of users", async () => {
        const mockUsers = [
            { id: "1", name: "John Doe", email: "john@example.com" },
            { id: "2", name: "Jane Doe", email: "jane@example.com" },
        ]

        ;(getUsers as jest.Mock).mockResolvedValue(mockUsers) // Mocka a função getUsers para retornar mockUsers

        const result = await UserListResource() // Chama o recurso

        expect(getUsers).toHaveBeenCalledTimes(1) // Verifica se getUsers foi chamado uma vez
        expect(result).toEqual(mockUsers) // Verifica se a resposta é a esperada
    })
})

describe("UserCreateResource", () => {
    it("should create a user and return it with status 201", async () => {
        const requestBody = { name: "John Doe", email: "john@example.com" }
        const mockUser = { id: "1", ...requestBody }

        ;(createUser as jest.Mock).mockResolvedValue(mockUser) // Mocka a função createUser para retornar mockUser

        const mockRequest = { body: requestBody }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserCreateResource(mockRequest, mockReply) // Chama o recurso

        expect(createUser).toHaveBeenCalledWith(requestBody) // Verifica se a função foi chamada com o corpo correto
        expect(mockReply.status).toHaveBeenCalledWith(201) // Verifica se a resposta tem status 201
        expect(mockReply.send).toHaveBeenCalledWith(mockUser) // Verifica se o mockUser foi enviado
    })
})

describe("UserGetResource", () => {
    it("should return a user if found", async () => {
        const mockUser = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        }

        ;(getUserByID as jest.Mock).mockResolvedValue(mockUser) // Mocka a função getUserByID para retornar mockUser

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserGetResource(mockRequest, mockReply) // Chama o recurso

        expect(getUserByID).toHaveBeenCalledWith("1") // Verifica se a função foi chamada com o ID correto
        expect(mockReply.status).toHaveBeenCalledWith(200) // Verifica se a resposta tem status 200
        expect(mockReply.send).toHaveBeenCalledWith(
            UserResponseSchema.parse(mockUser)
        ) // Verifica se o mockUser foi enviado
    })

    it("should return 404 if user is not found", async () => {
        ;(getUserByID as jest.Mock).mockResolvedValue(null) // Simula que o usuário não foi encontrado

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserGetResource(mockRequest, mockReply) // Chama o recurso

        expect(mockReply.status).toHaveBeenCalledWith(404) // Verifica se a resposta tem status 404
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "User not found.",
        }) // Verifica a mensagem de erro
    })
})

describe("UserPutResource", () => {
    it("should update a user and return the updated user", async () => {
        const mockUser = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        }
        const updatedUser = {
            id: "1",
            name: "John Doe",
            email: "john@newdomain.com",
        }

        ;(getUserByID as jest.Mock).mockResolvedValue(mockUser) // Mocka a função getUserByID
        ;(updateUser as jest.Mock).mockResolvedValue(updatedUser) // Mocka a função updateUser

        const mockRequest = {
            params: { id: "1" },
            body: { email: "john@newdomain.com" },
        }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserPutResource(mockRequest, mockReply) // Chama o recurso

        expect(getUserByID).toHaveBeenCalledWith("1") // Verifica se a função foi chamada com o ID correto
        expect(updateUser).toHaveBeenCalledWith("1", {
            email: "john@newdomain.com",
        }) // Verifica se a função foi chamada com o corpo correto
        expect(mockReply.status).toHaveBeenCalledWith(200) // Verifica se a resposta tem status 200
        expect(mockReply.send).toHaveBeenCalledWith(updatedUser) // Verifica se o usuário atualizado foi enviado
    })

    it("should return 400 if the body is empty", async () => {
        const mockRequest = { params: { id: "1" }, body: {} }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserPutResource(mockRequest, mockReply) // Chama o recurso

        expect(mockReply.status).toHaveBeenCalledWith(400) // Verifica se a resposta tem status 400
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Empty body." }) // Verifica a mensagem de erro
    })
})

describe("UserDeleteResource", () => {
    it("should delete a user", async () => {
        const mockUser = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        }

        ;(getUserByID as jest.Mock).mockResolvedValue(mockUser) // Mocka a função getUserByID
        ;(deleteUserByID as jest.Mock).mockResolvedValue(undefined) // Mocka a função deleteUserByID

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserDeleteResource(mockRequest, mockReply) // Chama o recurso

        expect(getUserByID).toHaveBeenCalledWith("1") // Verifica se a função foi chamada com o ID correto
        expect(deleteUserByID).toHaveBeenCalledWith("1") // Verifica se a função foi chamada com o ID correto
        expect(mockReply.status).toHaveBeenCalledWith(200) // Verifica se a resposta tem status 200
        expect(mockReply.send).toHaveBeenCalledWith({
            message: `User {1} successfully deleted.`,
        }) // Verifica a mensagem de sucesso
    })
})
