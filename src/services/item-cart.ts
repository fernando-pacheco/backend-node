import { PrismaClient, ItemCart } from "@prisma/client"

export class ItemCartServices {
    private ItemCartModel: PrismaClient["itemCart"]

    constructor(private prisma: PrismaClient = new PrismaClient()) {
        this.prisma = prisma
        this.ItemCartModel = this.prisma.itemCart
    }

    async createItemCart(body: ItemCart): Promise<ItemCart> {
        const itemCart = await this.ItemCartModel.create({
            data: {
                product_id: body.product_id,
                cart_id: body.cart_id,
                amount: body.amount,
            },
        })
        return itemCart
    }

    async getItemCartByID(id: string): Promise<ItemCart | null> {
        const itemCart = await this.ItemCartModel.findUnique({
            where: { id },
            include: { product: true },
        })
        return itemCart
    }

    async updateItemCart(id: string, body: ItemCart): Promise<ItemCart> {
        const itemCart = await this.ItemCartModel.update({
            where: { id },
            data: {
                product_id: body.product_id,
                cart_id: body.cart_id,
                amount: body.amount,
            },
        })
        return itemCart
    }

    async deleteItemCart(id: string): Promise<void> {
        await this.ItemCartModel.delete({
            where: { id },
        })
    }
}
