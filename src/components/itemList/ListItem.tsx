import { Text, View, Image } from "react-native";
import { ListItemProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { TextThemes } from "@/styles/theme";
import Badge from "../Badge";
import Messages from "@/assets/images/message.svg";
import Likes from "@/assets/images/heart.svg";


const ListItem = (props: ListItemProps) => {
    const {id, title, img, available, price, period, messages, likes} = props;

    return (
        <View style={[Styles.XStack, Styles.cardWrapper]}>
            <View style={Styles.XStack}>
                <Image source={require("@/assets/images/icon.png")} style={Styles.listItemImage}/>
                <View style={Styles.textWrapper}>
                    <Badge available={available} />
                    <Text style={{fontSize: 20}}>{title}</Text>
                    <View style={Styles.XStack}>
                        <Text style={{fontSize: 20}}>
                            <Text style={{fontWeight: 600}}>{price.toLocaleString()}</Text> 원
                        </Text>
                        <Text style={[{fontSize: 10}, TextThemes.option]}>|</Text>
                        <Text style={{fontSize: 17}}>{period}일</Text>
                    </View>
                </View>
            </View>
            <View style={[Styles.textOption, Styles.alignLeft]}>
                    <Messages /><Text>{messages}</Text>
                    <Likes /><Text>{likes}</Text>
            </View>

        </View>
    )
};

export default ListItem;
