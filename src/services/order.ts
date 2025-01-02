import { Order, Payment, PrismaClient, User } from "@prisma/client"
import { UserServices } from "./user"
import { CartServices } from "./cart"
import { PaymentServices } from "./payment"

export class OrderServices {
    private OrderModel: PrismaClient["order"]

    constructor(
        private prisma: PrismaClient = new PrismaClient(),
        private userService: UserServices = new UserServices(),
        private cartService: CartServices = new CartServices(),
        private paymentService: PaymentServices = new PaymentServices()
    ) {
        this.prisma = prisma
        this.OrderModel = this.prisma.order
        this.userService = userService
        this.paymentService = paymentService
        this.cartService = cartService
    }

    async createOrder(body: Order): Promise<Order> {
        const order = await this.OrderModel.create({
            data: {
                payment_id: body.payment_id,
                cart_id: body.cart_id,
                user_id: body.user_id,
            },
        })

        return order
    }

    async getOrderByID(id: string): Promise<Order | null> {
        const order = await this.OrderModel.findUnique({
            where: { id },
        })

        return order
    }

    async getUserByOrderID(id: string): Promise<User | null> {
        const { user_id } = await this.OrderModel.findUniqueOrThrow({
            where: { id },
        })

        return await this.userService.getUserByID(user_id)
    }

    async getPaymentByOrderID(id: string): Promise<Payment | null> {
        const { payment_id } = await this.OrderModel.findUniqueOrThrow({
            where: { id },
        })

        return await this.paymentService.getPaymentByID(payment_id)
    }

    async getCartByOrderID(id: string): Promise<Object> {
        const { cart_id } = await this.OrderModel.findUniqueOrThrow({
            where: { id },
        })

        return {
            id: cart_id,
            itemsCart: await this.cartService.listItemsCartByCartID(cart_id),
        }
    }

    async getOrderInfo(id: string): Promise<Object> {
        return {
            id: id,
            payment: await this.getPaymentByOrderID(id),
            cart: await this.getCartByOrderID(id),
            user: await this.getUserByOrderID(id),
        }
    }

    async deleteOrderByID(id: string): Promise<void> {
        await this.OrderModel.delete({
            where: { id },
        })
    }
}
