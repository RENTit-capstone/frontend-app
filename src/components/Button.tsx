import { Styles } from "@/styles/styles"
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native"
import { TextThemes, ViewThemes } from "@/styles/theme";
import { StyleProps } from "react-native-reanimated";

type ButtonType = {
    onPress: () => void,
    disabled?: boolean,
    children: ReactNode,
    type: keyof typeof ViewThemes,
    style: StyleProps
}

const Button = (props: ButtonType) => {
    const {onPress, disabled=false, children, type, style} = props;
    
    return (
        <TouchableOpacity 
            onPress={onPress}
            disabled={disabled}
            style={[Styles.button, ViewThemes[type],
                    disabled? Styles.disabled:null,
                    , style]}>
            <Text style={TextThemes[type]}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Button;