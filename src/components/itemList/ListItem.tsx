import { Text, View, Image } from "react-native";
import { ListItemProps } from "@/types/types";
import { Common } from "@/styles/common";
import { TextThemes } from "@/styles/theme";
import Badge from "../Badge";
import Messages from "@/assets/images/message.svg";
import Likes from "@/assets/images/heart.svg";
import { itemList } from "@/styles/components/itemList";


const ListItem = (props: ListItemProps) => {
    const {id, title, img, available, price, period, messages, likes} = props;

    return (
        <View style={[Common.XStack, Common.cardWrapper]}>
            <View style={Common.XStack}>
                <Image source={require("@/assets/images/icon.png")} style={itemList.listItemImage}/>
                <View style={Common.textWrapper}>
                    <Badge available={available} />
                    <Text style={{fontSize: 20}}>{title}</Text>
                    <View style={Common.XStack}>
                        <Text style={{fontSize: 20}}>
                            <Text style={{fontWeight: 600}}>{price.toLocaleString()}</Text> 원
                        </Text>
                        <Text style={[{fontSize: 10}, TextThemes.option]}>|</Text>
                        <Text style={{fontSize: 17}}>{period}일</Text>
                    </View>
                </View>
            </View>
            <View style={[Common.textOption, Common.alignLeft]}>
                    <Messages /><Text>{messages}</Text>
                    <Likes /><Text>{likes}</Text>
            </View>

        </View>
    )
};

export default ListItem;
