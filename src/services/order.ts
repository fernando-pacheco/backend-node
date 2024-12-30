import { Order, PrismaClient } from "@prisma/client"
import { UserServices } from "./user"
import { CartServices } from "./cart"
import { PaymentServices } from "./payment"

export class OrderServices {
    private OrderModel: PrismaClient["order"]
    private UserModel: PrismaClient["user"]
    private CartModel: PrismaClient["cart"]
    private PaymentModel: PrismaClient["payment"]

    //! Avaliar uso da service diretamente ao inves de instanciar o banco
    constructor(
        private prisma: PrismaClient = new PrismaClient(),
        private userService: UserServices = new UserServices(),
        private cartService: CartServices = new CartServices(),
        private paymentService: PaymentServices = new PaymentServices()
    ) {
        this.prisma = prisma
        this.OrderModel = this.prisma.order
        this.UserModel = this.prisma.user
        this.CartModel = this.prisma.cart
        this.PaymentModel = this.prisma.payment

        //Services
        this.userService = userService
        this.paymentService = paymentService
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

    async getOrdersByUserID() {}

    async getOrderByID() {}

    async deleteOrderByID() {}

    async getPaymentInfo() {}

    async getCartInfo() {}

    async getUserInfo() {}

    async getOrderInfo() {}
}
