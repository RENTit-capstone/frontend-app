import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";

const useNotification = () => {
    const notificationListener = useRef<any>(null);
    const responseListener = useRef<any>(null);


    useEffect(() => {
        registerForPushNotificationAsync().then(token => {
            console.log("Push Token: ", token);
                //토큰 백엔드로 전송
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("Foreground Notification: ", notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("Notification Clicked: ", response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const registerForPushNotificationAsync = async () => {
        let token;

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                alert("알림 권한이 필요합니다");
                return null;
            }

            token = (await Notifications.getExpoPushTokenAsync()).data;
        }
        else alert("실제 디바이스에서만 알림을 받을 수 있습니다.");

        if (Platform.OS==="android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
            });
        }
        return token;
    }
}
export default useNotification;