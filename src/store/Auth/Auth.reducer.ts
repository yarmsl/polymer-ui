import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuth = {
  isAuth: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string>) {
      state.isAuth = true;
      state.token = action.payload;
    },
    resetAuth(state) {
      Object.assign(state, initialState);
    },
  },
});
export const { setAuth, resetAuth } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
