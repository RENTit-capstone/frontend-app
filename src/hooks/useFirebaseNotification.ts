import { useCallback, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { axiosPost } from '@/api';
import { Alert } from 'react-native';

const useFirebaseNotification = () => {
    const [fcmToken, setFcmToken] = useState<string>('');

    const saveTokenToServer = useCallback(async (token: string) => {
        try {
            console.log('FCM 토큰 서버 전송:', token);
            const response = await axiosPost(`/api/v1/device-token`, { token });
            console.log('토큰 저장 성공:', response);
        } catch (error) {
            console.error('토큰 저장 실패:', error);
        }
    }, []);

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
                    if (token) {
                        console.log('FCM Token:', token);
                        setFcmToken(token);
                        await saveTokenToServer(token); // 토큰 즉시 서버 전송
                    } else {
                        console.log('FCM 토큰 생성 실패');
                    }
                } else {
                    console.log('알림 권한 거부됨');
                }
            } catch (error) {
                console.log('Firebase 초기화 실패:', error);
            }
        };
        const timeout = setTimeout(() => {
            initializeFirebase();
        }, 500); // 0.5초 지연
        // 포그라운드 메시지 처리
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('포그라운드 메시지:', remoteMessage);
            // Alert.alert(
            //     remoteMessage.notification?.title || '알림',
            //     remoteMessage.notification?.body || '새 메시지가 도착했습니다.',
            // );
        });

        // 백그라운드/종료 상태에서 앱 열림 처리
        const notificationOpenedListener = messaging().onNotificationOpenedApp((remoteMessage) => {
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
        const tokenRefreshListener = messaging().onTokenRefresh(async (token) => {
            console.log('FCM 토큰 갱신:', token);
            setFcmToken(token);
            // 갱신된 토큰을 서버에 저장
            await saveTokenToServer(token); // 갱신된 토큰도 서버 전송
        });

        return () => {
            clearTimeout(timeout);
            unsubscribe();
            notificationOpenedListener();
            tokenRefreshListener();
        };
    }, []);

    return { fcmToken };
};
export default useFirebaseNotification;
