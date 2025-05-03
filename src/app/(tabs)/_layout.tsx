import { Tabs, useRouter } from "expo-router";
import { View, Pressable } from "react-native";
import { Common } from "@/styles/common";
import TabBar from "@/components/itemList/TabBar";
import { ReactElement } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Header from "@/components/Header";

const TabLayout = () => {
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
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
                }}

            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "히스토리",
                    header: () => <Header />,

                }}
            />
        </Tabs>
    );
}

export default TabLayout;