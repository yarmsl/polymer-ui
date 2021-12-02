import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer, authAPI } from "./Auth";
import { bannerAPI } from "./Banner";
import { customerAPI } from "./Customer";
import { ModalStackReducer } from "./ModalStack";
import { notificationsReducer } from "./Notifications";
import { projectAPI } from "./Project";
import { tagAPI } from "./Tag";
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
  [bannerAPI.reducerPath]: bannerAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [customerAPI.reducerPath]: customerAPI.reducer,
  [tagAPI.reducerPath]: tagAPI.reducer,
  [projectAPI.reducerPath]: projectAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authAPI.middleware,
      bannerAPI.middleware,
      usersAPI.middleware,
      customerAPI.middleware,
      tagAPI.middleware,
      projectAPI.middleware
    ),
});

export * from "./hooks";
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export default appStore;
