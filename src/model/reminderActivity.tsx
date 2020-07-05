export interface reminderActivity {
    reminderActivityId: string,
    reminderId: string,
    reminderName: string,
    reminderType: number, // 1: Daily, 2:Monthly, 3: Specific Date
    reminderMonth: number,
    reminderDay: number,
    dueDate: Date,
    reminderTime: Date,
    notes: string,
    completionDate: Date | undefined
};