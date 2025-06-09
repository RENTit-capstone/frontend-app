import { RentalStatusType } from '@/types/types';

type DetereminedActionType = {
    action?: (() => Promise<void>)[];
    buttonText?: string[];
    description?: string;
};

type DetermineActionParamType = {
    id?: number;
    returnImage: boolean;
    rentalStatus: RentalStatusType;
    onCancelRequest: (id: number) => Promise<void>;
    onReturn: (id: number) => Promise<void>;
    onReturnImage: (id: number) => Promise<void>;
    onCabinet: () => Promise<void>;
};

export const determineAction = ({
    id = 0,
    returnImage = false,

    rentalStatus,
    onCancelRequest,
    onReturnImage,
    onReturn,
    onCabinet,
}: DetermineActionParamType): DetereminedActionType => {
    switch (rentalStatus) {
        case 'REQUESTED':
            return { action: [() => onCancelRequest(id)], buttonText: ['요청 취소'] };

        case 'APPROVED':
            return { buttonText: ['요청 승인됨'] };

        case 'REJECTED':
            return { description: '요청이 거절되었습니다' };

        case 'CANCELLED':
            return { buttonText: ['요청 취소됨'] };

        case 'LEFT_IN_LOCKER':
            return { action: [onCabinet], buttonText: ['수령하기'] };

        case 'PICKED_UP':
            return { action: [() => onReturn(id)], buttonText: ['반납하기'] };

        case 'RETURNED_TO_LOCKER':
            if (!returnImage)
                return { action: [() => onReturnImage(id)], buttonText: ['반납 사진 제출'] };
            return { description: '반납을 완료하였습니다' };
        // return { action: onWriteReview, buttonText: '후기 작성' };

        case 'COMPLETED':
            return { action: [() => onReturnImage(id)], buttonText: ['반납 사진 제출'] };

        // return { description: '거래가 종료되었습니다' };
        // if (hasWrittenReview) return { buttonText: '후기 보기' };
        // else  return { action: onWriteReview, buttonText: '후기 작성' };

        default:
            return {};
    }
};
export default determineAction;
