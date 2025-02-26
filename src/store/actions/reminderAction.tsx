import {
  ADD_REMINDER, EDIT_REMINDER, DELETE_REMINDER,
  ADD_REMINDER_ACTIVITY, EDIT_REMINDER_ACTIVITY, DELETE_REMINDER_ACTIVITY, DELETE_REMINDER_ACTIVITY_MORE
} from '../../constans/reminderMaster';
import { reminder } from '../../model/reminder';
import { reminderActivity } from '../../model/reminderActivity';

export const addReminder = (newReminder: reminder) => ({
  type: ADD_REMINDER,
  newReminder
});

export const editReminder = (editReminder: reminder) => ({
  type: EDIT_REMINDER,
  editReminder
});

export const deleteReminder = (deleteReminder: reminder) => ({
  type: DELETE_REMINDER,
  deleteReminder
});

export const addReminderActivity = (addReminderActivity: reminderActivity) => ({
  type: ADD_REMINDER_ACTIVITY,
  addReminderActivity
});

export const editReminderActivity = (editReminderActivity: reminderActivity) => ({
  type: EDIT_REMINDER_ACTIVITY,
  editReminderActivity
});

export const deleteReminderActivity = (deleteReminderActivity: reminderActivity) => ({
  type: DELETE_REMINDER_ACTIVITY,
  deleteReminderActivity
});

export const deleteReminderActivityMore = (deleteReminderActivity: Array<string>) => ({
  type: DELETE_REMINDER_ACTIVITY_MORE,
  deleteReminderActivity
});