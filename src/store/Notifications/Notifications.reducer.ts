import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarKey } from "notistack";
import { ICloseSnackbarAction, INotifications, ISnackbar } from "./types";

const initialState: INotifications = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    enqueueSnackbar: (state, action: PayloadAction<ISnackbar>) => {
      state.notifications.push(action.payload);
    },
    closeSnackbar: (state, action: PayloadAction<ICloseSnackbarAction>) => {
      state.notifications = state.notifications.map((notification) =>
        action.payload.dismissAll || notification.options.key === action.payload.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      );
    },
    removeSnackbar: (state, action: PayloadAction<SnackbarKey>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.options.key !== action.payload
      );
    },
  },
});

export const { enqueueSnackbar, closeSnackbar, removeSnackbar } =
  notificationsSlice.actions;
export const {reducer: notificationsReducer} = notificationsSlice
