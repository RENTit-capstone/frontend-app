import { axiosGet } from '@/api';
import Badge from '@/components/Badge';
import DropdownSort from '@/components/itemList/DropdownSort';
import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { QnAOption, QnAType } from '@/types/types';
import formatISOtoDate from '@/utils/formatDateString';
import generateUrl from '@/utils/generateUrl';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Alert, FlatList, Pressable, ScrollView, Text, View } from 'react-native';

type QnAListType = {
    inquiryId: number;
    memberId: number;
    title: string;
    content: string;
    processed: false;
    createdAt: string;
    type: QnAType;
};

type TypeOption = { label: string; value: string };
type ProcessedOption = { label: string; value: string };

const SORT_OPTIONS: ProcessedOption[] = [
    { label: '전체', value: '' },
    { label: '처리 완료', value: 'true' },
    { label: '미처리', value: 'false' },
];

const FILTER_OPTIONS: TypeOption[] = [
    { label: '전체', value: '' },
    { label: '서비스 문의', value: 'SERVICE' },
    { label: '신고', value: 'REPORT' },
    { label: '파손', value: 'DAMAGE' },
];
const ReportedIssue = () => {
    const router = useRouter();
    const { userId } = useAuthStore();
    const [data, setData] = useState<QnAListType[]>([]);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [typeFilter, setTypeFilter] = useState<TypeOption>({
        label: '전체',
        value: '',
    });
    const [processedFilter, setProcessedFilter] = useState<ProcessedOption>({
        label: '전체',
        value: '',
    });

    const pageSize = 20;

    const fetchQnA = async (reset = false) => {
        if (isLoading) return;
        if (!hasNextPage && !reset) return;

        setIsLoading(true);
        const currentPage = reset ? 0 : page;

        try {
            const params = generateUrl({
                processed: typeFilter.value,
                type: processedFilter.value,
                page: currentPage,
                size: pageSize,
            });

            const response = await axiosGet(`/api/v1/inquiries?${params}`);

            const filtered = response.data.content.filter(
                (item: QnAListType) => item.memberId !== userId,
            );

            if (reset) {
                setData(filtered); // 초기 또는 필터 변경 시 덮어쓰기
            } else {
                setData((prev) => [...prev, ...filtered]); // 추가 로딩 시 붙이기
            }

            setPage(currentPage + 1);
            setHasNextPage(!response.data.last);
        } catch (error) {
            console.warn(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQnA(true); // reset = true
    }, [typeFilter, processedFilter]);

    const handleLoadMore = () => {
        fetchQnA(false);
    };

    const getTypeLabel = (type: QnAListType['type']) => {
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

    if (!data) return;

    return (
        <View style={[Common.container, Common.wrapper]}>
            <View style={[Common.XStack, { justifyContent: 'flex-end' }]}>
                <DropdownSort
                    options={SORT_OPTIONS}
                    selected={typeFilter}
                    setSelected={setTypeFilter}
                    getLabel={(option) => option.label}
                />
                <DropdownSort
                    options={FILTER_OPTIONS}
                    selected={processedFilter}
                    setSelected={setProcessedFilter}
                    getLabel={(option) => option.label}
                />
            </View>
            <FlatList
                data={data}
                style={[Common.container, Common.wrapper]}
                keyExtractor={(item) => item.inquiryId.toString()}
                renderItem={({ item }) => (
                    <Pressable
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
                                {`[${getTypeLabel(item.type)}]  `}
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
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.3}
                ListFooterComponent={
                    isLoading ? (
                        <View style={{ paddingVertical: 20 }}>
                            <ActivityIndicator />
                        </View>
                    ) : null
                }
            />
        </View>
    );
};
export default ReportedIssue;
