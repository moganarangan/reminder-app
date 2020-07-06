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
            return { ...state, reminders: [...state.reminders, action.newReminder] };
        }

        case ADD_REMINDER_ACTIVITY: {
            return { ...state, remindersActivity: [...state.remindersActivity, action.addReminderActivity] };
        }

        case EDIT_REMINDER: {
            return {
                ...state,
                reminders: state.reminders.map(r => r.reminderId === action.editReminder.reminderId ?
                    {
                        ...r,
                        reminderName: action.editReminder.reminderName,
                        reminderType: action.editReminder.reminderType,
                        reminderMonth: action.editReminder.reminderMonth,
                        reminderDay: action.editReminder.reminderDay,
                        dueDate: action.editReminder.dueDate,
                        reminderTime: action.editReminder.reminderTime,
                        notes: action.editReminder.notes,
                        active: action.editReminder.active,
                        color: action.editReminder.color,
                        last_updated: action.editReminder.last_updated
                    } : r)
            };
        }

        case EDIT_REMINDER_ACTIVITY: {
            return {
                ...state,
                remindersActivity: state.remindersActivity.map(r => r.reminderActivityId === action.editReminderActivity.reminderActivityId ?
                    {
                        ...r,
                        reminderName: action.editReminderActivity.reminderName,
                        reminderType: action.editReminderActivity.reminderType,
                        reminderMonth: action.editReminderActivity.reminderMonth,
                        reminderDay: action.editReminderActivity.reminderDay,
                        dueDate: action.editReminderActivity.dueDate,
                        reminderTime: action.editReminderActivity.reminderTime,
                        notes: action.editReminderActivity.notes,
                        completionDate: action.editReminderActivity.completionDate,
                        color: action.editReminderActivity.color,
                        last_updated: action.editReminderActivity.last_updated
                    } : r)
            };
        }

        case DELETE_REMINDER: {
            return {
                ...state,
                reminders: [...state.reminders.filter(i => i.reminderId !== action.deleteReminder.reminderId)]
            };
        }

        case DELETE_REMINDER_ACTIVITY: {
            return {
                ...state,
                remindersActivity: [...state.remindersActivity.filter(i => i.reminderActivityId !== action.deleteReminderActivity.reminderActivityId)]
            };
        }

        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default reminderMaster;