import Colors from "@/constants/Colors";
import { Common } from "@/styles/common";
import { FC, FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import SvgImage from "react-native-svg/lib/typescript/elements/Image";

type DropDownProps = {
    label: string;
    icon?: FC<SvgProps>;
    onPress?: () => void;
}

const DropDown = (props: DropDownProps) => {
    const {label, icon, onPress} = props;
    return (
        <TouchableOpacity style={[Common.badge, {width: "45%", borderColor: Colors.option}]}>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
}

export default DropDown;