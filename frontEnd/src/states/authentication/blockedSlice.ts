import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type BlockerUsersType = {username: string};

interface AuthenticationState{
    value: BlockerUsersType[]
}

const initialState: AuthenticationState = {value: []}

const blockedSlice = createSlice({
    name: "blocked",
    initialState,
    reducers: {
        setBlocked: (state, action: PayloadAction<BlockerUsersType[]>) => {
            state.value = action.payload;
        }
    }
})

export const {setBlocked} = blockedSlice.actions;

export default blockedSlice.reducer;