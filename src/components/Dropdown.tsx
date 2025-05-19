import Colors from "@/constants/Colors";
import { Common } from "@/styles/common";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type DropDownProps = {
    label: string;
    icon?: ReactNode;
    onPress?: () => void;
}

const DropDown = (props: DropDownProps) => {
    const {label, icon, onPress} = props;
    return (
        <TouchableOpacity onPress={onPress} style={[{position: "relative"}, Common.XStack, Common.badge, {width: "45%", borderColor: Colors.option}]}>
            <Text>{label}</Text>
            {icon &&
            <View style={{position: "absolute", right: 16}}>{icon}</View>
            }
        </TouchableOpacity>
    );
}

export default DropDown;