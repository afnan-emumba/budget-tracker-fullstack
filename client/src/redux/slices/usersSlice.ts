import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UsersState } from "../../utils/interfaces";
import { testUsers } from "../testData/testUsers";

const initialState: UsersState = {
  users: [...testUsers],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
