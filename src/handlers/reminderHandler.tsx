import { store } from '../store/configureStore';
import { addReminder, addReminderActivity, editReminder, editReminderActivity, deleteReminder } from '../store/actions/reminderAction';
import NotificationHandler from './notificationHandler';
import getRandom from '../utilities/random';
import { LocalNotification } from 'expo/build/Notifications/Notifications.types';
import { reminder } from '../model/reminder';
import { reminderActivity } from '../model/reminderActivity';
import { default as theme } from '../utilities/theme.json';
import moment from "moment";

export default class ReminderHandler {

    static saveReminder(reminder: reminder) {
        store.dispatch(editReminder(reminder));
    }

    static saveReminderActivity(reminderA: reminderActivity) {
        store.dispatch(editReminderActivity(reminderA));
    }

    static deleteReminder(reminder: reminder) {
        store.dispatch(deleteReminder(reminder));
    }

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

        const today = moment();
        const d = moment(reminder.reminderTime);
        const h = d.hour();
        const m = d.minute();
        today.set({
            hour: h,
            minute: m,
            second: 0,
            millisecond: 0
        });

        let canAdd: boolean = true;
        if (isTask) {
            const isExist = raList.filter(i => i.reminderId === reminder.reminderId
                && moment(i.dueDate).toISOString() === today.toISOString());

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
                dueDate: today.toDate(),
                reminderTime: reminder.reminderTime,
                notes: reminder.notes,
                completionDate: undefined
            };
            store.dispatch(addReminderActivity(ra));
            ReminderHandler.scheduleNotification(ra);
        }
    }

    private static async processMonthlyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = moment().startOf('day');
        const dateString = today.year() + '-' + today.month() + '-' + reminder.reminderDay;
        const monthDate = moment(dateString);
        monthDate.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });

        const d = moment(reminder.reminderTime);
        const h = d.hour();
        const m = d.minute();
        monthDate.set({
            hour: h,
            minute: m,
            second: 0,
            millisecond: 0
        });

        const diffHours = monthDate.diff(today, 'hour');

        if (diffHours <= 72) {
            let canAdd: boolean = true;
            if (isTask) {
                const isExist = raList.filter(i => i.reminderId === reminder.reminderId
                    && moment(i.dueDate).toISOString() === monthDate.toISOString());

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
                    dueDate: monthDate.toDate(),
                    reminderTime: reminder.reminderTime,
                    notes: reminder.notes,
                    completionDate: undefined
                };

                store.dispatch(addReminderActivity(ra));
                ReminderHandler.scheduleNotification(ra);
            }
        }
    }

    private static async processYearlyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = moment().startOf('day');
        const dateString = today.year() + '-' + reminder.reminderMonth + '-' + reminder.reminderDay;
        const monthDate = moment(dateString);
        monthDate.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        const d = moment(reminder.reminderTime);
        const h = d.hour();
        const m = d.minute();
        monthDate.set({
            hour: h,
            minute: m,
            second: 0,
            millisecond: 0
        });

        const diffHours = monthDate.diff(today, 'hour');

        if (diffHours <= 72) {
            let canAdd: boolean = true;
            if (isTask) {
                const isExist = raList.filter(i => i.reminderId === reminder.reminderId
                    && moment(i.dueDate).toISOString() === monthDate.toISOString());

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
                    dueDate: monthDate.toDate(),
                    reminderTime: reminder.reminderTime,
                    notes: reminder.notes,
                    completionDate: undefined
                };

                store.dispatch(addReminderActivity(ra));
                ReminderHandler.scheduleNotification(ra);
            }
        }
    }

    private static async processSpecificDateReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
        if (!isTask) {
            store.dispatch(addReminder(reminder));
        }

        const today = moment().startOf('day');
        const dueDate = moment(reminder.dueDate);
        const d = moment(reminder.reminderTime);
        const h = d.hour();
        const m = d.minute();
        dueDate.set({
            hour: h,
            minute: m,
            second: 0,
            millisecond: 0
        });
        const diffHours = dueDate.diff(today, 'hour');

        if (diffHours <= 72) {
            let canAdd: boolean = true;
            if (isTask) {
                const isExist = raList.filter(i => i.reminderId === reminder.reminderId
                    && moment(i.dueDate).toISOString() === dueDate.toISOString());

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
                    dueDate: dueDate.toDate(),
                    reminderTime: reminder.reminderTime,
                    notes: reminder.notes,
                    completionDate: undefined
                };

                store.dispatch(addReminderActivity(ra));
                ReminderHandler.scheduleNotification(ra);
            }
        }
    }

    private static scheduleNotification(ra: reminderActivity) {
        const localNotification: LocalNotification = {
            title: 'Reminder',
            body: ra.reminderName,
            data: { reminderActivityId: ra.reminderActivityId },
            ios: {
                sound: true,
                _displayInForeground: true
            },
            android: {
                color: theme["color-primary-500"]
            }
        };

        const scheduleTime = moment(ra.dueDate);
        scheduleTime.set({ minute: -10 });
        NotificationHandler.showNotification(localNotification, { time: scheduleTime });

        const now = moment()
        now.set({ second: 10 });
        const diffHours = scheduleTime.diff(now, 'hour');

        if (diffHours >= 24) {
            NotificationHandler.showNotification(localNotification, { time: scheduleTime });
        }
    }
}