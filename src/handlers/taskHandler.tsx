import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { REMINDER_TASK_NAME } from '../constans/task';
import ReminderHandler from './reminderHandler';
import { store } from '../store/configureStore';
import { editSystemConfig } from '../store/actions/systemConfigAction';

TaskManager.defineTask(REMINDER_TASK_NAME, () => {
    try {
        const state = store.getState();
        const today = new Date();
        const todayDate = today.getDate();
        let runDate: any;
        runDate = state.systemConfigMaster.taskDateTime?.getDate();
        if (runDate && todayDate !== runDate) {
            state.reminderMaster.reminders.forEach(async (r) => {
                if (r.active) {
                    ReminderHandler.addReminder(r, true);
                }
            });
            const sysConfig = state.systemConfigMaster;
            sysConfig.taskDateTime = today;
            store.dispatch(editSystemConfig(sysConfig));
            return BackgroundFetch.Result.NewData;
        } else {
            return BackgroundFetch.Result.NoData;
        }
    }
    catch (error) {
        console.log(error);
        return BackgroundFetch.Result.Failed;
    }
});

export default class TaskHandler {
    static startBackGroundTask = () => {
        BackgroundFetch.registerTaskAsync(REMINDER_TASK_NAME, {
            minimumInterval: 1200,
            stopOnTerminate: false,
            startOnBoot: true
        });
    };

    static runTask = () => {
        const state = store.getState();
        const today = new Date();
        const todayDate = today.getDate();
        let runDate: any;
        runDate = state.systemConfigMaster.taskDateTime?.getDate();

        if (runDate && todayDate !== runDate) {
            state.reminderMaster.reminders.forEach(async (r) => {
                if (r.active) {
                    ReminderHandler.addReminder(r, true);
                }
            });
            const sysConfig = state.systemConfigMaster;
            sysConfig.taskDateTime = today;
            store.dispatch(editSystemConfig(sysConfig));
        }
    }
}