import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        id: -1,
        username: ''
    },
    reducers: {
        createId: (state, action: PayloadAction<number>) => {
            state.id = action.payload
        },
        createUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        removeId: state => {
            state.id = -1
        },
        removeUsername: state => {
            state.username = ''
        }
    }
})

export default currentUserSlice.reducer
export const {
    createId,
    createUsername,
    removeId,
    removeUsername
} = currentUserSlice.actions
export const selectId = (state: { currentUser: { id: number; }; }) => state.currentUser.id
export const selectUsername = (state: {
    currentUser: {
        username: string;
    };
}) => state.currentUser.username