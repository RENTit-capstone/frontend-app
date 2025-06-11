import {
    Text,
    View,
    TextInput as DefaultTextInput,
    KeyboardTypeOptions,
    TextStyle,
    TextInputProps,
} from 'react-native';
import { Common } from '@/styles/common';
import { TextThemes } from '@/styles/theme';
import { forwardRef } from 'react';

type CustomTextInputProps = {
    label: string;
    name: string;
    handleChangeText: (text: string, name: string) => void;
    value: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    errorMsg?: string;
    multiline?: boolean;
    style?: TextStyle[];
} & TextInputProps;

const CustomTextInput = forwardRef<DefaultTextInput, CustomTextInputProps>((props, ref) => {
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
        ...restProps
    } = props;

    return (
        <View style={{ width: '100%' }}>
            {label && <Text>{label}</Text>}
            <DefaultTextInput
                ref={ref}
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
                {...restProps}
            />
            {errorMsg?.length > 0 && (
                <Text style={[Common.errorMsg, TextThemes.error]}>{errorMsg}</Text>
            )}
        </View>
    );
});

export default CustomTextInput;
