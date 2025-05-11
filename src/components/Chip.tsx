import { Common } from "@/styles/common";
import { Pressable, Text, View } from "react-native";
import Cancel from "@/assets/images/cancel.svg";

type ChipProps = {
    startDate: string | null,
    endDate: string | null,
}

const Chip = (props: ChipProps) => {
    const {startDate, endDate} = props;

    return (
        <>
        {(startDate && endDate) && 
        <View style={[Common.badge, Common.XStack, {borderColor: "#D4D4D8"}]}>
            <Text>{startDate.replaceAll('-', '.')} ~ {endDate.replaceAll('-', '.')}</Text>
            <Pressable>
                <Cancel />
            </Pressable>
        </View>
        }
        </>
    );
}

export default Chip;