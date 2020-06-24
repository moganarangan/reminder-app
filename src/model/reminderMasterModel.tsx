import { reminder } from "./reminder";
import { reminderActivity } from "./reminderActivity";

export interface reminderMasterModel {
    reminders: Array<reminder>,
    remindersActivity: Array<reminderActivity>
}
