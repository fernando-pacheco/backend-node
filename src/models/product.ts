import { PrismaClient } from "@prisma/client"
import { ProductProps } from "../interfaces/product"

const prisma = new PrismaClient()
const ProductModel = prisma.product

export async function createProduct(body: ProductProps) {
    const product = await ProductModel.create({
        data: {
            name: body.name,
            price: body.price,
        },
    })

    return product
}

export async function getProducts() {
    const products = await ProductModel.findMany()
    return products
}

export async function getProductByID(id: string) {
    const product = await ProductModel.findUnique({
        where: { id },
    })

    return product
}

export async function updateProduct(
    id: string,
    body: ProductProps
): Promise<ProductProps> {
    const product = await ProductModel.update({
        where: { id },
        data: {
            name: body.name,
            price: body.price,
        },
    })

    return product
}

export async function deleteProductByID(id: string) {
    await ProductModel.delete({
        where: { id },
    })
}
