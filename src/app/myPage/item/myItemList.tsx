import { axiosGet } from '@/api';
import Chip from '@/components/Chip';
import ListItem from '@/components/itemList/ListItem';
import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { ItemDetailsProp, ItemStatusType, ListItemProps } from '@/types/types';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

// type ItemType = {
//     itemId: number;
//     name: string;
//     price: number;
//     status: ItemStatusType;
//     thumbnail: string[];
//     createdAt: string;
// };

const MyItemList = () => {
    const [data, setData] = useState<ItemDetailsProp[]>();
    const itemId = useRef(0);

    useEffect(() => {
        fetchMyItem();
    }, []);

    const fetchMyItem = async () => {
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            console.log(response.data.items.itemId);
            itemId.current = response.data.items.itemId;
            const itemResponse = await axiosGet(`/api/v1/items/${itemId.current}`);
            console.log(itemResponse.data);
            setData(itemResponse.data);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    if (!data) return;

    return (
        <View style={[Common.container, Common.wrapper]}>
            <ScrollView
                style={[
                    {
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 4,
                    },
                ]}
            >
                {data.map((item, index) => (
                    <ListItem
                        key={index}
                        itemId={item.itemId}
                        nickname={item.owner.nickname}
                        name={item.name}
                        imageUrls={item.imageUrls}
                        price={item.price}
                        status={item.status}
                        startDate={item.startDate}
                        endDate={item.endDate}
                    />
                ))}
            </ScrollView>
        </View>
    );
};
export default MyItemList;
