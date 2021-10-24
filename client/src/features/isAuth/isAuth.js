import { createSlice } from '@reduxjs/toolkit'

const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState: {
        value: false
    },
    reducers: {
        auth: state => {
            state.value = true
        },
        logout: state => {
            state.value = false
        }
    }
})

export default isAuthSlice.reducer
export const { auth, logout } = isAuthSlice.actions
export const selectValue = state => state.isAuth.value