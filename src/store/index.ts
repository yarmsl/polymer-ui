import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, authAPI } from "./Auth";
import { ModalStackReducer } from "./ModalStack";
import { notificationsReducer } from "./Notifications";
import { usersAPI } from "./Users";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  notifications: notificationsReducer,
  modalStack: ModalStackReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authAPI.middleware,
      usersAPI.middleware
    ),
});

export * from "./hooks";
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export default appStore;
