import { Common } from "@/styles/common"
import { View, Text } from "react-native"
import { ItemStatusType } from "@/types/types";
import Colors from "@/constants/Colors";

type BadgeType = {
    status: ItemStatusType,
}

const Badge = (props: BadgeType) => {
    const {status} = props;
    const theme = status==="AVAILABLE"? Colors.available : Colors.out;
    
    return (
        <View style={[Common.badge, {borderColor: theme}]}>
            <Text style={{color: theme}}>
                {status==="AVAILABLE"? "대여가능" : "대여중"}
            </Text>
        </View>
    )
}

export default Badge;