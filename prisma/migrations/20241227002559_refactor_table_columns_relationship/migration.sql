/*
  Warnings:

  - You are about to drop the column `carts_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `cart_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_carts_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "carts_id",
ADD COLUMN     "cart_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
