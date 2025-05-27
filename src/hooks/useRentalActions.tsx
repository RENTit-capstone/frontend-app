import { useRouter } from 'expo-router';
import useToast from './useToast';
import { axiosPost } from '@/api';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';

const useRentalActions = () => {
    const toast = useToast();
    const router = useRouter();
    const { openBottomSheet } = useBottomSheetStore();

    const onCancelRequest = async () => {
        toast.show('요청이 취소되었습니다');
    };
    const onReturn = async () => {
        //TODO: bottomsheet로 OTP띄우고 닫기 눌리면 callback으로 후기사진찍기
        router.push('/myPage/otp');
    };

    const onApprove = async (id: number) => {
        try {
            const response = await axiosPost(`/api/v1/rentals/${id}/approve`);
            toast.show('요청이 승인되었습니다');
        } catch (error) {
            console.error(error);
        }
    };

    const onReject = async (id: number) => {
        try {
            const response = await axiosPost(`/api/v1/rentals/${id}/cancel`);
            toast.show('요청이 거절되었습니다');
        } catch (error) {
            console.error(error);
        }
    };

    const onCabinet = async () => {
        await openBottomSheet('otp');
    };

    return { onCancelRequest, onReturn, onApprove, onReject, onCabinet };
};
export default useRentalActions;
