import { MessageResponseSchema } from "../schemas/message"

export function MessageResponses(status_codes: number[]) {
    const messageResponses: Record<number, object> = {}
    status_codes.map((status_code) => {
        messageResponses[status_code] = MessageResponseSchema
    })

    return messageResponses
}
