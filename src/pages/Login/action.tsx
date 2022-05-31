export const setToken = (payload : string) => ({
    type : 'SET_TOKEN',
    payload
})

export const clearToken = () => ({
    type : 'CLEAR_TOKEN'
})