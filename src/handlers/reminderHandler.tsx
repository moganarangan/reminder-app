import { store } from "../store/configureStore";
import { addReminder } from '../store/actions/reminderAction';
import { reminder } from "../model/reminderMasterModel";
import NotificationHandler from './notificationHandler';

export default class ReminderHandler {
    static addReminder(newReminder: reminder) {
        store.dispatch(addReminder(newReminder));

        // calculate immediate reminder schedule
        // push notification schedule

        NotificationHandler.showNotification(newReminder.reminderName);
    }
}