// NPM
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Slice
import isAuthSlice from './isAuth/isAuth'
import idSlice from "./id/idSlice";
import usersIdSlice from "./usersId/usersIdSlice";
import usernameSlice from "./username/usernameSlice";

const rootReducer = combineReducers({
    isAuth: isAuthSlice,
    id: idSlice,
    usersId: usersIdSlice,
    username: usernameSlice
})

export const store = configureStore({
    reducer: rootReducer
})