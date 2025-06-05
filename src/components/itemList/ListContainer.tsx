import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { ListItemProps, ListContainerProps } from '@/types/types';
import ListItem from './ListItem';
import { itemList } from '@/styles/components/itemList';
import SearchGroup from './SearchGroup';
import { axiosGet } from '@/api';
import generateUrl from '@/utils/generateUrl';
import { Colors } from '@/styles/tokens';

const ListContainer = (props: ListContainerProps) => {
    const { type } = props;

    const [data, setData] = useState<ListItemProps[]>([]);
    const [page, setPage] = useState(0);
    const [last, setLast] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [searchOptions, setSearchOptions] = useState({
        keyword: '',
        startDate: '',
        endDate: '',
        minPrice: '',
        maxPrice: '',
        status: '',
        sort: '',
    });

    const fetchResult = useCallback(async () => {
        setRefreshing(true);

        const role = type === 'INDIVIDUAL' ? 'STUDENT' : ['COMPANY', 'COUNCIL'];
        const params = generateUrl({
            keyword: searchOptions.keyword || '',
            startDate: searchOptions.startDate
                ? new Date(searchOptions.startDate).toISOString()
                : '',
            endDate: searchOptions.endDate
                ? new Date(new Date(searchOptions.endDate).setHours(23, 59, 59, 999)).toISOString()
                : '',
            minPrice: searchOptions.minPrice || '',
            maxPrice: searchOptions.maxPrice || '',
            status: searchOptions.status ? 'AVAILABLE' : '',
            ownerRoles: role,
            page: 0,
            size: 20,
            sort: searchOptions.sort ? searchOptions.sort : ['createdAt', 'desc'],
        });

        try {
            const response = await axiosGet(`/api/v1/items?${params}`);
            setPage(response.data.pageable.pageNumber + 1);
            setData(response.data.content);
            setLast(response.data.last);
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    }, [type, searchOptions]);

    useEffect(() => {
        fetchResult();
    }, [fetchResult]);

    const handleChangeOptions = (newOptions: any) => {
        setSearchOptions((prev) => ({
            ...prev,
            ...newOptions,
        }));
    };

    if (!data) return null;

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
                        onRefresh={fetchResult}
                        colors={[Colors.darkGray]}
                        tintColor={Colors.darkGray}
                    />
                }
                renderItem={({ item }) => (
                    <View style={itemList.listContainer}>
                        <ListItem
                            itemId={item.itemId}
                            nickname={item.nickname}
                            name={item.name}
                            imageUrls={item.imageUrls}
                            price={item.price}
                            status={item.status}
                            startDate={item.startDate}
                            endDate={item.endDate}
                        />
                        <View style={[itemList.rowDivider, { marginTop: 10 }]} />
                    </View>
                )}
            />
        </View>
    );
};

export default ListContainer;
