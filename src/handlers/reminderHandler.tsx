import { store } from "../store/configureStore";
import { addReminder } from '../store/actions/reminderAction';
import { reminder } from "../model/reminderMasterModel";

export default class ReminderHandler {
    static addReminder(newReminder: reminder) {
        store.dispatch(addReminder(newReminder))
    }
}