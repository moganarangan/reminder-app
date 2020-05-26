export interface reminderMasterModel {
    reminders: Array<reminder>,
    remindersActivity: Array<reminderActivity>
}

export interface reminder {
    reminderId: string,
    reminderName: string,
    reminderType: string,
    reminderMonth: number,
    reminderDay: number,
    reminderTime: string,
    notes: string,
    active: boolean,
    isSync: boolean
};

export interface reminderActivity {
    reminderActivityId: string,
    reminderName: string,
    reminderType: string,
    reminderMonth: number,
    reminderDay: number,
    reminderTime: string,
    dueDate: Date,
    nextDueDate: Date,
    notes: string,
    completed: boolean,
    isSync: boolean
};