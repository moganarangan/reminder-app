export interface reminderMasterModel {
    reminders: Array<reminder>,
    remindersActivity: Array<reminderActivity>
}

export interface reminder {
    reminderId: string,
    reminderName: string,
    reminderType: number,
    reminderMonth: number,
    reminderDay: number,
    dueDate: Date,
    reminderTime: Date,
    notes: string,
    active: boolean,
    isSync: boolean
};

export interface reminderActivity {
    reminderActivityId: string,
    reminderName: string,
    reminderType: number,
    reminderMonth: number,
    reminderDay: number,
    dueDate: Date,
    reminderTime: Date,
    nextDueDate: Date,
    notes: string,
    completed: boolean,
    isSync: boolean
};