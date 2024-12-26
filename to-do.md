Criar novas models:
`Payment`
id cuid
type string
payment_method enum(PIX, CREDIT, DEBIT, WALLET)
value float

`Order`
id cuid
payment_id fk
user_id fk
carts_id fk

`Cart`
id cuid
product_id fk
amout int

`Carts`
id cuid
carts Cart[]

`Product`
id cuid
name string
price float