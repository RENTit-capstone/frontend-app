import { Styles } from "@/styles/styles"
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native"
import { Themes } from "@/styles/theme";

type ButtonType = {
    onPress: () => void,
    disabled?: boolean,
    children: ReactNode,
}

const Button = (props: ButtonType) => {
    const {onPress, disabled=false, children} = props;
    return (
        <TouchableOpacity 
            onPress={onPress}
            disabled={disabled}
            style={[Styles.button, Themes.primary]}>
            <Text style={Themes.primary}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Button;