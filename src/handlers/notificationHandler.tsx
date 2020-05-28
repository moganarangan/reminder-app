import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { LocalNotification } from 'expo/build/Notifications/Notifications.types';

export default class NotificationHandler {

    static askNotification = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (Constants.isDevice && finalStatus === 'granted') {
            Notifications.addListener(NotificationHandler.handleNotification);
        }
    };

    static handleNotification = (notification: any) => {
        console.log('ok! got your notification', JSON.stringify(notification.data));
    }

    static showNotification = (reminder: string) => {
        const localNotification: LocalNotification = {
            title: 'done',
            body: reminder,
            data: {reminder}
        };

        const schedulingOptions = {
            time: (new Date()).getTime() + 10
        }

        console.log('show notification');

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    }
}
