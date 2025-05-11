import Header from '@/components/Header';
import { Stack } from 'expo-router';

export default function ItemListLayout() {
    return(
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen 
                name="index"
                options={{
                    title: "홈",
                    header: () => <Header />,
                }}
            />
            <Stack.Screen 
                name="[id]"
                options={{
                    title: "asdf",
                    header: () => <Header />,
                }}
            />
        </Stack>
    );
}