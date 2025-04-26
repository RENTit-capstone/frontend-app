import { Styles } from "@/styles/styles"
import { View, Text } from "react-native"
import { TextThemes, ViewThemes } from "@/styles/theme";

type BadgeType = {
    available: boolean,
}

const Badge = (props: BadgeType) => {
    const {available} = props;
    const theme = available? "available" : "notAvailable";
    
    return (
        <View style={[Styles.badge, ViewThemes[theme]]}>
            <Text style={TextThemes[theme]}>
                {available? "대여가능" : "대여불가"}
            </Text>
        </View>
    )
}

export default Badge;