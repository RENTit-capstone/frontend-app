const useRentalActions = () => {
    const onCancelRequest = async () => {
    };
    const onReturn = async () => {
        //TODO: bottomsheet로 OTP띄우고 닫기 눌리면 callback으로 후기사진찍기 
        // router.navigate("/myPage/otp");
    };

    const onPickup = async () => {
    };

    // const onWriteReview = async () => {
    //     navigateToReviewPage(rentalId); 
    // };
    
    return { onCancelRequest, onReturn, onPickup };
}
export default useRentalActions;