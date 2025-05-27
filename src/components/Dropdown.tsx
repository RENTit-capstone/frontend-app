import Colors from "@/constants/Colors";
import { Common } from "@/styles/common";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type DropDownProps = {
    label: string;
    icon?: ReactNode;
    onPress?: () => void;
    selectedColor: string | undefined;
}

const DropDown = (props: DropDownProps) => {
    const {label, icon, onPress, selectedColor} = props;
    return (
        <TouchableOpacity onPress={onPress} style={[Common.XStack, Common.badge, {width: "45%", height: 30, borderColor: selectedColor, position: "relative"}]}>
            <Text style={{color: selectedColor}}>{label}</Text>
            {icon &&
            <View style={{position: "absolute", right: 16}}>{icon}</View>
            }
        </TouchableOpacity>
    );
}

export default DropDown;