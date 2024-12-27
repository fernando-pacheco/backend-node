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

jest.mock("../src/models/user")

describe("UserListResource", () => {
    it("should return a list of users", async () => {
        const mockUsers = [
            { id: "1", name: "John Doe", email: "john@example.com" },
            { id: "2", name: "Jane Doe", email: "jane@example.com" },
        ]

        ;(getUsers as jest.Mock).mockResolvedValue(mockUsers)
        const result = await UserListResource()

        expect(getUsers).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockUsers)
    })
})

describe("UserCreateResource", () => {
    it("should create a user and return it with status 201", async () => {
        const requestBody = { name: "John Doe", email: "john@example.com" }
        const mockUser = { id: "1", ...requestBody }

        ;(createUser as jest.Mock).mockResolvedValue(mockUser)

        const mockRequest = { body: requestBody }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserCreateResource(mockRequest, mockReply)

        expect(createUser).toHaveBeenCalledWith(requestBody)
        expect(mockReply.status).toHaveBeenCalledWith(201)
        expect(mockReply.send).toHaveBeenCalledWith(mockUser)
    })
})

describe("UserGetResource", () => {
    it("should return a user if found", async () => {
        const mockUser = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        }

        ;(getUserByID as jest.Mock).mockResolvedValue(mockUser)

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserGetResource(mockRequest, mockReply)

        expect(getUserByID).toHaveBeenCalledWith("1")
        expect(mockReply.status).toHaveBeenCalledWith(200)
        expect(mockReply.send).toHaveBeenCalledWith(
            UserResponseSchema.parse(mockUser)
        )
    })

    it("should return 404 if user is not found", async () => {
        ;(getUserByID as jest.Mock).mockResolvedValue(null)

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserGetResource(mockRequest, mockReply)

        expect(mockReply.status).toHaveBeenCalledWith(404)
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "User not found.",
        })
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

        ;(getUserByID as jest.Mock).mockResolvedValue(mockUser)
        ;(updateUser as jest.Mock).mockResolvedValue(updatedUser)

        const mockRequest = {
            params: { id: "1" },
            body: { email: "john@newdomain.com" },
        }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserPutResource(mockRequest, mockReply)

        expect(getUserByID).toHaveBeenCalledWith("1")
        expect(updateUser).toHaveBeenCalledWith("1", {
            email: "john@newdomain.com",
        })
        expect(mockReply.status).toHaveBeenCalledWith(200)
        expect(mockReply.send).toHaveBeenCalledWith(updatedUser)
    })

    it("should return 400 if the body is empty", async () => {
        const mockRequest = { params: { id: "1" }, body: {} }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserPutResource(mockRequest, mockReply)

        expect(mockReply.status).toHaveBeenCalledWith(400)
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Empty body." })
    })
})

describe("UserDeleteResource", () => {
    it("should delete a user", async () => {
        const mockUser = {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
        }

        ;(getUserByID as jest.Mock).mockResolvedValue(mockUser)
        ;(deleteUserByID as jest.Mock).mockResolvedValue(undefined)

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserDeleteResource(mockRequest, mockReply)

        expect(getUserByID).toHaveBeenCalledWith("1")
        expect(deleteUserByID).toHaveBeenCalledWith("1")
        expect(mockReply.status).toHaveBeenCalledWith(200)
        expect(mockReply.send).toHaveBeenCalledWith({
            message: `User {1} successfully deleted.`,
        })
    })

    it("should return 404 if user to delete is not found", async () => {
        ;(getUserByID as jest.Mock).mockResolvedValue(null)

        const mockRequest = { params: { id: "1" } }
        const mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }

        await UserDeleteResource(mockRequest, mockReply)

        expect(mockReply.status).toHaveBeenCalledWith(404)
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "User not found.",
        })
    })
})
