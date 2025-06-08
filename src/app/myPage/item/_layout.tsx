import BackButtonHeader from '@/components/header/BackButtonHeader';
import { Stack } from 'expo-router';

export default function ItemLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="myItems"
                    options={{
                        title: '나의 게시글',
                        headerShown: true,
                        header: () => <BackButtonHeader title="나의 게시글" />,
                    }}
                />
            </Stack>
        </>
    );
}
