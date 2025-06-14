import BackButtonHeader from '@/components/header/BackButtonHeader';
import { Stack, usePathname } from 'expo-router';

export default function QnALayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="MyQnA"
                    options={{
                        title: '내 문의 보기',
                        headerShown: true,
                        header: () => <BackButtonHeader title="내 문의 보기" />,
                    }}
                />
                <Stack.Screen
                    name="NewQnA"
                    options={{
                        title: '문의 작성',
                        headerShown: true,
                        header: () => <BackButtonHeader title="문의 작성" />,
                    }}
                />
                <Stack.Screen
                    name="[id]"
                    options={{
                        title: '문의 게시글',
                        headerShown: true,
                        header: () => <BackButtonHeader />,
                    }}
                />
                <Stack.Screen
                    name="damageReport"
                    options={{
                        title: '파손 신고',
                        headerShown: true,
                        header: () => <BackButtonHeader title="파손 신고" />,
                    }}
                />
                <Stack.Screen
                    name="reportedIssue"
                    options={{
                        title: '내가 받은 신고 내역',
                        headerShown: true,
                        header: () => <BackButtonHeader title="내가 받은 신고 내역" />,
                    }}
                />
            </Stack>
        </>
    );
}
