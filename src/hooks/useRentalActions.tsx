import { useRouter } from "expo-router";
import useToast from "./useToast";

const useRentalActions = () => {
    const toast = useToast();
    const router = useRouter();

    const onCancelRequest = async () => {
        toast.showSuccess("요청이 취소되었습니다");
    };
    const onReturn = async () => {
        //TODO: bottomsheet로 OTP띄우고 닫기 눌리면 callback으로 후기사진찍기 
        router.push("/myPage/otp");
    };

    const onPickup = async () => {
        //TODO: bottomsheet로 OTP띄우기
        router.push("/myPage/otp");
    };
    
    return { onCancelRequest, onReturn, onPickup };
}
export default useRentalActions;