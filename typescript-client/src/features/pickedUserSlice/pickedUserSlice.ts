import { createSlice } from '@reduxjs/toolkit'

const pickedUserSlice = createSlice({
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

export default pickedUserSlice.reducer
export const { adjustUser, clearUser } = pickedUserSlice.actions
export const selectUser = (state: { user: { value: string } }) => state.user.value