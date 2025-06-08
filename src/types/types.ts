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
export type Gender = 'WOMEN' | 'MEN' | '';

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
    imageUrls: string[];
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
    imageKeys: string[];
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
    rentalEndAt: string;
    owner: {
        memberId: number;
        nickname: string;
        profileImg: string;
        university: string;
    };
};

export type PostingType = {
    itemId?: string;
    name: string;
    itemImg: string;
    imageKeys: string;
    damagedDescription: string;
    description: string;
    price: string;
    damagedPolicy: string;
    returnPolicy: string;
};

export const QnA_Options = {
    '서비스 이용': 'SERVICE',
    '신고/제보': 'REPORT',
    '파손 신고': 'DAMAGE',
} as const;

export type QnAOption = keyof typeof QnA_Options;
export type QnAType = 'SERVICE' | 'DAMAGE' | 'REPORT';

export type QnAProcessedType = 'PROCESSED' | 'NOTPROCESSED';

export type ModalProps = {
    visible: boolean;
    onClose: () => void;
};

export const SORT_OPTIONS = {
    최신순: ['createdAt', 'desc'],
    '가격 낮은순': ['price', 'asc'],
    '가격 높은순': ['price', 'desc'],
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;

export const FILTER_OPTIONS = {
    전체: '',
    요청중: 'REQUESTED',
    승인됨: 'APPROVED',
    거절됨: 'REJECTED',
    취소됨: 'CANCELLED',
    대여중: ['LEFT_IN_LOCKER', 'PICKED_UP', 'RETURNED_TO_LOCKER'],
    완료됨: 'COMPLETED',
};

export type FilterOption = keyof typeof FILTER_OPTIONS;
