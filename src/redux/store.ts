import { configureStore } from '@reduxjs/toolkit'

import bucketObjectsReducer from './bucketObjects/bucketObjectsSlice';
import configReducer from './config/configSlice';
import activeDirectoryPathReducer from './activeDirectoryPath/activeDirectoryPathSlice';

export const store = configureStore({
  reducer: {
    bucketObjects: bucketObjectsReducer,
    config: configReducer,
    activeDirectoryPath: activeDirectoryPathReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
