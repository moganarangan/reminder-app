import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { REMINDER_TASK_NAME } from '../constans/task';
import ReminderHandler from './reminderHandler';
import { store } from '../store/configureStore';
import { editSystemConfig } from '../store/actions/systemConfigAction';
import moment, { Moment } from "moment";
import { SystemConfig } from '../model/systemConfig';

TaskManager.defineTask(REMINDER_TASK_NAME, () => {
    try {
        const state = store.getState();
        const today = moment()
        console.log('executing background task: ===>', state);

        if (state.reminderMaster.reminders && state.reminderMaster.reminders.length > 0) {
            TaskHandler.execute(state, today);
            return BackgroundFetch.Result.NewData;
        } else {
            const sysConfig = state.systemConfigMaster;
            sysConfig.taskDateTime = today.toDate();
            store.dispatch(editSystemConfig(sysConfig));
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
            minimumInterval: 600,
            stopOnTerminate: false,
            startOnBoot: true
        });
    };

    static runTask() {
        const state = store.getState();
        const today = moment();

        if (state.reminderMaster.reminders && state.reminderMaster.reminders.length > 0) {
            TaskHandler.execute(state, today);
        } else {
            const sysConfig: SystemConfig = state.systemConfigMaster;
            sysConfig.taskDateTime = today.toDate();
            store.dispatch(editSystemConfig(sysConfig));
        }
    }

    static execute(state: any, today: Moment) {
        state.reminderMaster.reminders.forEach(async (r: any) => {
            if (r.active) {
                ReminderHandler.addReminder(r, true, state.reminderMaster.remindersActivity);
            }
        });

        const sysConfig: SystemConfig = state.systemConfigMaster;
        sysConfig.taskDateTime = today.toDate();
        store.dispatch(editSystemConfig(sysConfig));
    }
}
