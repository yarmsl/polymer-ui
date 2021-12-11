import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { articleAPI } from "./Article";
import { authReducer, authAPI } from "./Auth";
import { bannerAPI } from "./Banner";
import { customerAPI } from "./Customer";
import { dataAPI } from "./Data";
import { mailAPI } from "./Mail";
import { ModalStackReducer } from "./ModalStack";
import { notificationsReducer } from "./Notifications";
import { fileAPI } from "./PresentationFile";
import { productionAPI } from "./Production";
import { projectAPI } from "./Project";
import { storyAPI } from "./Story";
import { storyArticleAPI } from "./StoryArticle";
import { tagAPI } from "./Tag";
import { usersAPI } from "./Users";
import { vacancyAPI } from "./Vacancy";

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
  [dataAPI.reducerPath]: dataAPI.reducer,
  [bannerAPI.reducerPath]: bannerAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [customerAPI.reducerPath]: customerAPI.reducer,
  [tagAPI.reducerPath]: tagAPI.reducer,
  [projectAPI.reducerPath]: projectAPI.reducer,
  [mailAPI.reducerPath]: mailAPI.reducer,
  [fileAPI.reducerPath]: fileAPI.reducer,
  [articleAPI.reducerPath]: articleAPI.reducer,
  [productionAPI.reducerPath]: productionAPI.reducer,
  [storyAPI.reducerPath]: storyAPI.reducer,
  [storyArticleAPI.reducerPath]: storyArticleAPI.reducer,
  [vacancyAPI.reducerPath]: vacancyAPI.reducer,
});

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authAPI.middleware,
      dataAPI.middleware,
      bannerAPI.middleware,
      usersAPI.middleware,
      customerAPI.middleware,
      tagAPI.middleware,
      projectAPI.middleware,
      mailAPI.middleware,
      fileAPI.middleware,
      articleAPI.middleware,
      productionAPI.middleware,
      storyAPI.middleware,
      storyArticleAPI.middleware,
      vacancyAPI.middleware
    ),
});

export * from "./hooks";
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export default appStore;
