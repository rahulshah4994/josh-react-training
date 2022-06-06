export interface PostLoginPayload {
	email: string
	password: string
}

export interface PostLoginResponse {
	token: string
}
