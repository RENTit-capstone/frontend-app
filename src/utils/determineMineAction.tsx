import { RentalStatusType } from '@/types/types';

type DetereminedActionType = {
    action?: () => Promise<void>;
    buttonText?: string;
    description?: string;
    actionSecond?: () => Promise<void>;
    buttonTextSecond?: string;
};

type DetermineActionParamType = {
    id?: number;
    rentalStatus: RentalStatusType;

    onApprove: (id: number) => Promise<void>;
    onReject: (id: number) => Promise<void>;
    onCabinet: () => Promise<void>;
};

export const determineMineAction = ({
    id = 0,
    rentalStatus,

    onApprove,
    onReject,
    onCabinet,
}: DetermineActionParamType): DetereminedActionType => {
    switch (rentalStatus) {
        case 'REQUESTED':
            return {
                action: () => onApprove(id),
                buttonText: '승인',
                actionSecond: () => onReject(id),
                buttonTextSecond: '거절',
            };

        case 'APPROVED':
            return { action: onCabinet, buttonText: '물건 맡기기' };

        case 'REJECTED':
            return { description: '요청을 거절하였습니다' };

        case 'CANCELLED':
            return { description: '요청이 취소되었습니다' };

        case 'LEFT_IN_LOCKER':
            return { buttonText: '대여함' };

        case 'PICKED_UP':
            return { buttonText: '수령됨' };

        case 'RETURNED_TO_LOCKER':
            return { action: onCabinet, buttonText: '회수하기' };

        case 'COMPLETED':
            return { description: '거래가 종료되었습니다' };

        default:
            return {};
    }
};
export default determineMineAction;
