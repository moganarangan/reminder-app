// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import reminderMaster from './reminderMasterReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
    reminderMaster
});

// Exports
export default rootReducer;