import {
    Text,
    View,
    TextInput as DefaultTextInput,
    KeyboardTypeOptions,
    TextStyle,
} from 'react-native';
import { Common } from '@/styles/common';
import { TextThemes } from '@/styles/theme';

type TextInputProps = {
    label: string;
    name: string;
    handleChangeText: (name: string, text: string) => void;
    value: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    errorMsg?: string;
    multiline?: boolean;
    style?: TextStyle[];
};
const TextInput = (props: TextInputProps) => {
    const {
        label,
        name,
        handleChangeText,
        placeholder = '',
        value,
        secureTextEntry = false,
        keyboardType = 'default',
        errorMsg = '',
        multiline = false,
        style,
    } = props;

    return (
        <View style={{ width: '100%' }}>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                onChangeText={(text) => handleChangeText(text, name)}
                placeholder={placeholder}
                placeholderTextColor="#767676"
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                autoCorrect={false}
                autoCapitalize="none"
                style={[Common.textInput, multiline && Common.textArea, style]}
            />
            {errorMsg?.length > 0 && (
                <Text style={[Common.errorMsg, TextThemes.error]}>{errorMsg}</Text>
            )}
        </View>
    );
};
export default TextInput;
