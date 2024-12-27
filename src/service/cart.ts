import { PrismaClient } from "@prisma/client"

export class CartService {
    private CartModel: PrismaClient["cart"]

    constructor(private prisma: PrismaClient = new PrismaClient()) {
        this.prisma = prisma
        this.CartModel = this.prisma.cart
    }

    async createCart() {
        const cart = await this.CartModel.create({})
        return cart
    }
}
