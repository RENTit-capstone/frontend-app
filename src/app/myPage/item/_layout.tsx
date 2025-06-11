import BackButtonHeader from '@/components/header/BackButtonHeader';
import { Stack } from 'expo-router';

export default function ItemLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="myItems"
                    options={{
                        title: '내 물품 관리',
                        headerShown: true,
                        header: () => <BackButtonHeader title="내 물품 관리" />,
                    }}
                />
            </Stack>
        </>
    );
}
