import Toast from 'react-native-toast-message';

const useToast = () => {
    return {
        showSuccess: (message: string) =>
            Toast.show({ type: 'success', text1: message }),

        showError: (message: string) =>
            Toast.show({ type: 'error', text1: message }),
    };
}
export default useToast;