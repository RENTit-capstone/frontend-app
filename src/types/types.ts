import { ChangeEvent } from "react";
import { TextInputProps as DefaultTextInputProps, KeyboardTypeOptions } from "react-native";

export type LoginType = {
    email: string;
    pw: string;
}

export interface TextInputProps extends DefaultTextInputProps {
    label: string;
    handleChangeText: (text: string) => void;
    value: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
}