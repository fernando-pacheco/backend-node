import { ItemCart, PrismaClient, Cart } from "@prisma/client"

export class CartServices {
    private CartModel: PrismaClient["cart"]
    private ItemCartModel: PrismaClient["itemCart"]

    constructor(private prisma: PrismaClient = new PrismaClient()) {
        this.prisma = prisma
        this.CartModel = this.prisma.cart
        this.ItemCartModel = this.prisma.itemCart
    }

    async createCart(): Promise<Cart> {
        const cart = await this.CartModel.create({
            data: {},
            select: {
                id: true,
            },
        })
        return cart
    }

    async getCartByID(id: string): Promise<Cart | null> {
        const cart = await this.CartModel.findUnique({
            where: { id },
        })
        return cart
    }

    async getCarts(): Promise<Cart[]> {
        const carts = await this.CartModel.findMany()
        return carts
    }

    async listItemsCartByCartID(id: string): Promise<ItemCart[]> {
        const itemsCart = await this.ItemCartModel.findMany({
            where: { cart_id: id },
        })
        return itemsCart
    }

    async deleteCartByID(id: string): Promise<void> {
        await this.CartModel.delete({
            where: { id },
        })
    }

    async cleanCartByID(id: string): Promise<void> {
        await this.ItemCartModel.deleteMany({
            where: { cart_id: id },
        })
    }
}
