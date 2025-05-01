import { View, Text } from "react-native"
import Button from "../Button";
import { Common } from "@/styles/common";
import { myPage } from "@/styles/components/myPage";
import { ViewThemes } from "@/styles/theme";
import { generateOTP } from "@/api/myPage";
import { itemList } from "@/styles/components/itemList";
import { useEffect, useState } from "react";

const OtpContianer = () => {
    const [otpCode, setOtpCode] = useState<string>();

    useEffect(() => {
        loadData();
    })

    const loadData = async () => {
        const newCode = await generateOTP();
        setOtpCode(newCode);
    }

    const handleGenerateOtp = () => {
        console.log("pressed");
        loadData();
    }

    return (
        <View style={[Common.wrapper]}>
            <View style={[myPage.otpBox, ViewThemes.secondary]}>
                <Text style={itemList.statusNumber}>{otpCode || "01010"}</Text>
            </View>
            <View style={Common.XStack}>
                <Button onPress={handleGenerateOtp} type="primary">
                    발급하기
                </Button>
            </View>

        </View>
    );
}

export default OtpContianer;