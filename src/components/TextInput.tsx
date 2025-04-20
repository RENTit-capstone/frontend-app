import { Text, View, TextInput as DefaultTextInput } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { Themes } from "@/styles/theme";

const TextInput = (props: TextInputProps) => {
    const {label, name, handleChangeText, placeholder="", value, secureTextEntry=false, keyboardType="default", errorMsg=""} = props;

    return (
        <View style={{width: "100%"}}>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                onChangeText={(text) => handleChangeText(name, text)}
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                autoCorrect={false}
                autoCapitalize="none"
                style={Styles.textInput}
            />
            {errorMsg && <Text style={[Styles.errorMsg, Themes.error]}>{errorMsg}</Text>}
        </View>
    )
}
export default TextInput;