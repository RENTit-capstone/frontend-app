import { Tabs } from "expo-router";
import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";
import { SafeAreaView } from "react-native";
import { Common } from "@/styles/common";

const TabLayout = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}> 
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
        </SafeAreaView>
    );
}

export default TabLayout;