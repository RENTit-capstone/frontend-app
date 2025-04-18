import { Styles } from "@/styles/styles"
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native"
import { Themes } from "@/styles/theme";

type ButtonType = {
    text?: string,
    onPress: () => void,
    disabled?: boolean,
    children: ReactNode,
}

const Button = (props: ButtonType) => {
    const {text, onPress, disabled=true, children} = props;
    return (
        <TouchableOpacity style={[Styles.button, Themes.primary]}>
            <Text style={Themes.primary}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Button;