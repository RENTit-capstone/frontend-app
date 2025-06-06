import { Stack, usePathname } from 'expo-router';

export default function MypageLayout() {
    const pathname = usePathname(); // 예: "/mypage/payment"

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}
