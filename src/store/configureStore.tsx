import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import reminderMaster from './reducers/reminderMasterReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'reminderMaster',
  ]
}

const persistedReducer = persistReducer(persistConfig, reminderMaster)

// Redux: Store
const store = createStore(
  persistedReducer
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
  store,
  persistor,
};