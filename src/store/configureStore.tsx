import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import reminderMaster from './reducers/reminderMasterReducer'
import systemConfigMaster from './reducers/systemConfigMasterReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({ reminderMaster, systemConfigMaster });

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
  store,
  persistor,
};