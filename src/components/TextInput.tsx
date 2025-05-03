import { Text, View, TextInput as DefaultTextInput } from "react-native";
import { TextInputProps } from "@/types/types";
import { Common } from "@/styles/common";
import { TextThemes } from "@/styles/theme";

const TextInput = (props: TextInputProps) => {
    const {label, name, handleChangeText, placeholder="", value, secureTextEntry=false, keyboardType="default", errorMsg="", style} = props;

    return (
        <View style={{width: "100%"}}>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                onChangeText={(text) => handleChangeText(text, name)}
                placeholder={placeholder}
                placeholderTextColor="#767676"
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                autoCorrect={false}
                autoCapitalize="none"
                style={[Common.textInput, style]}
            />
            {errorMsg?.length>0 && <Text style={[Common.errorMsg, TextThemes.error]}>{errorMsg}</Text>}
        </View>
    )
}
export default TextInput;