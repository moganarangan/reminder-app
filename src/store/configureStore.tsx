import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import RootReducer from './reducers/index'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'reminderReducer',
  ]
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

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