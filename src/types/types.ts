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

// 로그인 상태관리
export type AuthType = {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}