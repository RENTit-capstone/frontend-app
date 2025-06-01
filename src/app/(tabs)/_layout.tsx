import { Tabs } from 'expo-router';
import BottomNavBar from '@/components/BottomNavBar';
import { View } from 'react-native';
import DefaultHeader from '@/components/header/DefaultHeader';

const TabLayout = () => {
    return (
        <View style={{ flex: 1 }}>
            <Tabs
                screenOptions={{ header: () => <DefaultHeader /> }}
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
