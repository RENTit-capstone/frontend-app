import { Text, View, Image, Pressable } from "react-native";
import { ListItemProps } from "@/types/types";
import { Common } from "@/styles/common";
import { TextThemes } from "@/styles/theme";
import Badge from "../Badge";
import { itemList } from "@/styles/components/itemList";
import { useRouter } from "expo-router";
import formatISOToDate from "@/utils/formatDate";

const ListItem = (props: ListItemProps) => {
    const router = useRouter();
    const {id, nickname, name, imgUrls, price, status, startDate, endDate} = props;

    return (
        <Pressable style={[Common.XStack, itemList.cardWrapper]} onPress={() => (router.push(`/items/${id}`))}>
            <Image source={require("@/assets/images/icon.png")} style={itemList.listItemImage}/>

            <View style={[Common.wideView]}>
                <Badge status={status} />
                <Text style={{fontSize: 20}}>{name}</Text>
                <View style={[Common.textWrapper]}>
                    <Text style={{fontSize: 20, fontWeight: 600}}>{price.toLocaleString()}</Text>
                    <Text style={{fontSize: 20}}> 원</Text>
                    <Text style={[{fontSize: 15}, TextThemes.option]}>  |  </Text>
                </View>

                <View style={[Common.textOption, itemList.interactions]}>
                    <Text style={{fontSize: 17}}>{formatISOToDate(startDate)} ~ {formatISOToDate(endDate)}</Text>
                </View>
            </View>
        </Pressable>
    )
};

export default ListItem;
