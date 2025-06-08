import BackButtonHeader from '@/components/header/BackButtonHeader';
import { Stack, usePathname } from 'expo-router';

export default function PaymentLayout() {
    const pathname = usePathname(); // 예: "/mypage/payment"

    return (
        <>
            {/* <Stack.Screen options={{ headerShown: false }} /> */}

            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="payHistory"
                    options={{
                        title: '결제 내역',
                        headerShown: true,
                        header: () => <BackButtonHeader title="결제 내역" />,
                        // headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name="product"
                    options={{
                        title: '포인트 결제',
                        headerShown: true,
                        header: () => <BackButtonHeader title="포인트 결제" />,
                    }}
                />
                <Stack.Screen
                    name="withdraw"
                    options={{
                        title: '포인트 인출',
                        headerShown: true,
                        header: () => <BackButtonHeader title="포인트 인출" />,
                    }}
                />
            </Stack>
        </>
    );
}
