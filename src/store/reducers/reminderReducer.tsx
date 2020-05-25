// Initial State
interface reminder {
    reminderName: string,
    reminderType: string,
    reminderMonth: number,
    reminderDay: number,
    reminderTime: string,
    notes: string,
    active: boolean
};

const reminders: Array<reminder> = [];

// Reducers (Modifies The State And Returns A New State)
const reminderReducer = (state = reminders, action: any) => {
    switch (action.type) {
        case 'NEW_REMINDER': {
            return {
                // State
                ...state,
                // Redux Store
                reminders: reminders.push(action.newReminder),
            }
        }
        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default reminderReducer;