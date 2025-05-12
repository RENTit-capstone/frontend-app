import { Tabs } from "expo-router";
import TabBar from "@/components/bottomTabBar/TabBar";
import Header from "@/components/Header";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{header: () => <Header />}}
            tabBar={(props) => <TabBar {...props} />}
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
                }}
            />
        </Tabs>
    );
}

export default TabLayout;