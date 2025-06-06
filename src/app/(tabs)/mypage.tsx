import { Pressable, Text, View } from 'react-native';
import { Common } from '@/styles/common';
import ArrowRight from '@/assets/images/right-arrow.svg';
import { useRouter } from 'expo-router';
import { itemList } from '@/styles/components/itemList';
import { Colors } from '@/styles/tokens';

const options = [
    {
        category: '문의',
        contents: [
            {
                name: '문의 작성',
                link: '/myPage/QnA/NewQnA',
            },
            {
                name: '내 문의 보기',
                link: '/myPage/QnA/MyQnA',
            },
        ],
    },
    {
        category: '사물함',
        contents: [
            {
                name: 'OTP 발급',
                link: '/myPage/locker/otp',
            },
            {
                name: '사물함 이용 안내',
                link: '/myPage/locker/method',
            },
        ],
    },
    {
        category: '결제',
        contents: [
            {
                name: '포인트 결제',
                link: '/myPage/payment/product',
            },
            {
                name: '결제 내역',
                link: '/myPage/payment/payHistory',
            },
        ],
    },
];

const Mypage = () => {
    const router = useRouter();

    return (
        <View style={[Common.container, Common.wrapper]}>
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
                    <>{console.log(item)}</>
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
                                onPress={() => router.push(subpage.link)}
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
                            <View style={[itemList.rowDivider, { width: '100%' }]} />
                        </>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default Mypage;
