import Toast from 'react-native-toast-message';

const useToast = () => {
    return {
        show: (message: string, message2?: string) =>
            Toast.show({ type: 'success', text1: message, text2: message2 }),
    };
};
export default useToast;
