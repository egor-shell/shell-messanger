// NPM
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Slice
import currentUserSlice from "./currentUserSlice/currentUserSlice";
import isAuthSlice from "./isAuthSlice/isAuthSlice";
import pikedUserSlice from "./pickedUserSlice/pickedUserSlice";
import usersIdSlice from "./usersIdSilce/usersIdSlice";

const rootReducer = combineReducers({
    currentUser: currentUserSlice,
    isAuth: isAuthSlice,
    pickedUser: pikedUserSlice,
    usersId: usersIdSlice
})

export const store = configureStore({
    reducer: rootReducer
})