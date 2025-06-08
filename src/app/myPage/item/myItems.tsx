import { axiosGet } from '@/api';
import Badge from '@/components/Badge';
import Chip from '@/components/Chip';
import ListItem from '@/components/itemList/ListItem';
import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { ItemDetailsProp, ItemStatusType, ListItemProps } from '@/types/types';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';

type ItemType = {
    itemId: number;
    name: string;
    price: number;
    status: ItemStatusType;
    thumbnailUrl: string[];
    createdAt: string;
};

const MyItems = () => {
    const [data, setData] = useState<ItemType[]>();
    const router = useRouter();

    useEffect(() => {
        fetchMyItem();
    }, []);

    const fetchMyItem = async () => {
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            setData(response.data.items);
            console.log(response.data);
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
                        padding: 16,
                    },
                ]}
            >
                {data.map((item, index) => {
                    const imgSrc = item.thumbnailUrl
                        ? { uri: item.thumbnailUrl }
                        : require('@/assets/images/icon.png');

                    return (
                        <>
                            <Pressable
                                key={index}
                                style={[Common.XStack, itemList.cardWrapper]}
                                onPress={() => router.push(`/items/${item.itemId}`)}
                            >
                                <Image source={imgSrc} style={itemList.listItemImage} />

                                <View style={[Common.wideView, { gap: 5 }]}>
                                    <Badge status={item.status} />
                                    <Text style={{ fontSize: 19 }}>{item.name}</Text>
                                    <View style={[Common.textWrapper]}>
                                        <Text style={{ fontSize: 19, fontWeight: 600 }}>
                                            {item.price}
                                        </Text>
                                        <Text style={{ fontSize: 19 }}> 원</Text>
                                        {/* <Text style={[{fontSize: }, TextThemes.option]}>  |  </Text> */}
                                    </View>
                                </View>
                            </Pressable>
                            <View
                                style={[itemList.rowDivider, { marginVertical: 16, width: '100%' }]}
                            />
                        </>
                    );
                })}
            </ScrollView>
        </View>
    );
};
export default MyItems;
