import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserDataType = {
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  avatar?: string;
  created_at?: string;
  last_login?: string;
  wins?: number;
  losses?: number;
  draws?: number;
  matches_played?: number;
  is2fa?: boolean;
  is_online?: boolean;
  rank?: number;
  level?:number;
};

interface AuthenticatorState {
  value: UserDataType;
}

const initialState: AuthenticatorState = { value: {} };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
