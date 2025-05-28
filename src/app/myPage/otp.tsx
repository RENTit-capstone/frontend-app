import OtpContianer from '@/components/myPage/OtpContianer';
import { Common } from '@/styles/common';
import { SafeAreaView } from 'react-native';

const Otp = () => {
    return (
        <SafeAreaView style={Common.container}>
            <OtpContianer />
        </SafeAreaView>
    );
};

export default Otp;
