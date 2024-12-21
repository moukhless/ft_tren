import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDataType } from "./userSlice";

interface AuthenticatorState {
  value: UserDataType[];
}

const initialState: AuthenticatorState = { value: [] };

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<UserDataType[]>) => {
        state.value = action.payload;
    }
  },
});

export const {setFriends} = friendsSlice.actions;
export default friendsSlice.reducer;