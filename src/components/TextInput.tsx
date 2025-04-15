import { Text, View, TextInput as DefaultTextInput } from "react-native";
import { TextInputProps } from "@/types/types";

const TextInput = (props: TextInputProps) => {
    const {label, handleChangeText, placeholder="", value, secureTextEntry=false, keyboardType="default"} = props;

    return (
        <View>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                onChangeText={handleChangeText}
                placeholder={placeholder}
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                autoCorrect={false}
                autoCapitalize="none"
            />
        
        
        </View>
    )
}
export default TextInput;