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
<<<<<<< HEAD
=======
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
                    )
>>>>>>> ded24cd (Feat: 검색 페이지 추가)
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