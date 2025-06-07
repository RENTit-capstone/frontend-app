import { axiosGet } from '@/api';
import Badge from '@/components/Badge';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import formatISOtoDate from '@/utils/formatDateString';
import generateUrl from '@/utils/generateUrl';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

type QnAListType = {
    inquiryId: number;
    memberId: number;
    type: string;
    title: string;
    content: string;
    processed: false;
    createdAt: string;
};

const MyQnA = () => {
    const router = useRouter();
    const [data, setData] = useState<QnAListType[]>();

    const fetchMyQnA = async () => {
        const params = generateUrl({
            type: '',
            processed: '',
            page: 0,
            size: 20,
        });

        try {
            const response = await axiosGet(`/api/v1/inquiries?${params}`);
            console.log(response.data);
            setData(response.data.content);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    useEffect(() => {
        fetchMyQnA();
    }, []);

    if (!data) return;

    return (
        <ScrollView style={[Common.container, Common.wrapper]}>
            {data.map((item) => (
                <>
                    <Pressable
                        key={item.inquiryId}
                        onPress={() => router.push(`/myPage/qna/${item.inquiryId}`)}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            paddingVertical: 16,
                            paddingHorizontal: 20,
                            marginBottom: 12,
                            shadowColor: '#000',
                            shadowOpacity: 0.05,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 4,
                            elevation: 2,
                        }}
                    >
                        <View
                            style={[
                                Common.XStack,
                                { justifyContent: 'space-between', alignItems: 'center' },
                            ]}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#111',
                                    marginRight: 8,
                                }}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            <Badge status={item.processed ? 'PROCESSED' : 'NOTPROCESSED'} />
                        </View>
                        <Text
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                color: '#888',
                            }}
                        >
                            작성일: {formatISOtoDate(item.createdAt)}
                        </Text>
                    </Pressable>
                </>
            ))}
        </ScrollView>
    );
};
export default MyQnA;
