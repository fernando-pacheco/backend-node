import { CartServices } from "../src/services/cart"
import { PrismaClient, Cart, ItemCart } from "@prisma/client"

describe("CartServices", () => {
    let cartService: CartServices
    let prismaMock: PrismaClient

    beforeEach(() => {
        prismaMock = new PrismaClient()
        cartService = new CartServices(prismaMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("createCart", () => {
        it("should create a cart", async () => {
            const cartData: Cart = {
                id: "1",
            }

            jest.spyOn(prismaMock.cart, "create").mockResolvedValue(cartData)

            const result = await cartService.createCart()

            expect(prismaMock.cart.create).toHaveBeenCalledWith({
                data: {},
                select: { id: true },
            })
            expect(result).toEqual(cartData)
        })
    })

    describe("getCartByID", () => {
        it("should return a cart by ID", async () => {
            const cart: Cart = {
                id: "1",
            }

            jest.spyOn(prismaMock.cart, "findUnique").mockResolvedValue(cart)

            const result = await cartService.getCartByID("1")

            expect(prismaMock.cart.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            })
            expect(result).toEqual(cart)
        })

        it("should return null if cart does not exist", async () => {
            jest.spyOn(prismaMock.cart, "findUnique").mockResolvedValue(null)

            const result = await cartService.getCartByID("999")

            expect(prismaMock.cart.findUnique).toHaveBeenCalledWith({
                where: { id: "999" },
            })
            expect(result).toBeNull()
        })
    })

    describe("getCarts", () => {
        it("should return a list of carts", async () => {
            const carts: Cart[] = [{ id: "1" }, { id: "2" }]

            jest.spyOn(prismaMock.cart, "findMany").mockResolvedValue(carts)

            const result = await cartService.getCarts()

            expect(prismaMock.cart.findMany).toHaveBeenCalled()
            expect(result).toEqual(carts)
        })
    })

    describe("listItemsCartByCartID", () => {
        it("should return a list of items in the cart", async () => {
            const itemsCart: ItemCart[] = [
                { id: "1", cart_id: "1", product_id: "product1", amount: 2 },
                { id: "2", cart_id: "1", product_id: "product2", amount: 3 },
            ]

            jest.spyOn(prismaMock.itemCart, "findMany").mockResolvedValue(
                itemsCart
            )

            const result = await cartService.listItemsCartByCartID("1")

            expect(prismaMock.itemCart.findMany).toHaveBeenCalledWith({
                where: { cart_id: "1" },
                include: { product: true },
            })
            expect(result).toEqual(itemsCart)
        })
    })

    describe("deleteCartByID", () => {
        it("should delete a cart by ID", async () => {
            jest.spyOn(prismaMock.cart, "delete").mockResolvedValue({
                id: "1",
            })

            await cartService.deleteCartByID("1")

            expect(prismaMock.cart.delete).toHaveBeenCalledWith({
                where: { id: "1" },
            })
        })
    })

    describe("cleanCartByID", () => {
        it("should clean all items in a cart", async () => {
            jest.spyOn(prismaMock.itemCart, "deleteMany").mockResolvedValue({
                count: 0,
            })

            await cartService.cleanCartByID("1")

            expect(prismaMock.itemCart.deleteMany).toHaveBeenCalledWith({
                where: { cart_id: "1" },
            })
        })
    })
})
