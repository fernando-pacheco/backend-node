import { UserServices } from "../src/services/user"
import { PrismaClient, User, Order } from "@prisma/client"

describe("UserServices", () => {
    let userService: UserServices
    let prismaMock: PrismaClient

    beforeEach(() => {
        prismaMock = new PrismaClient()
        userService = new UserServices(prismaMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("createUser", () => {
        it("should create a user", async () => {
            const userData: User = {
                id: "1",
                name: "Test User",
                email: "testuser@example.com",
                created_at: new Date(),
            }

            jest.spyOn(prismaMock.user, "create").mockResolvedValue(userData)

            const result = await userService.createUser(userData)

            expect(prismaMock.user.create).toHaveBeenCalledWith({
                data: {
                    name: userData.name,
                    email: userData.email,
                },
            })
            expect(result).toEqual(userData)
        })
    })

    describe("getUsers", () => {
        it("should return a list of users", async () => {
            const users: User[] = [
                {
                    id: "1",
                    name: "User 1",
                    email: "user1@example.com",
                    created_at: new Date(),
                },
                {
                    id: "2",
                    name: "User 2",
                    email: "user2@example.com",
                    created_at: new Date(),
                },
            ]

            jest.spyOn(prismaMock.user, "findMany").mockResolvedValue(users)

            const result = await userService.getUsers()

            expect(prismaMock.user.findMany).toHaveBeenCalled()
            expect(result).toEqual(users)
        })
    })

    describe("getUserByID", () => {
        it("should return a user by ID", async () => {
            const user: User = {
                id: "1",
                name: "Test User",
                email: "testuser@example.com",
                created_at: new Date(),
            }

            jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(user)

            const result = await userService.getUserByID("1")

            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            })
            expect(result).toEqual(user)
        })

        it("should return null if user does not exist", async () => {
            jest.spyOn(prismaMock.user, "findUnique").mockResolvedValue(null)

            const result = await userService.getUserByID("999")

            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: "999" },
            })
            expect(result).toBeNull()
        })
    })

    describe("updateUser", () => {
        it("should update a user", async () => {
            const updatedUser: User = {
                id: "1",
                name: "Updated User",
                email: "updateduser@example.com",
                created_at: new Date(),
            }

            jest.spyOn(prismaMock.user, "update").mockResolvedValue(updatedUser)

            const result = await userService.updateUser("1", updatedUser)

            expect(prismaMock.user.update).toHaveBeenCalledWith({
                where: { id: "1" },
                data: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                },
            })
            expect(result).toEqual(updatedUser)
        })
    })

    describe("deleteUserByID", () => {
        it("should delete a user by ID", async () => {
            jest.spyOn(prismaMock.user, "delete").mockResolvedValue({
                id: "1",
                name: "Deleted User",
                email: "deleteduser@example.com",
                created_at: new Date(),
            })

            await userService.deleteUserByID("1")

            expect(prismaMock.user.delete).toHaveBeenCalledWith({
                where: { id: "1" },
            })
        })
    })

    describe("getOrdersByUserID", () => {
        it("should return a list of orders for a user", async () => {
            const orders: Order[] = [
                {
                    id: "1",
                    user_id: "1",
                    cart_id: "",
                    payment_id: "",
                    created_at: new Date(),
                },
                {
                    id: "2",
                    user_id: "1",
                    cart_id: "",
                    payment_id: "",
                    created_at: new Date(),
                },
            ]

            jest.spyOn(prismaMock.order, "findMany").mockResolvedValue(orders)

            const result = await userService.getOrdersByUserID("1")

            expect(prismaMock.order.findMany).toHaveBeenCalledWith({
                where: { user_id: "1" },
                include: { cart: true, payment: true, user: true },
            })
            expect(result).toEqual(orders)
        })
    })
})
