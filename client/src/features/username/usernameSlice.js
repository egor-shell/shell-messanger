import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
    name: 'username',
    initialState: {
        value: ''
    },
    reducers: {
        adjustUsername: (state, action) => {
            state.value = action.payload
        },
        clearUsername: state => {
            state.value = ''
        }
    }
})

export default usernameSlice.reducer
export const { adjustUsername, clearUsername } = usernameSlice.actions
export const selectUsername = state => state.username.value