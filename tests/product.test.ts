import { ProductServices } from "../src/services/product"
import { PrismaClient, Product } from "@prisma/client"

describe("ProductServices", () => {
    let productService: ProductServices
    let prismaMock: PrismaClient

    beforeEach(() => {
        prismaMock = new PrismaClient()
        productService = new ProductServices(prismaMock)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("createProduct", () => {
        it("should create a product", async () => {
            const productData: Product = {
                id: "1",
                name: "Test Product",
                price: 100,
            }

            jest.spyOn(prismaMock.product, "create").mockResolvedValue(
                productData
            )

            const result = await productService.createProduct(productData)

            expect(prismaMock.product.create).toHaveBeenCalledWith({
                data: {
                    name: productData.name,
                    price: productData.price,
                },
            })
            expect(result).toEqual(productData)
        })
    })

    describe("getProducts", () => {
        it("should return a list of products", async () => {
            const products: Product[] = [
                { id: "1", name: "Product 1", price: 100 },
                { id: "2", name: "Product 2", price: 200 },
            ]

            jest.spyOn(prismaMock.product, "findMany").mockResolvedValue(
                products
            )

            const result = await productService.getProducts()

            expect(prismaMock.product.findMany).toHaveBeenCalled()
            expect(result).toEqual(products)
        })
    })

    describe("getProductByID", () => {
        it("should return a product by ID", async () => {
            const product: Product = {
                id: "1",
                name: "Test Product",
                price: 100,
            }

            jest.spyOn(prismaMock.product, "findUnique").mockResolvedValue(
                product
            )

            const result = await productService.getProductByID("1")

            expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            })
            expect(result).toEqual(product)
        })

        it("should return null if product does not exist", async () => {
            jest.spyOn(prismaMock.product, "findUnique").mockResolvedValue(null)

            const result = await productService.getProductByID("999")

            expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
                where: { id: "999" },
            })
            expect(result).toBeNull()
        })
    })

    describe("updateProduct", () => {
        it("should update a product", async () => {
            const updatedProduct: Product = {
                id: "1",
                name: "Updated Product",
                price: 150,
            }

            jest.spyOn(prismaMock.product, "update").mockResolvedValue(
                updatedProduct
            )

            const result = await productService.updateProduct(
                "1",
                updatedProduct
            )

            expect(prismaMock.product.update).toHaveBeenCalledWith({
                where: { id: "1" },
                data: {
                    name: updatedProduct.name,
                    price: updatedProduct.price,
                },
            })
            expect(result).toEqual(updatedProduct)
        })
    })

    describe("deleteProductByID", () => {
        it("should delete a product by ID", async () => {
            jest.spyOn(prismaMock.product, "delete").mockResolvedValue({
                id: "1",
                name: "Sample Product",
                price: 100,
            })

            await productService.deleteProductByID("1")

            expect(prismaMock.product.delete).toHaveBeenCalledWith({
                where: { id: "1" },
            })
        })
    })
})
