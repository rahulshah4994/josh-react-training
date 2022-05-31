export interface StateType {
    token: string
}

interface ActionType {
    type: string,
    payload?: string
}

const initialState: StateType = {
    token: 'TOKEN'
}


export const loginReducer = (state = initialState, action: ActionType) => {
    const { type, payload } = action
    switch (type) {
        case 'SET_TOKEN':
            return { ...state, token: payload }
        case 'CLEAR_TOKEN':
            return { ...state, token: '' }
        default:
            return state
    }
}