import { PaymentMethod } from "@prisma/client"

export interface PaymentProps {
    id: string
    type: string
    payment_method: PaymentMethod
    value: number
}
