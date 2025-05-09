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

export type StatusType = "pending" | "inRent" | "returned";
export type ActionType = "approve" | "disapprove" | "return" | "writeReview";

export type AccordionContainerType = ListItemProps & {
    status: StatusType,
}

export type AccordionCardProps = AccordionContainerType & {
    actions: ActionType[] | undefined,
    actionNames: string[],
    getDetails: (itemId: number) => Promise<RentalDetailsType | undefined>,
    handleAction: ((itemId: number, isApproved?: boolean) => void) | ((itemId: number) => void);
}

export type RentalDetailsType = {
    owner: string,
    requestDate: string,
    approvedDate: string | null,
    rejectedDate: string | null,
    startDate: string,
    dueDate: string,
    leftByOwnerAt: string | null,
    pickedUpByRenterAt: string | null,
    returnedByRenterAt: string | null,
    retrievedByOwnerAt: string | null,
    lockerId: string | null,
}

export type ItemStatusType = "AVAILABLE" | "OUT";

export type ItemDetailsProp = {
    id: number,
    owner: string, 
    name: string
    itemImg: string, 
    description: string,
    price: number, 
    status: ItemStatusType,
    damagedPolicy: string,
    startDate: string,
    endDate: string,

    messages: number, 
    likes: number,
}