import { Pressable, SafeAreaView, View } from 'react-native';
import Logo from "@/assets/images/logo.svg";
import SearchIcon from "@/assets/images/search.svg";
import Notification from "@/assets/images/notification.svg";
import Avatar from "@/components/Avatar";
import { Common } from '@/styles/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Header = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    
    return (
        <SafeAreaView style={[Common.headerWrapper, {paddingTop: insets.top}]}>
            <Pressable style={Common.headerWrapper}>
                <Logo />
            </Pressable>
            <View style={Common.headerWrapper}>
                <Pressable onPress={() => (router.navigate("/search"))}>
                    <SearchIcon />
                </Pressable>
                <Pressable>
                    <Notification />
                </Pressable>
                <Pressable>
                    <Avatar />
                </Pressable>
            </View>
        </SafeAreaView> 
    );
}

export default Header;