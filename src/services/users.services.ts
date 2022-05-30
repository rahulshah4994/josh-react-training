import { GetUsersResponse, User } from "../types/users.types"

export const fetchUsers = (): Promise<User[]> => {
	return fetch("https://reqres.in/api/users")
		.then((res) => res.json())
		.then((data) => (data as GetUsersResponse).data)
}
