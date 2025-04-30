import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const primaryColor = Colors.primary;
const secondaryColor = Colors.secondary;
const whiteColor = Colors.white;

export const history = StyleSheet.create({
    //AccordionCard
    button: {
        paddingVertical: 10,
        borderRadius: 6
    },
    cardContainer: {
        backgroundColor: whiteColor,
    }
});