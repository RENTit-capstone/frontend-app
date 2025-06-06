import { axiosGet } from '@/api';
import Badge from '@/components/Badge';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { QnAProcessedType, QnAType } from '@/types/types';
import formatISOToDate from '@/utils/formatDateString';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';

type QnAPostingType = {
    inquiryId: number;
    memberId: number;
    type: QnAType;
    title: string;
    content: string;
    answer: string;
    images: string;
    processed: boolean;
    createdAt: string;
};

const QnAPosting = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<QnAPostingType>();
    const processed = useRef<QnAProcessedType>('NOTPROCESSED');

    const fetchQnAPosting = async () => {
        try {
            const response = await axiosGet(`/api/v1/inquiries/${id}`);
            setData(response.data);
            processed.current = response.data.processed ? 'PROCESSED' : 'NOTPROCESSED';
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    };
    useEffect(() => {
        fetchQnAPosting();
    });

    if (!data) return;

    return (
        <View style={[Common.container, Common.wrapper]}>
            {/* 헤더 */}
            <View style={{ marginBottom: 16 }}>
                <Badge status={data.processed ? 'PROCESSED' : 'NOTPROCESSED'} />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginVertical: 12,
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>
                        {data.title}
                    </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
                    작성일: {formatISOToDate(data.createdAt)}
                </Text>
            </View>

            {/* 구분선 */}
            <View style={[itemList.rowDivider, { marginVertical: 12, width: '100%' }]} />

            {/* 내용 */}
            <View style={{ paddingVertical: 4 }}>
                <Text style={{ fontSize: 15, lineHeight: 22 }}>{data.content}</Text>
            </View>

            {/* 답변 */}
            {data.answer ? (
                <View
                    style={{
                        marginTop: 24,
                        padding: 16,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#ddd',
                    }}
                >
                    <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>운영자 답변</Text>
                    <Text style={{ fontSize: 14, lineHeight: 20 }}>{data.answer}</Text>
                </View>
            ) : null}
        </View>
    );
};
export default QnAPosting;
