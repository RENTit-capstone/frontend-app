import { Text, View, Image } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { TextThemes } from "@/styles/theme";
import Badge from "../Badge";

const ListItem = () => {
    // props: ListItemProps
    // const {} = props;

    return (
        <View style={Styles.XStack}>
            <Image source={require("@/assets/images/icon.png")} style={Styles.listItemImage}/>
            <View style={Styles.fullYStack}>
                <Badge available={false} />
                <Text>asdf</Text>
                <View style={Styles.XStack}>
                    <Text>50,000원</Text>
                    <Text>|</Text>
                    <Text>7일</Text>
                </View>
            </View>
        </View>
    )
};

export default ListItem;
