import Button from "@/components/Button";
import OtpContianer from "@/components/myPage/OtpContianer";
import OtpBox from "@/components/myPage/OtpContianer";
import { Common } from "@/styles/common";
import { SafeAreaView, Text, View } from "react-native"

const Otp = () => {
    const handleGenerateOtp = () => {

    }
    return (
        <SafeAreaView style={Common.container}>
                <OtpContianer />
        </SafeAreaView>
    );
}

export default Otp;