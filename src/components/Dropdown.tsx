import { Common } from "@/styles/common";
import { ReactNode } from "react";
import { Text, View } from "react-native";

type DropDownProps = {
    children: ReactNode;
}

const DropDown = (props: DropDownProps) => {
    const {children} = props;
    return (
        <View style={Common.badge}>
            <Text>
                {children}
            </Text>
        </View>
    );
}

export default DropDown;