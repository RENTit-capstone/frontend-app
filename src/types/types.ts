export type ResponseType<T> = {
    data: T;
    message?: string;
    status: number;
};

export type LoginType = {
    email: string;
    password: string;
};

export type UserType = {
    email: string;
    nickname: string;
};

export type SignupInputType = {
    email: string;
    emailVerifyCode: string;
    pw: string;
    pwConfirm: string;
    name: string;
    nickname: string;
    gender: Gender;
    phone: string;
    university: string;
    studentId: string;
};

export type listType = 'INDIVIDUAL' | 'GROUP';
export type historyType = 'OTHERS' | 'MINE';
export type memberType = 'STUDENT' | 'COUNCIL' | 'COMPANY';
export type Gender = 'male' | 'female' | '';

export type UserInfoType = {
    email: string;
    password: string;
    name: string;
    memberType: memberType;
    nickname: string;
    university: string;
    studentId: string;
    gender: Gender;
    phone: string;
    profileImg?: string | null;
};

export type ListItemProps = {
    itemId: number;
    nickname: string;
    name: string;
    imgUrls: string[];
    price: number;
    status: ItemStatusType;
    startDate: string;
    endDate: string;
};

export type ListContainerProps = {
    type: listType;
};

export type AccordionContainerProps = {
    type: historyType;
};

export type RentalStatusType =
    | 'REQUESTED'
    | 'APPROVED'
    | 'REJECTED'
    | 'CANCELLED'
    | 'LEFT_IN_LOCKER'
    | 'PICKED_UP'
    | 'RETURNED_TO_LOCKER'
    | 'COMPLETED';

//  type AccordionContainerType = ListItemProps & {
//     status: RentalStatusType,
// }

export type MineCardProps = {
    itemId?: number;
    rentalId: number;
    requestDate: string;
    status: RentalStatusType;
};

export type AccordionCardProps = {
    type: historyType;
    rentalId: number;
    itemId: number;
    requestDate: string;
    status: RentalStatusType;
};

export type RentalDetailsType = {
    owner: string;
    requestDate: string;
    approvedDate: string | null;
    rejectedDate: string | null;
    startDate: string;
    dueDate: string;
    leftByOwnerAt: string | null;
    pickedUpByRenterAt: string | null;
    returnedByRenterAt: string | null;
    retrievedByOwnerAt: string | null;
    lockerId: string | null;
    returnImageUrl: string | null;
};

export type ItemStatusType = 'AVAILABLE' | 'OUT';

export type ItemDetailsProp = {
    itemId: number;
    name: string;
    imageUrls: string[];
    description: string;
    damagedDescription: string;
    price: number;
    status: ItemStatusType;
    damagedPolicy: string;
    returnPolicy: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    owner: {
        memberId: number;
        nickname: string;
        profileImg: string;
        university: string;
    };
};

export type PostingType = {
    name: string;
    itemImg: string;
    description: string;
    price: string;
    damagedPolicy: string;
    returnPolicy: string;
};

export type QnAType = 'SERVICE' | 'REPORT';
export type QnAProcessedType = 'PROCESSED' | 'NOTPROCESSED';
