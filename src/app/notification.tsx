import { axiosGet, axiosPut } from '@/api';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { Colors } from '@/styles/tokens';
import formatISOtoDate from '@/utils/formatDateString';
import generateUrl from '@/utils/generateUrl';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

type NotificationType =
    | 'RENT_REQUESTED'
    | 'RENT_CANCEL'
    | 'ITEM_RETURNED'
    | 'ITEM_DAMAGED_REQUEST'
    | 'RENT_START_D_3'
    | 'RENT_START_D_0'
    | 'REQUEST_ACCEPTED'
    | 'REQUEST_REJECTED'
    | 'ITEM_DAMAGED_RESPONSE'
    | 'ITEM_PLACED'
    | 'RENT_END_D_3'
    | 'RENT_END_D_0'
    | 'INQUIRY_RESPONSE';

type NotificationDataType = {
    id: number;
    type: string;
    title: string;
    body: string;
    read: boolean;
    createdAt: string;
};

const PAGE_SIZE = 20;

const Notification = () => {
    const [data, setData] = useState<NotificationDataType[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [selected, setSelected] = useState('');
    const [notReadOnly, setNotReadOnly] = useState(false);
    const router = useRouter();

    const fetchNotification = useCallback(
        async (pageNum = 0, isRefreshing = false) => {
            if (isRefreshing) setRefreshing(true);
            else setLoadingMore(true);
            const params = generateUrl({
                page: pageNum,
                size: PAGE_SIZE,
                sort: selected ? selected : 'createdAt,desc',
            });

            try {
                const response = await axiosGet(`/api/v1/notifications?${params}`);
                const newData = response.data.content;
                const lastPage = response.data.last;

                if (isRefreshing) setData(newData);
                else setData((prev) => [...prev, ...newData]);

                setHasNextPage(!lastPage);

                console.log(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert(`${error}`);
            } finally {
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        [selected],
    );

    const readNotification = async (id: number, type: NotificationType) => {
        try {
            const response = await axiosPut(`/api/v1/notifications/${id}/read`);
            if (type === 'ITEM_DAMAGED_REQUEST' || type === 'INQUIRY_RESPONSE') {
                router.push('/myPage/qna/MyQna');
            } else if (type === 'ITEM_DAMAGED_RESPONSE') router.push('/mypage/qna/reportedIssue');
            else router.push('/(tabs)/history');
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    useEffect(() => {
        setPage(0);
        fetchNotification(0, true);
    }, []);

    if (!data) return;

    const loadMore = () => {
        if (!loadingMore && hasNextPage) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchNotification(nextPage);
        }
    };

    const NotificationCard = (item: NotificationDataType) => {
        return (
            <Pressable
                onPress={() => readNotification(item.id, item.type)}
                style={{
                    backgroundColor: item.read ? '#F8F8F8' : '#FFFFFF',
                    paddingVertical: 16,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    marginBottom: 12,
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: 2,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={[
                            Common.bold,
                            {
                                fontSize: 16,
                                color: item.read ? '#888' : '#111',
                                flex: 1,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    {!item.read && (
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#FF4D4F',
                                marginLeft: 8,
                            }}
                        />
                    )}
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        color: '#555',
                        marginTop: 4,
                    }}
                    numberOfLines={2}
                >
                    {item.body}
                </Text>
                {item.createdAt && (
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#999',
                            marginTop: 6,
                            textAlign: 'right',
                        }}
                    >
                        {formatISOtoDate(item.createdAt)}
                    </Text>
                )}
            </Pressable>
        );
    };

    return (
        <View style={[Common.container, Common.wrapper]}>
            <View style={[Common.XStack, { justifyContent: 'flex-start' }]}>
                <Checkbox
                    value={notReadOnly}
                    onValueChange={setNotReadOnly}
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                />
                <Text>안읽은 알림만 보기</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => `${index}`}
                contentContainerStyle={{ paddingBottom: 64 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setPage(0);
                            fetchNotification();
                        }}
                        colors={[Colors.darkGray]}
                        tintColor={Colors.darkGray}
                    />
                }
                renderItem={({ item }) => {
                    if (notReadOnly) {
                        if (!item.read) return <NotificationCard {...item} />;
                        else return null;
                    } else {
                        return <NotificationCard {...item} />;
                    }
                }}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};
export default Notification;
