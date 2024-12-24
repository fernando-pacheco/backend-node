import { getUsers } from "../src/models/user"
import { UserListResource } from "../src/resources/user"

jest.mock("../src/models/user") // Mock das funções do modelo

describe("UserListResource", () => {
    it("should return a list of users", async () => {
        const mockUsers = [
            { id: "1", name: "John Doe", email: "john@example.com" },
            { id: "2", name: "Jane Doe", email: "jane@example.com" },
        ]

        ;(getUsers as jest.Mock).mockResolvedValue(mockUsers) // Mocka a função getUsers para retornar mockUsers

        const result = await UserListResource() // Chama o recurso

        expect(getUsers).toHaveBeenCalledTimes(1) // Verifica se getUsers foi chamado uma vez
        expect(result).toEqual(mockUsers) // Verifica se a resposta é a esperada
    })
})
