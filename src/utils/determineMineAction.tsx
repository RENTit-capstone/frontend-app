import { RentalStatusType } from "@/types/types";

type DetereminedActionType = {
    action?: () => Promise<void>;      
    buttonText?: string;      
    description?: string; 
}

type DetermineActionParamType = {
  id?: number,
  rentalStatus: RentalStatusType;
  // hasWrittenReview?: boolean;

  onCancelRequest: () => Promise<void>;
  onPickup: () => Promise<void>;
  onReturn: () => Promise<void>;
  onApprove: (id: number) => Promise<void>;
  // onWriteReview: () => Promise<void>;
}

export const determineMineAction = ({
  id=0,
  rentalStatus,
  // hasWrittenReview = false,
  onApprove,
  onPickup,
  onReturn,
  // onWriteReview,
}: DetermineActionParamType): DetereminedActionType => {
  switch (rentalStatus) {
    case 'REQUESTED':
      return { action: () => onApprove(id), buttonText: '승인' };

    case 'APPROVED':
      return { action: onPickup, buttonText: '물건 맡기기' }; 

    case 'REJECTED':
      return { description: '요청을 거절하셨습니다' };

    case 'CANCELLED':
      return { description: '요청을 취소하셨습니다' };

    case 'LEFT_IN_LOCKER':
      return { action: onPickup, buttonText: '대여함' };

    case 'PICKED_UP':
      return { buttonText: '수령됨' };

    case 'RETURNED_TO_LOCKER':
      return { action: onPickup, buttonText: '수령하기' };
      // return { action: onWriteReview, buttonText: '후기 작성' };

    case 'COMPLETED':
      return { description: '거래가 종료되었습니다'};
      // if (hasWrittenReview) return { buttonText: '후기 보기' };
      // else  return { action: onWriteReview, buttonText: '후기 작성' };

    default:
      return {};
  }
}
export default determineMineAction;