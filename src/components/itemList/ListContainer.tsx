import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ListItemProps, ListContainerProps } from '@/types/types';
import ListItem from './ListItem';
import { itemList } from '@/styles/components/itemList';
import SearchGroup from './SearchGroup';
import { axiosGet } from '@/api';
import generateUrl from '@/utils/generateUrl';

const ListContainer = (props: ListContainerProps) => {
    const { type } = props;
    const [last, setLast] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [searchOptions, setSearchOptions] = useState({
        keyword: '',
        startDate: '',
        endDate: '',
        startPrice: '',
        endPrice: '',
    });

    useEffect(() => {
        fetchResult();
    }, [type, searchOptions]);

    const fetchResult = async () => {
        const role = type === 'INDIVIDUAL' ? 'STUDENT' : ['COMPANY', 'COUNCIL'];
        const params = generateUrl({
            keyword: searchOptions.keyword || '',
            startDate: searchOptions.startDate
                ? new Date(searchOptions.startDate).toISOString()
                : '',
            endDate: searchOptions.endDate
                ? new Date(new Date(searchOptions.endDate).setHours(23, 59, 59, 999)).toISOString()
                : '',

            minPrice: searchOptions.startPrice || '',
            maxPrice: searchOptions.endPrice || '',
            stauts: ['AVAILABLE', 'OUT'],
            ownerRoles: role,
            page: 0,
            size: 20,
            sort: ['createdAt', 'desc'],
        });
        try {
            const response = await axiosGet(`/api/v1/items?${params}`);
            setPage(response.data.pageable.pageNumber + 1);
            setData(response.data.content);
            setLast(response.data.last);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeOptions = (newOptions: any) => {
        setSearchOptions((prev) => ({
            ...prev,
            ...newOptions,
        }));
    };

    if (!data) return;

    return (
        <>
            <SearchGroup onChange={handleChangeOptions} />
            <View style={{ paddingBottom: 64 }}>
                {data.map((item: ListItemProps, index: number) => (
                    <View key={index} style={itemList.listContainer}>
                        <ListItem
                            itemId={item.itemId}
                            nickname={item.nickname}
                            name={item.name}
                            imgUrls={item.imgUrls}
                            price={item.price}
                            status={item.status}
                            startDate={item.startDate}
                            endDate={item.endDate}
                        />
                        <View style={[itemList.rowDivider, { marginTop: 10 }]} />
                    </View>
                ))}
            </View>
        </>
    );
};

export default ListContainer;
