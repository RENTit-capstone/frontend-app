import { Dimensions, Pressable, SafeAreaView, View } from 'react-native';
import Logo from '@/assets/images/logo.svg';
import SearchIcon from '@/assets/images/search.svg';
import Notification from '@/assets/images/notification.svg';
import Avatar from '@/components/Avatar';
import { Common } from '@/styles/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import useAuthStore from '@/stores/useAuthStore';

const DefaultHeader = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const { profileImg } = useAuthStore();

    return (
        <View
            style={[Common.headerWrapper, { paddingTop: insets.top, height: screenHeight * 0.1 }]}
        >
            <Pressable
                style={Common.headerWrapper}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
                <Logo />
            </Pressable>
            <View style={Common.headerWrapper}>
                {/* <Pressable onPress={() => router.navigate('/search')}>
                    <SearchIcon />
                </Pressable> */}
                <Pressable hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <Notification onPress={() => router.push('/notification')} />
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
