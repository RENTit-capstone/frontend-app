import { Tabs } from "expo-router";
import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{header: () => <Header />}}
            tabBar={(props) => <BottomNavBar {...props} />}
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