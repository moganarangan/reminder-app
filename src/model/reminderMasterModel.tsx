export interface reminderMasterModel {
    reminders: Array<reminder>,
    remindersActivity: Array<reminderActivity>
}

export interface reminder {
    reminderId: string,
    reminderName: string,
    reminderType: string,
    reminderMonth?: number,
    reminderDay?: number,
    dueDate?: Date,
    reminderTime: string,
    notes?: string,
    active: boolean,
    isSync: boolean
};

export interface reminderActivity {
    reminderActivityId: string,
    reminderName: string,
    reminderType: string,
    reminderMonth?: number,
    reminderDay?: number,
    dueDate?: Date,
    reminderTime: string,
    nextDueDate?: Date,
    notes?: string,
    completed: boolean,
    isSync: boolean
};