import { SafeAreaView } from "react-native";
import Button from "./Button";
import { Common } from "@/styles/common";


const ButtonBar = (props: any) => {
    const {onClose} = props;
    return (
        <SafeAreaView style={[Common.bottomBar, Common.upperShadow, {backgroundColor: "white"}, Common.XStack]}>
        
            <Button type="primary" onPress={onClose}>
                저장
            </Button>
        </SafeAreaView>
    );
}
export default ButtonBar;