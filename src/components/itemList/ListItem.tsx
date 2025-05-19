import { Text, View, Image, Pressable } from "react-native";
import { ListItemProps } from "@/types/types";
import { Common } from "@/styles/common";
import { TextThemes } from "@/styles/theme";
import Badge from "../Badge";
import Messages from "@/assets/images/message.svg";
import Likes from "@/assets/images/heart.svg";
import { itemList } from "@/styles/components/itemList";
import { useRouter } from "expo-router";


const ListItem = (props: ListItemProps) => {
    const router = useRouter();
    const {id, title, img, available, price, period, messages, likes} = props;
    const imgSrc = img ? {uri: img} : require("@/assets/images/icon.png");

    return (
        <Pressable style={[Common.XStack, itemList.cardWrapper]} onPress={() => (router.navigate(`/items/${id}`))}>
            <Image source={imgSrc} style={itemList.listItemImage}/>

            <View style={[Common.wideView]}>
                <Badge available={available} />
                <Text style={{fontSize: 20}}>{title}</Text>
                <View style={[Common.textWrapper]}>
                    <Text style={{fontSize: 20, fontWeight: 600}}>{price.toLocaleString()}</Text>
                    <Text style={{fontSize: 20}}> 원</Text>
                    <Text style={[{fontSize: 15}, TextThemes.option]}>  |  </Text>
                    <Text style={{fontSize: 17}}>{period}일</Text>
                </View>

                <View style={[Common.textOption, itemList.interactions]}>
                    <Messages /><Text>{messages}</Text>
                    <Likes /><Text>{likes}</Text>
                </View>
            </View>
        </Pressable>
    )
};

export default ListItem;
