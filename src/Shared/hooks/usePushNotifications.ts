import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
//React hooks
import { useEffect, useState } from 'react';
//Requests manager
import AxiosRequest from '../infrastructure/Requests/AxiosRequest';



const usePushNotifications = () => {
    //State
    const [deviceToken, setDeviceToken] = useState<string|undefined>();
    //We register the push notifications
    useEffect(() => {
        (async function () {
            try {
                if (Constants.isDevice) {
                    const { status: existingStatus } = await Notifications.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== 'granted') {
                        const { status } = await Notifications.requestPermissionsAsync();
                        finalStatus = status;
                    }
                    if (finalStatus !== 'granted') {
                        alert('Failed to get push token for push notification!');
                        return;
                    }
                    setDeviceToken(
                        (await Notifications.getExpoPushTokenAsync()).data
                    );
                } else {
                    alert('Must use physical device for Push Notifications');
                }
                if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    });
                }
            } catch(error) {
                console.log(error.message);
            }
        })()
    }, []);

    useEffect(() => {
        if(!deviceToken)
            return;
        AxiosRequest.post(
            '/notifications/register-token',
            { deviceToken }
        )
            .then(response => console.log('Registered for push notifications'))
            .catch(error => alert(error.message))
    }, [deviceToken]);
}

export default usePushNotifications;