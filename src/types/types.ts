export type ResponseType<T> = {
    data: T;
    message?: string;
    status: number;
}

export type LoginType = {
    email: string;
    pw: string;
}

export type UserType = {
    email: string;
    nickname: string;
}

// 로그인 상태관리
export type AuthType = {
    id: number | null;
    accessToken: string | null;
    setId: (id: number) => void;
    setToken: (accessToken: string) => void;
    clearToken: () => void;
}

export type SignupInputType = {
    email: string,
    emailVerifyCode: string,
    pw: string,
    pwConfirm: string,
    name: string,
    nickname: string,
    gender: Gender,
    phone: string,
    university: string,
    studentId: string,       
}

export type memberType = "STUDENT" | "COUNCIL" | "COMPANY";
export type Gender = "male" | "female" | "";

export type UserInfoType = {
    email: string,
    password: string,
    name: string,
    memberType: memberType,
    nickname: string,
    university: string,
    studentId: string,
    gender: Gender,
    phone: string,
    profileImg?: string | null,
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
    itemId: number,
    owner: string, 
    ownerId: number,
    name: string
    itemImg: string, 
    description: string,
    price: number, 
    status: ItemStatusType,
    damagedPolicy: string,
    returnPolicy: string,
    startDate: string,
    endDate: string,

    messages: number, 
    likes: number,
}

export type PostingType = {
    name: string,
    itemImg: string,
    description: string,
    price: string,
    damagedPolicy: string,
    returnPolicy: string,
}