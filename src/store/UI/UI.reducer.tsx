import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IUISlice = {
    controlPanelPage: 'createuser'
};

export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
      changePage: (state, action: PayloadAction<controlPanelPageTypes>) => {
          state.controlPanelPage = action.payload
      }
  },
});

export const { changePage } = UISlice.actions;
export const { reducer: UIReducer } = UISlice;