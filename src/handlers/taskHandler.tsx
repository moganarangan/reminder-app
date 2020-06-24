import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { REMINDER_TASK_NAME } from '../constans/task';
import ReminderHandler from './reminderHandler';
import { store } from '../store/configureStore';

TaskManager.defineTask(REMINDER_TASK_NAME, () => {
    try {
        const state = store.getState();
        state.reminderMaster.reminders.forEach(async (r) => {
            ReminderHandler.addReminder(r, true);
        });

        return BackgroundFetch.Result.NewData;
    }
    catch (error) {
        console.log(error);
        return BackgroundFetch.Result.Failed;
    }
});

export default class TaskHandler {
    static startBackGroundTask = () => {
        BackgroundFetch.registerTaskAsync(REMINDER_TASK_NAME, {
            minimumInterval: 180,
            stopOnTerminate: false,
            startOnBoot: true
        });

        BackgroundFetch.setMinimumIntervalAsync(180);
    };
}