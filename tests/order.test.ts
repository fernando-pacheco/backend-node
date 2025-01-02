import { OrderServices } from "../src/services/order"
import { PrismaClient, Order, Payment, User, Cart } from "@prisma/client"
import { UserServices } from "../src/services/user"
import { CartServices } from "../src/services/cart"
import { PaymentServices } from "../src/services/payment"

jest.mock("../src/services/user")
jest.mock("../src/services/cart")
jest.mock("../src/services/payment")

describe("OrderServices", () => {
    let orderService: OrderServices
    let prismaMock: PrismaClient
    let userServiceMock: UserServices
    let cartServiceMock: CartServices
    let paymentServiceMock: PaymentServices

    beforeEach(() => {
        prismaMock = new PrismaClient()
        userServiceMock = new UserServices(prismaMock)
        cartServiceMock = new CartServices(prismaMock)
        paymentServiceMock = new PaymentServices(prismaMock)

        orderService = new OrderServices(
            prismaMock,
            userServiceMock,
            cartServiceMock,
            paymentServiceMock
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("createOrder", () => {
        it("should create an order", async () => {
            const orderData: Order = {
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            }

            jest.spyOn(prismaMock.order, "create").mockResolvedValue(orderData)

            const result = await orderService.createOrder(orderData)

            expect(prismaMock.order.create).toHaveBeenCalledWith({
                data: {
                    payment_id: orderData.payment_id,
                    cart_id: orderData.cart_id,
                    user_id: orderData.user_id,
                },
            })
            expect(result).toEqual(orderData)
        })
    })

    describe("getOrderByID", () => {
        it("should return an order by ID", async () => {
            const order: Order = {
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            }

            jest.spyOn(prismaMock.order, "findUnique").mockResolvedValue(order)

            const result = await orderService.getOrderByID("1")

            expect(prismaMock.order.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
                include: { payment: true, cart: true, user: true },
            })
            expect(result).toEqual(order)
        })

        it("should return null if order does not exist", async () => {
            jest.spyOn(prismaMock.order, "findUnique").mockResolvedValue(null)

            const result = await orderService.getOrderByID("999")

            expect(prismaMock.order.findUnique).toHaveBeenCalledWith({
                where: { id: "999" },
                include: { payment: true, cart: true, user: true },
            })
            expect(result).toBeNull()
        })
    })

    describe("getUserByOrderID", () => {
        it("should return user information by order ID", async () => {
            const order: Order = {
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            }

            const user: User = {
                id: "user1",
                name: "User One",
                email: "user1@example.com",
                created_at: new Date(),
            }

            jest.spyOn(prismaMock.order, "findUniqueOrThrow").mockResolvedValue(
                order
            )
            jest.spyOn(userServiceMock, "getUserByID").mockResolvedValue(user)

            const result = await orderService.getUserByOrderID("1")

            expect(userServiceMock.getUserByID).toHaveBeenCalledWith("user1")
            expect(result).toEqual(user)
        })
    })

    describe("getPaymentByOrderID", () => {
        it("should return payment information by order ID", async () => {
            const order: Order = {
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            }

            const payment: Payment = {
                id: "payment1",
                type: "CREDIT",
                payment_method: "CREDIT",
                value: 100,
            }

            jest.spyOn(prismaMock.order, "findUniqueOrThrow").mockResolvedValue(
                order
            )
            jest.spyOn(paymentServiceMock, "getPaymentByID").mockResolvedValue(
                payment
            )

            const result = await orderService.getPaymentByOrderID("1")

            expect(paymentServiceMock.getPaymentByID).toHaveBeenCalledWith(
                "payment1"
            )
            expect(result).toEqual(payment)
        })
    })

    describe("getCartByOrderID", () => {
        it("should return cart information by order ID", async () => {
            const order: Order = {
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            }

            const cart: Cart = { id: "cart1" }
            const itemsCart = [
                {
                    id: "item1",
                    product_id: "product1",
                    cart_id: "cart1",
                    amount: 2,
                },
            ]

            jest.spyOn(prismaMock.order, "findUniqueOrThrow").mockResolvedValue(
                order
            )
            jest.spyOn(
                cartServiceMock,
                "listItemsCartByCartID"
            ).mockResolvedValue(itemsCart)

            const result = await orderService.getCartByOrderID("1")

            expect(cartServiceMock.listItemsCartByCartID).toHaveBeenCalledWith(
                "cart1"
            )
            expect(result).toEqual({
                id: "cart1",
                itemsCart,
            })
        })
    })

    describe("getOrderInfo", () => {
        it("should return all order information", async () => {
            const order: Order = {
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            }

            const user: User = {
                id: "user1",
                name: "User One",
                email: "user1@example.com",
                created_at: new Date(),
            }
            const payment: Payment = {
                id: "payment1",
                type: "CREDIT",
                payment_method: "CREDIT",
                value: 100,
            }
            const cart: Cart = { id: "cart1" }
            const itemsCart = [
                {
                    id: "item1",
                    product_id: "product1",
                    cart_id: "cart1",
                    amount: 2,
                },
            ]

            jest.spyOn(prismaMock.order, "findUniqueOrThrow").mockResolvedValue(
                order
            )
            jest.spyOn(paymentServiceMock, "getPaymentByID").mockResolvedValue(
                payment
            )
            jest.spyOn(
                cartServiceMock,
                "listItemsCartByCartID"
            ).mockResolvedValue(itemsCart)
            jest.spyOn(userServiceMock, "getUserByID").mockResolvedValue(user)

            const result = await orderService.getOrderInfo("1")

            expect(result).toEqual({
                id: "1",
                payment,
                cart: { id: "cart1", itemsCart },
                user,
            })
        })
    })

    describe("deleteOrderByID", () => {
        it("should delete an order by ID", async () => {
            jest.spyOn(prismaMock.order, "delete").mockResolvedValue({
                id: "1",
                payment_id: "payment1",
                cart_id: "cart1",
                user_id: "user1",
            })

            await orderService.deleteOrderByID("1")

            expect(prismaMock.order.delete).toHaveBeenCalledWith({
                where: { id: "1" },
            })
        })
    })
})
