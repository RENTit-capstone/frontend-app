import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { axiosPost } from '@/api';
import { Alert } from 'react-native';

const useFirebaseNotification = () => {
    const [fcmToken, setFcmToken] = useState<string>('');

    const saveTokentoServer = async (token: string) => {
        try {
            console.log('토큰전송');
            const response = await axiosPost(`/api/v1/device-token`, { token });
            console.log(response);
            // await SecureStorage.setItemAsync('expoPushToken', token);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                // 알림 권한 요청
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                if (enabled) {
                    console.log('알림 권한 허용됨');

                    // FCM 토큰 받기
                    const token = await messaging().getToken();
                    console.log('FCM Token:', token);
                    setFcmToken(token);

                    // 토큰을 서버에 저장
                    // await saveFCMTokenToServer(token);
                    // saveTokentoServer(token);
                } else {
                    console.log('알림 권한 거부됨');
                }
            } catch (error) {
                console.log('Firebase 초기화 실패:', error);
            }
        };
        initializeFirebase();
        // 포그라운드 메시지 처리
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('포그라운드 메시지:', remoteMessage);
            Alert.alert(
                remoteMessage.notification?.title || '알림',
                remoteMessage.notification?.body || '새 메시지가 도착했습니다.',
            );
        });

        // 백그라운드/종료 상태에서 앱 열림 처리
        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('백그라운드에서 알림으로 앱 열림:', remoteMessage);
        });

        // 앱이 종료된 상태에서 알림으로 앱 열림 처리
        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log('앱 종료 상태에서 알림으로 열림:', remoteMessage);
                }
            });

        // 토큰 갱신 처리
        const tokenRefreshListener = messaging().onTokenRefresh((token) => {
            console.log('FCM 토큰 갱신:', token);
            setFcmToken(token);
            // 갱신된 토큰을 서버에 저장
            // saveTokentoServer(token);
        });

        return () => {
            unsubscribe();
            tokenRefreshListener();
        };
    }, []);

    return { fcmToken };
};
export default useFirebaseNotification;
