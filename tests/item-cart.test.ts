import { ItemCartServices } from "../src/services/item-cart"
import { PrismaClient, ItemCart } from "@prisma/client"

describe("ItemCartServices", () => {
    let itemCartService: ItemCartServices
    let prismaMock: PrismaClient

    beforeEach(() => {
        prismaMock = new PrismaClient()
        itemCartService = new ItemCartServices(prismaMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("createItemCart", () => {
        it("should create an item in the cart", async () => {
            const itemCartData: ItemCart = {
                id: "1",
                product_id: "product1",
                cart_id: "cart1",
                amount: 2,
            }

            jest.spyOn(prismaMock.itemCart, "create").mockResolvedValue(
                itemCartData
            )

            const result = await itemCartService.createItemCart(itemCartData)

            expect(prismaMock.itemCart.create).toHaveBeenCalledWith({
                data: {
                    product_id: itemCartData.product_id,
                    cart_id: itemCartData.cart_id,
                    amount: itemCartData.amount,
                },
            })
            expect(result).toEqual(itemCartData)
        })
    })

    describe("getItemCartByID", () => {
        it("should return an item from the cart by ID", async () => {
            const itemCart: ItemCart = {
                id: "1",
                product_id: "product1",
                cart_id: "cart1",
                amount: 2,
            }

            jest.spyOn(prismaMock.itemCart, "findUnique").mockResolvedValue(
                itemCart
            )

            const result = await itemCartService.getItemCartByID("1")

            expect(prismaMock.itemCart.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
                include: { product: true },
            })
            expect(result).toEqual(itemCart)
        })

        it("should return null if item does not exist", async () => {
            jest.spyOn(prismaMock.itemCart, "findUnique").mockResolvedValue(
                null
            )

            const result = await itemCartService.getItemCartByID("999")

            expect(prismaMock.itemCart.findUnique).toHaveBeenCalledWith({
                where: { id: "999" },
                include: { product: true },
            })
            expect(result).toBeNull()
        })
    })

    describe("updateItemCart", () => {
        it("should update an item in the cart", async () => {
            const updatedItemCart: ItemCart = {
                id: "1",
                product_id: "product1",
                cart_id: "cart1",
                amount: 3,
            }

            jest.spyOn(prismaMock.itemCart, "update").mockResolvedValue(
                updatedItemCart
            )

            const result = await itemCartService.updateItemCart(
                "1",
                updatedItemCart
            )

            expect(prismaMock.itemCart.update).toHaveBeenCalledWith({
                where: { id: "1" },
                data: {
                    product_id: updatedItemCart.product_id,
                    cart_id: updatedItemCart.cart_id,
                    amount: updatedItemCart.amount,
                },
            })
            expect(result).toEqual(updatedItemCart)
        })
    })

    describe("deleteItemCart", () => {
        it("should delete an item from the cart by ID", async () => {
            jest.spyOn(prismaMock.itemCart, "delete").mockResolvedValue({
                id: "1",
                product_id: "product1",
                cart_id: "cart1",
                amount: 2,
            })

            await itemCartService.deleteItemCart("1")

            expect(prismaMock.itemCart.delete).toHaveBeenCalledWith({
                where: { id: "1" },
            })
        })
    })
})
