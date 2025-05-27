import { View, Text, Alert } from 'react-native';
import Button from '../Button';
import { Common } from '@/styles/common';
import { myPage } from '@/styles/components/myPage';
import { ViewThemes } from '@/styles/theme';
import { itemList } from '@/styles/components/itemList';
import { useEffect, useState } from 'react';
import { axiosPost } from '@/api';
import Timer from '../myPage/Timer';

const OTPModal = () => {
    const [otpCode, setOtpCode] = useState<string>();
    const [resetKey, setResetKey] = useState(0);

    useEffect(() => {
        generateOTP();
    }, []);

    const generateOTP = async () => {
        try {
            setResetKey((prev) => prev + 1);
            const response = await axiosPost(`/api/v1/auth/otp`);
            console.log(response.data);

            setOtpCode(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    return (
        <>
            <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>OTP 발급</Text>
            </View>
            <View style={[Common.wrapper]}>
                <View style={[myPage.otpBox, ViewThemes.secondary]}>
                    <Text style={itemList.statusNumber}>{otpCode}</Text>
                </View>
                <View style={Common.XStack}>
                    <Timer resetKey={resetKey} setResetKey={setResetKey} />
                    <Button onPress={() => generateOTP()} type="primary">
                        재발급
                    </Button>
                </View>
            </View>
        </>
    );
};

export default OTPModal;
