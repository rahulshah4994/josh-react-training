import { GetUsersResponse, User } from "../types/users.types"
import { GetUserResponse } from "../types/user.types"

export const fetchUsers = (): Promise<User[]> => {
	return fetch("https://reqres.in/api/users")
		.then((res) => res.json())
		.then((data) => (data as GetUsersResponse).data)
}

export const fetchUserDetails = (id: string | undefined): Promise<User> => {
    return fetch(`https://reqres.in/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => (data as GetUserResponse).data)
    // .then((data) => { console.log(data.data); return ((data as GetUserResponse).data) })
}