```mermaid
erDiagram
    USER {
        string id PK
        string name
        string email
        datetime created_at
    }
    
    ORDER {
        string id PK
        string payment_id FK
        string user_id FK
        string cart_id FK
    }
    
    PAYMENT {
        string id PK
        string type
        string payment_method
        float value
        string order_id FK
    }
    
    CART {
        string id PK
    }
    
    ITEMCART {
        string id PK
        string product_id FK
        int amount
        string cart_id FK
    }
    
    PRODUCT {
        string id PK
        string name
        float price
    }
    
    USER ||--o| ORDER : "has"
    ORDER ||--o| PAYMENT : "has"
    ORDER ||--o| CART : "has"
    CART ||--o| ITEMCART : "contains"
    ITEMCART ||--o| PRODUCT : "includes"
```
endpoints:
get user/id/orders

post order
get order/id
delete order/id
get order/id/info
get order/id/payment
get order/id/cart
get order/id/user

post payment
get payment/id

post product/
get product/
get product/id
put product/id
delete product/id

post cart
get cart/id/items (items-cart)

post item-cart/
get item-cart/id
put item-cart/id
delete item-cart/id