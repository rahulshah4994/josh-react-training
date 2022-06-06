import { User } from "../../types/users.types";

export const setUsersList = function* (payload : User[]){
    ({
    type : 'SET_USERSLIST',
    payload
})
}