import { PostLoginPayload, PostLoginResponse } from "../types/login.types"

export const postLogin = (payload: PostLoginPayload): Promise<PostLoginResponse> => {
	return fetch("https://reqres.in/api/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})
		.then((res) => {
			if (res.status >= 400) {
				res.json().then((data) => {
					console.log(data)
					throw new Error(data.error)
				})
			}
			return res.json()
		})
		.then((data) => data as PostLoginResponse)
}
