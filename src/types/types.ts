import { TextInputProps as DefaultTextInputProps, KeyboardTypeOptions } from "react-native";

export type ResponseType<T> = {
    data: T;
    message?: string;
    status: number;
}

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

export type UserType = {
    email: string;
    nickname: string;
}

// 로그인 상태관리
export type AuthType = {
    accessToken: string | null;
    setToken: (accessToken: string) => void;
    clearToken: () => void;
}