import { User } from "./users.types";


export interface GetUserResponse {
    data: User,
    support: {
        url: string,
        text: string
    }
}