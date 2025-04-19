import { Text, View, TextInput as DefaultTextInput } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";

const TextInput = (props: TextInputProps) => {
    const {label, handleChangeText, placeholder="", value, secureTextEntry=false, keyboardType="default"} = props;

    return (
        <View style={{width: "100%"}}>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                onChangeText={handleChangeText}
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                autoCorrect={false}
                autoCapitalize="none"
                style={Styles.textInput}
            />
        </View>
    )
}
export default TextInput;