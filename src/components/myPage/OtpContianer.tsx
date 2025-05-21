import { View, Text, Alert } from "react-native"
import Button from "../Button";
import { Common } from "@/styles/common";
import { myPage } from "@/styles/components/myPage";
import { ViewThemes } from "@/styles/theme";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { axiosPost } from "@/api";

const OtpContianer = () => {
    const [otpCode, setOtpCode] = useState<string>();

    useEffect(() => {
        generateOTP();
    }, []);

    const generateOTP = async () => {
        try {
            const response = await axiosPost(`/api/v1/auth/otp`);
            console.log(response.data);
            setOtpCode(response.data);
        }
        catch(error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    }

    return (
        <View style={[Common.wrapper]}>
            <View style={[myPage.otpBox, ViewThemes.secondary]}>
                <Text style={itemList.statusNumber}>{otpCode || "01010"}</Text>
            </View>
            <View style={Common.XStack}>
                <Button onPress={() => generateOTP()} type="primary">
                    발급하기
                </Button>
            </View>

        </View>
    );
}

export default OtpContianer;