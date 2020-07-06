
import { createSelector } from 'reselect'

import moment from "moment";
import { reminderActivity } from '../model/reminderActivity';
import { reminder } from '../model/reminder';


const getReminders = (state: any) => state.reminderMaster.reminders;
const getRemindersActivity = (state: any) => state.reminderMaster.remindersActivity;

export const getTodayDashboardActivities = createSelector(
    [getRemindersActivity],
    (ra: Array<reminderActivity>) => {
        const t = moment().startOf('day');
        const d = t.day();
        const m = t.month();
        const y = t.year();
        return ra.filter(i =>
            moment(i.dueDate).month() === m
            && moment(i.dueDate).day() === d
            && moment(i.dueDate).year() === y)
            .sort((a, b) => moment(a.dueDate).diff(moment(b.dueDate)));
    });

export const getUpcomingDashboardActivities = createSelector(
    [getRemindersActivity],
    (ra: Array<reminderActivity>) => {
        const t = moment().startOf('day');
        return ra.filter(i => moment(i.dueDate).diff(t, 'hours') > 24)
            .sort((a, b) => moment(a.dueDate).diff(moment(b.dueDate)));
    });

export const getOverdueDashboardActivities = createSelector(
    [getRemindersActivity],
    (ra: Array<reminderActivity>) => {
        const t = moment().startOf('day');
        return ra.filter(i => (i.completionDate === null || i.completionDate === undefined)
            && moment(i.dueDate).diff(t, 'hours') < 0)
            .sort((a, b) => moment(a.dueDate).diff(moment(b.dueDate)));
    });

export const getRemindersCount = createSelector(
    [getReminders],
    (r: Array<reminder>) => {
        return r.filter(i => i.active).length;
    });

export const getConfigReminders = createSelector(
    [getReminders],
    (r: Array<reminder>) => {
        return r.sort((a, b) => a.reminderName.localeCompare(b.reminderName));
    });

export const getHistoryReminders = createSelector(
    [getRemindersActivity],
    (ra: Array<reminderActivity>) => {
        return ra.sort((a, b) => moment(b.dueDate).diff(moment(a.dueDate)));
    });