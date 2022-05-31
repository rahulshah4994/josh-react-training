import { combineReducers, legacy_createStore as createStore } from 'redux'
import { loginReducer } from './pages/Login/reducer'
import { usersReducer } from './pages/UsersList/reducer'



const rootReducer = combineReducers({ loginReducer, usersReducer })


export const store = createStore(rootReducer)


export type RootStateType = ReturnType<typeof store.getState>;