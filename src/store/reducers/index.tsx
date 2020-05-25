// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import reminderReducer from './reminderReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    reminderReducer: reminderReducer
});

// Exports
export default rootReducer;