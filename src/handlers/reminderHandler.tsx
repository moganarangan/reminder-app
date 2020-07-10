import { store } from '../store/configureStore';
import {
    addReminder, addReminderActivity, editReminder, editReminderActivity,
    deleteReminder, deleteReminderActivityMore
} from '../store/actions/reminderAction';
import NotificationHandler from './notificationHandler';
import getRandom from '../utilities/random';
import { LocalNotification } from 'expo/build/Notifications/Notifications.types';
import { reminder } from '../model/reminder';
import { reminderActivity } from '../model/reminderActivity';
import { default as theme } from '../utilities/theme.json';
import moment from "moment";

export default class ReminderHandler {

    static saveReminder(reminder: reminder) {
        ReminderHandler.deleteReminderActivityByReminder(reminder);
        store.dispatch(editReminder(reminder));
        ReminderHandler.calculateNextReminder(reminder);
    }

    static saveReminderActivity(reminderA: reminderActivity) {
        store.dispatch(editReminderActivity(reminderA));
    }

    static deleteReminder(reminder: reminder) {
        store.dispatch(deleteReminder(reminder));
    }

    static deleteReminderActivityByReminder(reminder: reminder) {
        const state = store.getState();
        const ra = state.reminderMaster.remindersActivity.filter(i => i.reminderId.toLowerCase() === reminder.reminderId.toLowerCase());
        const today = moment().startOf('day');
        const toDelete = ra.filter(i => moment(i.dueDate).diff(today, 'hours') >= 0).map(i => i.reminderActivityId);
        store.dispatch(deleteReminderActivityMore(toDelete));
    }

    static addReminder(newReminder: reminder, isTask: boolean = false, raList: Array<reminderActivity> = []) {
        store.dispatch(addReminder(newReminder));
        ReminderHandler.calculateNextReminder(newReminder, isTask, raList);
    }

    static calculateNextReminder(reminder: reminder, isTask: boolean = false, raList: Array<reminderActivity> = []) {
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

    private static processDailyReminder(reminder: reminder, isTask: boolean = false, raList: Array<reminderActivity> = []) {
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

        const now = moment();
        const diffMins = today.diff(now, 'minute');

        if (canAdd && (diffMins >= 0 || isTask)) {
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
                completionDate: undefined,
                color: reminder.color,
                last_updated: reminder.last_updated
            };
            store.dispatch(addReminderActivity(ra));
            ReminderHandler.scheduleNotification(ra);
        }
    }

    private static async processMonthlyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
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

            const now = moment();
            const diffMins = monthDate.diff(now, 'minute');

            if (canAdd && (diffMins >= 0 || isTask)) {
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
                    completionDate: undefined,
                    color: reminder.color,
                    last_updated: reminder.last_updated
                };

                store.dispatch(addReminderActivity(ra));
                ReminderHandler.scheduleNotification(ra);
            }
        }
    }

    private static async processYearlyReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
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

            const now = moment();
            const diffMins = monthDate.diff(now, 'minute');

            if (canAdd && (diffMins >= 0 || isTask)) {
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
                    completionDate: undefined,
                    color: reminder.color,
                    last_updated: reminder.last_updated
                };

                store.dispatch(addReminderActivity(ra));
                ReminderHandler.scheduleNotification(ra);
            }
        }
    }

    private static async processSpecificDateReminder(reminder: reminder, isTask: boolean, raList: Array<reminderActivity>) {
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

            const now = moment();
            const diffMins = dueDate.diff(now, 'minute');

            if (canAdd && (diffMins >= 0 || isTask)) {
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
                    completionDate: undefined,
                    color: reminder.color,
                    last_updated: reminder.last_updated
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
            }
        };

        const scheduleTime = moment(ra.dueDate);
        scheduleTime.set({ minute: -10 });
        const t = scheduleTime.toDate();
        NotificationHandler.showNotification(localNotification, { time: t });

        const now = moment();
        const diffHours = scheduleTime.diff(now, 'hour');
        const tt = now.toDate();

        if (diffHours >= 24) {
            NotificationHandler.showNotification(localNotification, { time: tt });
        }
    }
}