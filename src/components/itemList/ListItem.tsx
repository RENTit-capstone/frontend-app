import { Text, View, Image } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { TextThemes } from "@/styles/theme";
import Badge from "../Badge";
import Messages from "@/assets/images/message.svg";
import Likes from "@/assets/images/heart.svg";

const ListItem = () => {
    // props: ListItemProps
    // const {} = props;

    return (
        <View style={Styles.XStack}>
            <Image source={require("@/assets/images/icon.png")} style={Styles.listItemImage}/>
            <View style={Styles.cardWrapper}>
                <Badge available={false} />
                <Text style={{fontSize: 20}}>asdf</Text>
                <View style={Styles.XStack}>
                    <Text style={{fontSize: 20}}>
                        <Text style={{fontWeight: 600}}>50,000</Text> 원
                    </Text>
                    <Text style={[{fontSize: 10}, TextThemes.option]}>|</Text>
                    <Text style={{fontSize: 17}}>7일</Text>
                </View>
            </View>
            <View style={[Styles.textOption, Styles.alignLeft]}>
                    <Messages /> 2
                    <Likes /> 3
            </View>

        </View>
    )
};

export default ListItem;
