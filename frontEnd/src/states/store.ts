import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authenticatorSlice from "@src/states/authentication/authenticatorSlice";
import accessTokenSlice from "./authentication/accessTokenSlice";
import userSlice from "./authentication/userSlice";
import friendsSlice from "./authentication/friendsSlice";
import blockedSlice from "./authentication/blockedSlice";
import allUsersSlice from "./authentication/allUsersSlice";

export const store = configureStore({
  reducer: {
    authenticator: authenticatorSlice,
    accessToken: accessTokenSlice,
    user: userSlice,
    allUsers: allUsersSlice,
    friends: friendsSlice,
    blocked: blockedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;