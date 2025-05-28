import Toast from 'react-native-toast-message';

const useToast = () => {
    return {
        show: (message: string) => Toast.show({ type: 'success', text1: message }),
    };
};
export default useToast;
