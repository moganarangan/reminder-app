import {
  ADD_REMINDER, EDIT_REMINDER, DELETE_REMINDER,
  ADD_REMINDER_ACTIVITY, EDIT_REMINDER_ACTIVITY, DELETE_REMINDER_ACTIVITY
} from '../../constans/reminderMaster'

export const addReminder = (newReminder: any) => ({
  type: ADD_REMINDER,
  newReminder
});

export const editReminder = (editReminder: any) => ({
  type: EDIT_REMINDER,
  editReminder
});

export const deleteReminder = (deleteReminder: any) => ({
  type: DELETE_REMINDER,
  deleteReminder
});

export const addReminderActivity = (addReminderActivity: any) => ({
  type: ADD_REMINDER_ACTIVITY,
  addReminderActivity
});

export const editReminderActivity = (editReminderActivity: any) => ({
  type: EDIT_REMINDER_ACTIVITY,
  editReminderActivity
});

export const deleteReminderActivity = (deleteReminderActivity: any) => ({
  type: DELETE_REMINDER_ACTIVITY,
  deleteReminderActivity
});