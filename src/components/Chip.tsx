import { Common } from "@/styles/common";
import { Pressable, Text, View } from "react-native";
import Cancel from "@/assets/images/cancel.svg";

type ChipProps = {

}

const Chip = (props: ChipProps) => {
    return (
        <View style={[Common.badge, Common.XStack, {borderColor: "#D4D4D8"}]}>
            <Text>24.06.01 ~24.06.07</Text>
            <Pressable>
                <Cancel />
            </Pressable>
            
        </View>
    );
}

export default Chip;