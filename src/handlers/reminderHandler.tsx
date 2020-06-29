import { store } from '../store/configureStore';
import { addReminder, addReminderActivity } from '../store/actions/reminderAction';
import NotificationHandler from './notificationHandler';
import getRandom from '../utilities/random';
import { LocalNotification } from 'expo/build/Notifications/Notifications.types';
import { reminder } from '../model/reminder';
import { reminderActivity } from '../model/reminderActivity';

const one_day = 1000 * 60 * 60 * 24;

export default class ReminderHandler {
    static addReminder(newReminder: reminder, isTask: boolean = false, raList: Array<reminderActivity> = []) {
        ReminderHandler.calculateNextReminder(newReminder, isTask, raList);
    }

    private static calculateNextReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        switch (reminder.reminderType) {
            case 1:
                ReminderHandler.processDailyReminder(reminder, isTask, raList);
                break;

            case 2:
                ReminderHandler.processMonthlyReminder(reminder, isTask, raList);
                break;

            case 3:
                ReminderHandler.processYearlyReminder(reminder, isTask, raList);
                break;

            case 4:
                ReminderHandler.processSpecificDateReminder(reminder, isTask, raList);
                break;
        }
    }

    private static processDailyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        const h = reminder.reminderTime.getHours();
        const m = reminder.reminderTime.getMinutes();
        today.setHours(h);
        today.setMinutes(m);
        today.setMilliseconds(0);

        let canAdd: boolean = true;
        if (isTask) {
            const isExist = raList.filter(i => i.reminderId === reminder.reminderId && i.dueDate === today);

            if (isExist && isExist.length > 0) {
                canAdd = false;
            }
        }

        if (canAdd) {
            const ra: reminderActivity = {
                reminderActivityId: getRandom(),
                reminderId: reminder.reminderId,
                reminderName: reminder.reminderName,
                reminderType: reminder.reminderType,
                reminderMonth: reminder.reminderMonth,
                reminderDay: reminder.reminderDay,
                dueDate: today,
                reminderTime: reminder.reminderTime,
                notes: reminder.notes,
                completionDate: null
            };
            store.dispatch(addReminderActivity(ra));
            ReminderHandler.scheduleNotification(ra);
        }
    }

    private static async processMonthlyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        const month = today.getMonth();
        const monthDate = new Date(today.getFullYear(), month - 1, reminder.reminderDay);

        const diffTime = Math.abs(monthDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / one_day);

        if (diffDays > 0 && diffDays <= 3) {
            const h1 = reminder.reminderTime.getHours();
            const m1 = reminder.reminderTime.getMinutes();
            monthDate.setHours(h1);
            monthDate.setMinutes(m1);
            monthDate.setMilliseconds(0);

            let canAdd: boolean = true;
            if (isTask) {
                const isExist = raList.filter(i => i.reminderId === reminder.reminderId && i.dueDate === monthDate);

                if (isExist && isExist.length > 0) {
                    canAdd = false;
                }
            }

            if (canAdd) {
                const ra1: reminderActivity = {
                    reminderActivityId: getRandom(),
                    reminderId: reminder.reminderId,
                    reminderName: reminder.reminderName,
                    reminderType: reminder.reminderType,
                    reminderMonth: reminder.reminderMonth,
                    reminderDay: reminder.reminderDay,
                    dueDate: monthDate,
                    reminderTime: reminder.reminderTime,
                    notes: reminder.notes,
                    completionDate: null
                };

                store.dispatch(addReminderActivity(ra1));
                ReminderHandler.scheduleNotification(ra1);
            }
        }
    }

    private static async processYearlyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        const monthDate = new Date(today.getFullYear(), reminder.reminderMonth - 1, reminder.reminderDay);

        const diffTime = Math.abs(monthDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / one_day);

        if (diffDays > 0 && diffDays <= 3) {
            const h1 = reminder.reminderTime.getHours();
            const m1 = reminder.reminderTime.getMinutes();
            monthDate.setHours(h1);
            monthDate.setMinutes(m1);
            monthDate.setMilliseconds(0);

            let canAdd: boolean = true;
            if (isTask) {
                const isExist = raList.filter(i => i.reminderId === reminder.reminderId && i.dueDate === monthDate);

                if (isExist && isExist.length > 0) {
                    canAdd = false;
                }
            }

            if (canAdd) {
                const ra1: reminderActivity = {
                    reminderActivityId: getRandom(),
                    reminderId: reminder.reminderId,
                    reminderName: reminder.reminderName,
                    reminderType: reminder.reminderType,
                    reminderMonth: reminder.reminderMonth,
                    reminderDay: reminder.reminderDay,
                    dueDate: monthDate,
                    reminderTime: reminder.reminderTime,
                    notes: reminder.notes,
                    completionDate: null
                };

                store.dispatch(addReminderActivity(ra1));
                ReminderHandler.scheduleNotification(ra1);
            }
        }
    }

    private static async processSpecificDateReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        const dueDate = reminder.dueDate;

        const diffTime = Math.abs(dueDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / one_day);

        if (diffDays > 0 && diffDays <= 3) {
            const h2 = reminder.reminderTime.getHours();
            const m2 = reminder.reminderTime.getMinutes();
            dueDate.setHours(h2);
            dueDate.setMinutes(m2);
            dueDate.setMilliseconds(0);

            let canAdd: boolean = true;
            if (isTask) {
                const isExist = raList.filter(i => i.reminderId === reminder.reminderId && i.dueDate === dueDate);

                if (isExist && isExist.length > 0) {
                    canAdd = false;
                }
            }

            if (canAdd) {
                const ra2: reminderActivity = {
                    reminderActivityId: getRandom(),
                    reminderId: reminder.reminderId,
                    reminderName: reminder.reminderName,
                    reminderType: reminder.reminderType,
                    reminderMonth: reminder.reminderMonth,
                    reminderDay: reminder.reminderDay,
                    dueDate: dueDate,
                    reminderTime: reminder.reminderTime,
                    notes: reminder.notes,
                    completionDate: null
                };

                store.dispatch(addReminderActivity(ra2));
                ReminderHandler.scheduleNotification(ra2);
            }
        }
    }

    private static scheduleNotification(ra: reminderActivity) {
        const localNotification: LocalNotification = {
            title: 'Reminder',
            body: ra.reminderName,
            data: { reminderActivityId: ra.reminderActivityId }
        };

        const scheduleTime = new Date(ra.dueDate);
        scheduleTime.setMinutes(scheduleTime.getMinutes() - 10);
        NotificationHandler.showNotification(localNotification, { time: scheduleTime });


        const now = new Date();
        now.setSeconds(scheduleTime.getSeconds() + 10);
        const diffTime = Math.abs(scheduleTime.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / one_day);

        if (diffDays > 3) {
            NotificationHandler.showNotification(localNotification, { time: scheduleTime });
        }
    }
}