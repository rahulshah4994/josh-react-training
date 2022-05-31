import { User } from "../../types/users.types";

export const setUsersList = (payload : User[]) => ({
    type : 'SET_USERSLIST',
    payload
})

