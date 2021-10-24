import { createSlice } from '@reduxjs/toolkit'

const usersIdSlice = createSlice({
    name: 'usersId',
    initialState: {
        value: []
    },
    reducers: {
        setUsersId: (state, action) => {
            state.value = action.payload
        },
        clearUsersId: state => {
            state.value = []
        }
    }
})

export default usersIdSlice.reducer
export const { setUsersId, clearUsersId } = usersIdSlice.actions
export const selectUsersId = state => state.usersId.value