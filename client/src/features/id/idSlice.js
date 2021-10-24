import { createSlice } from '@reduxjs/toolkit'

const idSlice = createSlice({
    name: 'id',
    initialState: {
        value: -1
    },
    reducers: {
        setId: (state, action) => {
            state.value = action.payload
        },
        clearId: state => {
            state.value = -1
        }
    }
})

export default idSlice.reducer
export const { setId, clearId } = idSlice.actions
export const selectId = state => state.id.value