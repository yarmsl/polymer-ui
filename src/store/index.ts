import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { articleAPI } from '~/modules/ControlPanel/Articles/store';
import { authReducer, authAPI } from '~/modules/ControlPanel/Auth/store';
import { bannerAPI } from '~/modules/ControlPanel/Banners/store';
import { customerAPI } from '~/modules/ControlPanel/Customer/store';
import { mailAPI } from '~/modules/ControlPanel/Mail/store';
import { fileAPI } from '~/modules/ControlPanel/PresentationFile/store';
import { productionAPI } from '~/modules/ControlPanel/Production/store';
import { projectAPI } from '~/modules/ControlPanel/Project/store';
import { storyAPI } from '~/modules/ControlPanel/Story/store';

import { dataAPI } from './Data';
import { ModalStackReducer } from './ModalStack';
import { notificationsReducer } from './Notifications';
import { storyArticleAPI } from '../modules/ControlPanel/StoryArticle/store';
import { tagAPI } from '../modules/ControlPanel/Tag/store';
import { usersAPI } from '../modules/ControlPanel/User/store';
import { vacancyAPI } from '../modules/ControlPanel/Vacancies/store';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token'],
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
      vacancyAPI.middleware,
    ),
});

export * from './hooks';
export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof appStore;
export type AppDispatch = AppStore['dispatch'];
export default appStore;
