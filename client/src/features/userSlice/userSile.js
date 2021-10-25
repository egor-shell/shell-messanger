import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: ''
    },
    reducers: {
        adjustUser: (state, action) => {
            state.value = action.payload
        },
        clearUser: state => {
            state.value = ''
        }
    }
})

export default userSlice.reducer
export const { adjustUser, clearUser } = userSlice.actions
export const selectUser = state => state.user.value