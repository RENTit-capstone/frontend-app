import { Pressable, View } from 'react-native';
import Logo from "@/assets/images/logo.svg";
import SearchIcon from "@/assets/images/search.svg";
import Notification from "@/assets/images/notification.svg";
import Avatar from "@/components/Avatar";
import { Common } from '@/styles/common';
import { useRouter } from 'expo-router';


const Header = () => {
    const router = useRouter();

    return (
        <View style={Common.headerWrapper}>
            <Pressable>
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
        </View> 
    );
}

export default Header;