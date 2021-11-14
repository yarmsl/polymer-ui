import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuth = {
  isAuth: false,
  token: "",
  name: "",
  role: "user",
  articles: [],
  companies: [],
  presentationFile: '',
  productions: [],
  projects: [],
  steps: [],
  stories: [],
  storyArticles: [],
  tags: [],
  vacancies: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      Object.assign(state, {...action.payload, isAuth: true});
    },
    resetAuth: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const { setAuth, resetAuth } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
