import { Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { Common } from "@/styles/common";
import Logo from "@/assets/images/logo.svg";
import SearchIcon from "@/assets/images/search.svg";
import Notification from "@/assets/images/notification.svg";
import Avatar from "@/components/Avatar";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{headerShown: true,}}
        >
            <Tabs.Screen
                name="itemList"
                options={{
                    title: "",
                    headerLeft: () => (
                        <View style={Common.headerWrapper}>
                            <Pressable>
                                <Logo />
                            </Pressable>
                        </View>
                    ), 
                    headerRight: () => (
                        <View style={Common.headerWrapper}>
                            <Pressable>
                                <SearchIcon />
                            </Pressable>
                            <Pressable>
                                <Notification />
                            </Pressable>
                            <Pressable>
                                <Avatar />
                            </Pressable>
                        </View> 
                    )
                }}
            />
        </Tabs>
    );
}

export default TabLayout;