import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loginReducer } from './pages/Login/reducer'
import { usersReducer } from './pages/UsersList/reducer'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({ loginReducer, usersReducer, applyMiddleware(sagaMiddleware) })


export const store = createStore(rootReducer)


export type RootStateType = ReturnType<typeof store.getState>;