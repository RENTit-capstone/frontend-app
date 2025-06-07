import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { ListItemProps, ListContainerProps } from '@/types/types';
import ListItem from './ListItem';
import { itemList } from '@/styles/components/itemList';
import SearchGroup from './SearchGroup';
import { axiosGet } from '@/api';
import generateUrl from '@/utils/generateUrl';
import { Colors } from '@/styles/tokens';

const PAGE_SIZE = 20;

const ListContainer = (props: ListContainerProps) => {
    const { type } = props;

    const [data, setData] = useState<ListItemProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);

    const [searchOptions, setSearchOptions] = useState({
        keyword: '',
        startDate: '',
        endDate: '',
        minPrice: '',
        maxPrice: '',
        status: '',
        sort: '',
    });

    const fetchResult = useCallback(
        async (pageNum = 0, isRefreshing = false) => {
            if (isRefreshing) {
                setRefreshing(true);
            } else {
                setLoadingMore(true);
            }

            const role = type === 'INDIVIDUAL' ? 'STUDENT' : ['COMPANY', 'COUNCIL'];
            const params = generateUrl({
                keyword: searchOptions.keyword || '',
                startDate: searchOptions.startDate
                    ? new Date(searchOptions.startDate).toISOString()
                    : '',
                endDate: searchOptions.endDate
                    ? new Date(
                          new Date(searchOptions.endDate).setHours(23, 59, 59, 999),
                      ).toISOString()
                    : '',
                minPrice: searchOptions.minPrice || '',
                maxPrice: searchOptions.maxPrice || '',
                status: searchOptions.status ? 'AVAILABLE' : '',
                ownerRoles: role,
                page: pageNum,
                size: PAGE_SIZE,
                sort: searchOptions.sort ? searchOptions.sort : ['createdAt', 'desc'],
            });

            try {
                const response = await axiosGet(`/api/v1/items?${params}`);
                const newData = response.data.content;
                const lastPage = response.data.last;
                // console.log(response.data);

                if (isRefreshing) {
                    setData(newData);
                } else {
                    setData((prev) => [...prev, ...newData]);
                }

                setHasNextPage(!lastPage);
            } catch (error) {
                console.error(error);
            } finally {
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        [type, searchOptions],
    );

    // 첫 로딩 & 검색옵션 바뀔 때
    useEffect(() => {
        setPage(0);
        fetchResult(0, true);
    }, [fetchResult]);

    const handleChangeOptions = (newOptions: any) => {
        setSearchOptions((prev) => ({
            ...prev,
            ...newOptions,
        }));
    };

    const loadMore = () => {
        if (!loadingMore && hasNextPage) {
            console.log('loading more');

            const nextPage = page + 1;
            setPage(nextPage);
            fetchResult(nextPage);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <SearchGroup onChange={handleChangeOptions} />
            <FlatList
                data={data}
                keyExtractor={(item, index) => `${item.itemId}-${index}`}
                contentContainerStyle={{ paddingBottom: 64 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setPage(0);
                            fetchResult(0, true);
                        }}
                        colors={[Colors.darkGray]}
                        tintColor={Colors.darkGray}
                    />
                }
                renderItem={({ item }) => (
                    <View style={itemList.listContainer}>
                        <ListItem {...item} />
                        <View style={[itemList.rowDivider, { marginTop: 10 }]} />
                    </View>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

export default ListContainer;
