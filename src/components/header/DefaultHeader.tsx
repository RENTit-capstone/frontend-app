import { Pressable, useWindowDimensions, View } from 'react-native';
import Logo from '@/assets/images/logo.svg';
import Notification from '@/assets/images/notification.svg';
import NoNotification from '@/assets/images/no-notification.svg';
import Avatar from '@/components/Avatar';
import { Common } from '@/styles/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useAuthStore from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { axiosGet } from '@/api';

const DefaultHeader = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const { profileImg } = useAuthStore();
    const [unread, setUnread] = useState(false);

    useEffect(() => {
        const newNotification = async () => {
            const response = await axiosGet(`/api/v1/notifications`);
            const existNew = response.data.content.filter((item: any) => item?.read === false);
            setUnread(!!existNew.length);
        };
        newNotification();
    }, []);

    return (
        <View style={[Common.headerWrapper, { paddingTop: insets.top, height: height * 0.1 }]}>
            <Pressable
                style={Common.headerWrapper}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <Logo />
            </Pressable>
            <View style={Common.headerWrapper}>
                <Pressable hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    {unread ? (
                        <Notification onPress={() => router.push('/notification')} />
                    ) : (
                        <NoNotification onPress={() => router.push('/notification')} />
                    )}
                </Pressable>
                <Pressable
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    onPress={() => router.push('/mypage')}
                >
                    {profileImg ? <Avatar url={profileImg} /> : <Avatar />}
                </Pressable>
            </View>
        </View>
    );
};

export default DefaultHeader;
