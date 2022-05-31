import { User } from "../../types/users.types"

export interface StateType {
    users: User[]
}

interface ActionType {
    type: string,
    payload?: User[]
}

const initialState: StateType = {
    users : []
}


export const usersReducer = (state : StateType= initialState, action: ActionType)  => {
    const { type, payload } = action
    switch (type) {
        case 'SET_USERSLIST':
            return { ...state, users: payload }
        default:
            return state
    }
}