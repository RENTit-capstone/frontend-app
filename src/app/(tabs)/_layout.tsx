import { Tabs } from 'expo-router';
import Header from '@/components/Header';
import BottomNavBar from '@/components/BottomNavBar';
import { SafeAreaView, View } from 'react-native';

const TabLayout = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tabs
                screenOptions={{ header: () => <Header /> }}
                tabBar={(props) => <BottomNavBar {...props} />}
            >
                <Tabs.Screen
                    name="itemList"
                    options={{
                        title: '홈',
                    }}
                />
                <Tabs.Screen
                    name="history"
                    options={{
                        title: '히스토리',
                    }}
                />
                <Tabs.Screen
                    name="mypage"
                    options={{
                        title: '마이페이지',
                    }}
                />
            </Tabs>
        </View>
    );
};

export default TabLayout;
