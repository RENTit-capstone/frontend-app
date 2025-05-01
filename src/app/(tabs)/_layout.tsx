import { Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { Common } from "@/styles/common";
import Logo from "@/assets/images/logo.svg";
import Home from "@/assets/images/home.svg";
import SearchIcon from "@/assets/images/search.svg";
import Notification from "@/assets/images/notification.svg";
import Avatar from "@/components/Avatar";
import Colors from "@/constants/Colors";
import TabBar from "@/components/itemList/TabBar";
import { ReactElement } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabLayout = () => {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            // screenOptions={{
            //     headerShown: true, 
            //     tabBarActivateTintColor: "#455464",
            //     tabBarInactiveTintColor: "#ccc",
            //     tabBarStyle: {
            //         backgroundColor: Colors.secondary
            //     },
            //     tabBarLabelStyle: {
            //         fontSize: 14,
            //     }
            // }}
        >
            <Tabs.Screen
                name="itemList"
                options={{
                    title: "홈",
                    tabBarIcon: () => <Home />,
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
            <Tabs.Screen
                name="history"
                options={{
                    title: "히스토리"
                }}
            />
        </Tabs>
    );
}

export default TabLayout;