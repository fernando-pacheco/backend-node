/*
  Warnings:

  - A unique constraint covering the columns `[cart_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_cart_id_key" ON "Order"("cart_id");
