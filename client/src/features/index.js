// NPM
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Slice
import isAuthSlice from './isAuth/isAuth'
import idSlice from "./id/idSlice";
import usersIdSlice from "./usersId/usersIdSlice";
import usernameSlice from "./username/usernameSlice";
import userSile from "./userSlice/userSile";

const rootReducer = combineReducers({
    isAuth: isAuthSlice,
    id: idSlice,
    usersId: usersIdSlice,
    username: usernameSlice,
    user: userSile
})

export const store = configureStore({
    reducer: rootReducer
})