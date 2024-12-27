import { PrismaClient, Product } from "@prisma/client"

export class ProductService {
    private ProductModel: PrismaClient["product"]

    constructor(private prisma: PrismaClient = new PrismaClient()) {
        this.prisma = prisma
        this.ProductModel = this.prisma.product
    }

    async createProduct(body: Product): Promise<Product> {
        const product = await this.ProductModel.create({
            data: {
                name: body.name,
                price: body.price,
            },
        })
        return product
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.ProductModel.findMany()
        return products
    }

    async getProductByID(id: string): Promise<Product | null> {
        const product = await this.ProductModel.findUnique({
            where: { id },
        })
        return product
    }

    async updateProduct(id: string, body: Product): Promise<Product> {
        const product = await this.ProductModel.update({
            where: { id },
            data: {
                name: body.name,
                price: body.price,
            },
        })
        return product
    }

    async deleteProductByID(id: string): Promise<void> {
        await this.ProductModel.delete({
            where: { id },
        })
    }
}
