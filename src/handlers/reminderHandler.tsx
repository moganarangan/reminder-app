import { store } from "../store/configureStore";
import { addReminder } from '../store/actions/reminderAction';
import { reminder } from "../model/reminderMasterModel";
import { Notifications } from 'expo';

export default class ReminderHandler {
    static addReminder(newReminder: reminder) {
        store.dispatch(addReminder(newReminder));

        // calculate immediate reminder schedule
        // push notification schedule

        const localNotification = {
            title: 'done',
            body: 'done!'
        };

        const schedulingOptions = {
            time: (new Date()).getTime() + 10
        }

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    }
}