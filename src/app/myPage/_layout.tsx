import { Stack, usePathname } from 'expo-router';

export default function MypageLayout() {
    const pathname = usePathname();

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}
