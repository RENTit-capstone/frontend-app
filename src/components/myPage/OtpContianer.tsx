import { View, Text, Alert } from "react-native"
import Button from "../Button";
import { Common } from "@/styles/common";
import { myPage } from "@/styles/components/myPage";
import { ViewThemes } from "@/styles/theme";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";
import { axiosPost } from "@/api";
import Timer from "./Timer";

const OtpContianer = () => {
    const [otpCode, setOtpCode] = useState<string>();
    const [isTimerRunning, setTimerRunning] = useState(true);

    useEffect(() => {
        generateOTP();
    }, []);

    const generateOTP = async () => {
        try {
            setTimerRunning(false);
            const response = await axiosPost(`/api/v1/auth/otp`);
            console.log(response.data);
            setTimerRunning(true);
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
                <Timer isTimerRunning={isTimerRunning} setTimerRunning={setTimerRunning} />
                <Button onPress={() => generateOTP()} type="primary">
                    재발급
                </Button>
            </View>

        </View>
    );
}

export default OtpContianer;