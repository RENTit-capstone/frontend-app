import { Text, View, TextInput as DefaultTextInput } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { TextThemes } from "@/styles/theme";

const TextInput = (props: TextInputProps) => {
    const {label, name, handleChangeText, placeholder="", value, secureTextEntry=false, keyboardType="default", errorMsg=""} = props;

    return (
        <View style={{width: "100%"}}>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                onChangeText={(text) => handleChangeText(name, text)}
                placeholder={placeholder}
                placeholderTextColor="#767676"
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                autoCorrect={false}
                autoCapitalize="none"
                style={Styles.textInput}
            />
            {errorMsg?.length>0 && <Text style={[Styles.errorMsg, TextThemes.error]}>{errorMsg}</Text>}
        </View>
    )
}
export default TextInput;