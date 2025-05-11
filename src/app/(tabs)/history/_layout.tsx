import Header from '@/components/Header';
import { Stack, usePathname } from 'expo-router';

export default function HistoryLayout() {
    const pathname = usePathname();
    const isRoot = pathname==="/history";

    return(
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen 
                name="index"
                options={{
                    header: () => <Header />
                }}
            />
        </Stack>
    );
}