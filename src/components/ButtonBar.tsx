import { SafeAreaView } from "react-native";
import { Common } from "@/styles/common";


const ButtonBar = (props: any) => {
    const {onClose, children} = props;
    return (
        <SafeAreaView style={[Common.bottomBar, Common.upperShadow, {backgroundColor: "white"}, Common.XStack]}>
            {children}
        </SafeAreaView>
    );
}
export default ButtonBar;