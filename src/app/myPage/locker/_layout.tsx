import BackButtonHeader from '@/components/header/BackButtonHeader';
import { Stack } from 'expo-router';

export default function PaymentLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="otp"
                    options={{
                        title: 'OTP 발급',
                        headerShown: true,
                        header: () => <BackButtonHeader title="OTP 발급" />,
                    }}
                />
            </Stack>
        </>
    );
}
