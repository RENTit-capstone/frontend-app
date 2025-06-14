import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Common } from '@/styles/common';
import ArrowRight from '@/assets/images/right-arrow.svg';
import { Link, useRouter } from 'expo-router';
import { itemList } from '@/styles/components/itemList';
import { Colors } from '@/styles/tokens';
import useAuthStore from '@/stores/useAuthStore';
import { axiosNoInterceptor, axiosPost } from '@/api';
import Profile from '@/components/Profile';

const Mypage = () => {
    const router = useRouter();
    const { refreshToken, accessToken } = useAuthStore();
    const options = [
        {
            category: '나의 물품',
            contents: [
                {
                    name: '내 물품 관리',
                    onPress: () => router.push('/myPage/item/myItems'),
                },
            ],
        },
        {
            category: '결제',
            contents: [
                {
                    name: '포인트 결제',
                    onPress: () => router.push('/myPage/payment/product'),
                },
                {
                    name: '결제 내역',
                    onPress: () => router.push('/myPage/payment/payHistory'),
                },
                {
                    name: '포인트 인출',
                    onPress: () => router.push('/myPage/payment/withdraw'),
                },
            ],
        },
        {
            category: '문의',
            contents: [
                {
                    name: '문의 작성',
                    onPress: () => router.push('/myPage/qna/NewQnA'),
                },
                {
                    name: '내 문의 보기',
                    onPress: () => router.push('/myPage/qna/MyQnA'),
                },
                {
                    name: '내가 받은 신고 내역',
                    onPress: () => router.push('/myPage/qna/reportedIssue'),
                },
            ],
        },
    ];

    const handleLogout = async () => {
        const payload = {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
        try {
            const response = await axiosNoInterceptor.post(`/api/v1/auth/logout`, payload);
        } catch (error) {
            console.error(error);
        }
        Alert.alert('로그아웃 되었습니다.');
        router.replace('/(auth)/login');
    };

    return (
        <View style={[Common.container]}>
            <ScrollView style={[Common.wrapper, { marginBottom: 100 }]}>
                <Profile />
                {options.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            gap: 16,
                            alignItems: 'flex-start',
                            backgroundColor: 'white',
                            marginVertical: 16,
                            justifyContent: 'flex-start',
                            paddingVertical: 26,
                            borderRadius: 8,
                            paddingHorizontal: 16,
                        }}
                    >
                        <Text
                            style={[
                                {
                                    fontSize: 16,
                                    padding: 16,
                                    borderRadius: 8,
                                    backgroundColor: Colors.navy,
                                    color: Colors.white,
                                    alignSelf: 'stretch',
                                },
                            ]}
                        >
                            {item.category}
                        </Text>
                        {item.contents.map((subpage, index) => (
                            <>
                                <Pressable
                                    key={index}
                                    onPress={subpage.onPress}
                                    style={[
                                        Common.XStack,
                                        {
                                            alignSelf: 'stretch',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        },
                                    ]}
                                >
                                    <Text style={Common.bold}>{subpage.name}</Text>
                                    <ArrowRight />
                                </Pressable>
                                <View
                                    key={`${index}+${index}`}
                                    style={[itemList.rowDivider, { width: '100%' }]}
                                />
                            </>
                        ))}
                    </View>
                ))}
                <Pressable
                    onPress={handleLogout}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100,
                    }}
                >
                    <Text style={[Common.textOption]}>로그아웃</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default Mypage;
