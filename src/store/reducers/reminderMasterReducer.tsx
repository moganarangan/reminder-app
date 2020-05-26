import { reminderMasterModel } from '../../model/reminderMasterModel';
import { ADD_REMINDER } from '../../constans/reminderMaster'

const Initial_State: reminderMasterModel = {
    reminders: [],
    remindersActivity: []
};

// Reducers (Modifies The State And Returns A New State)
const reminderMaster = (state: reminderMasterModel = Initial_State, action: any) => {
    switch (action.type) {
        case ADD_REMINDER: {
            console.log(state);
            console.log(action);
            return [...state.reminders, action.newReminder]
        }
        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default reminderMaster;