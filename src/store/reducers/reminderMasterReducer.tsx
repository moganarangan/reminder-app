import { reminderMasterModel } from '../../model/reminderMasterModel';
import { ADD_REMINDER, ADD_REMINDER_ACTIVITY, EDIT_REMINDER, EDIT_REMINDER_ACTIVITY, DELETE_REMINDER, DELETE_REMINDER_ACTIVITY } from '../../constans/reminderMaster'
import { reminder } from '../../model/reminder';
import { reminderActivity } from '../../model/reminderActivity';

const Initial_State: reminderMasterModel = {
    reminders: [],
    remindersActivity: []
};

// Reducers (Modifies The State And Returns A New State)
const reminderMaster = (state: reminderMasterModel = Initial_State, action: any): reminderMasterModel => {
    switch (action.type) {
        case ADD_REMINDER: {
            return Object.assign({}, state, { reminders: [...state.reminders, action.newReminder] });
        }

        case ADD_REMINDER_ACTIVITY: {
            return Object.assign({}, state, { remindersActivity: [...state.remindersActivity, action.addReminderActivity] });
        }

        case EDIT_REMINDER: {
            const index = state.reminders.findIndex(i => i.reminderId === action.editReminder.reminderId);
            return Object.assign({}, state, {
                ...state, reminders: state.reminders?.map((r, i) => {
                    i === index ? { ...r, r: action.editReminder } : r
                })
            });
        }

        case EDIT_REMINDER_ACTIVITY: {
            const index = state.remindersActivity.findIndex(i => i.reminderActivityId === action.editReminderActivity.reminderActivityId);
            return Object.assign({}, state, {
                ...state, remindersActivity: state.remindersActivity?.map((r, i) => {
                    i === index ? { ...r, r: action.editReminderActivity } : r
                })
            });
        }

        case DELETE_REMINDER: {
            return Object.assign({}, state, {
                ...state, reminders: [...state.reminders.filter(i => i.reminderId !== action.deleteReminder.reminderId)]
            });
        }

        case DELETE_REMINDER_ACTIVITY: {
            return Object.assign({}, state, {
                ...state, remindersActivity: [...state.remindersActivity.filter(i => i.reminderActivityId !== action.deleteReminder.reminderActivityId)]
            });
        }

        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default reminderMaster;