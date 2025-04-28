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
    name: string;
    handleChangeText: (name: string, text: string) => void;
    value: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    errorMsg?: string;
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

export type SignupType = {
    email: string,
    pw: string,
    pwConfirm: string,
    name: string,
    nickname: string,
    gender: string,
    phone: string,
    university: string,
    studentId: string,        
}

export type ListItemProps = {
    id: number,
    title: string,
    img: string,
    available: boolean,
    price: number,
    period: number,
    messages: number, 
    likes: number,
}

export type ListContainerProps = {
    type: string,
}
