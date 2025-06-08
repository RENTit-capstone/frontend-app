import { axiosGet, axiosPost } from '@/api';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import CustomTextInput from '@/components/CustomTextInput';
import KeyboardAvoidingView from '@/components/KeyboardAvoidingView';
import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { QnAProcessedType, QnAType } from '@/types/types';
import formatISOToDate from '@/utils/formatDateString';
import formatISOToDateTime from '@/utils/formatISOToDateTime';
import { shouldUseFlatConfig } from 'eslint/use-at-your-own-risk';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

type QnAPostingType = {
    inquiryId: number;
    memberId: number;
    type: QnAType;
    title: string;
    content: string;
    answer: string;
    images: string[];
    processed: boolean;
    createdAt: string;
};

const QnAPosting = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<QnAPostingType>();
    const { userId } = useAuthStore();
    const processed = useRef<QnAProcessedType>('NOTPROCESSED');
    const [answer, setAnswer] = useState('');

    const fetchQnAPosting = async () => {
        try {
            const response = await axiosGet(`/api/v1/inquiries/${id}`);
            setData(response.data);
            console.log(response.data);
            processed.current = response.data.processed ? 'PROCESSED' : 'NOTPROCESSED';
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    };

    const submitAnswer = async () => {
        try {
            console.log(answer);
            const reponse = await axiosPost(`/api/v1/inquiries/${id}/answer`, answer);
            Alert.alert('파손 신고에 대한 답변 작성이 완료되었습니다');
        } catch (error) {
            Alert.alert('답변은 공백일 수 없습니다.');
            console.error(error);
        }
    };

    const getTypeLabel = (type: QnAPostingType['type']) => {
        switch (type) {
            case 'SERVICE':
                return '이용 문의';
            case 'REPORT':
                return '신고';
            case 'DAMAGE':
                return '파손 신고';
            default:
                return type;
        }
    };

    useEffect(() => {
        fetchQnAPosting();
    }, []);

    const shouldAnswer = data?.memberId !== userId && data?.type === 'DAMAGE';

    if (!data) return;

    return (
        <KeyboardAvoidingView style={{ paddingBottom: 64 }}>
            <ScrollView style={[Common.container, Common.wrapper, { paddingBottom: 64 }]}>
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
                            {`[${getTypeLabel(data.type)}]  `}
                            {data.title}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
                        작성일: {formatISOToDateTime(data.createdAt)}
                    </Text>
                </View>

                {/* 구분선 */}
                <View style={[itemList.rowDivider, { marginVertical: 12, width: '100%' }]} />

                {/* 내용 */}
                <View style={{ paddingVertical: 4 }}>
                    {data.images &&
                        data.images.map((item, index) => (
                            <Image
                                source={{ uri: item }}
                                key={index}
                                style={{ width: '100%', minHeight: '500', resizeMode: 'contain' }}
                            />
                        ))}
                    <Text style={{ fontSize: 15, lineHeight: 22 }}>{data.content}</Text>
                </View>

                {/* 답변 */}
                {data.answer ? (
                    <>
                        <View
                            style={[itemList.rowDivider, { marginVertical: 12, width: '100%' }]}
                        />

                        <View
                            style={{
                                marginTop: 24,
                                padding: 16,
                                backgroundColor: '#f9f9f9',
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: '#ddd',
                                marginBottom: 64,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>답변</Text>
                            <Text style={{ fontSize: 14, lineHeight: 20 }}>{'임시 텍스트'}</Text>
                        </View>
                    </>
                ) : null}
                {shouldAnswer && (
                    <View
                        style={{
                            marginTop: 24,
                            padding: 16,
                            backgroundColor: '#f9f9f9',
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#ddd',
                            marginBottom: 64,
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>답변하기</Text>

                        <CustomTextInput
                            name="answer"
                            placeholder="파손 문의에 대한 답변을 작성해 주세요"
                            multiline
                            style={Common.textArea}
                            value={answer}
                            handleChangeText={setAnswer}
                            onEndEditing={submitAnswer}
                        />
                        <Button type="primary" onPress={submitAnswer}>
                            제출하기
                        </Button>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default QnAPosting;
