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

    static showNotification = (localNotification: LocalNotification, options: any) => {
        Notifications.scheduleLocalNotificationAsync(
            localNotification, options
        );
    }
}
