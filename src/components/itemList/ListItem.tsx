import { Text, View, Image, Pressable } from 'react-native';
import { ListItemProps } from '@/types/types';
import { Common } from '@/styles/common';
import Badge from '../Badge';
import { itemList } from '@/styles/components/itemList';
import { useRouter } from 'expo-router';
import formatISOToDate from '@/utils/formatDateString';

const ListItem = (props: ListItemProps) => {
    const { itemId, nickname, name, imageUrls, price, status, startDate, endDate } = props;
    const router = useRouter();
    const imgSrc = imageUrls ? { uri: imageUrls[0] } : require('@/assets/images/icon.png');

    return (
        <Pressable
            style={[Common.XStack, itemList.cardWrapper]}
            onPress={() => router.push(`/items/${itemId}`)}
        >
            <Image source={imgSrc} style={itemList.listItemImage} />

            <View style={[Common.wideView, { gap: 5 }]}>
                <Badge status={status} />
                <Text style={{ fontSize: 19 }}>{name}</Text>
                <View style={[Common.textWrapper]}>
                    <Text style={{ fontSize: 19, fontWeight: 600 }}>{price}</Text>
                    <Text style={{ fontSize: 19 }}> 원</Text>
                    {/* <Text style={[{fontSize: }, TextThemes.option]}>  |  </Text> */}
                </View>

                <View style={[Common.textOption]}>
                    <Text style={{ fontSize: 16 }}>
                        {formatISOToDate(startDate)} ~ {formatISOToDate(endDate)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ListItem;
