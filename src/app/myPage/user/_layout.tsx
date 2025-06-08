import BackButtonHeader from '@/components/header/BackButtonHeader';
import { Stack, usePathname } from 'expo-router';

export default function PaymentLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="editProfile"
                    options={{
                        title: '회원 정보 수정',
                        headerShown: true,
                        header: () => <BackButtonHeader title="회원 정보 수정" />,
                    }}
                />
            </Stack>
        </>
    );
}
