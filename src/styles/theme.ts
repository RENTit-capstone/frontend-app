import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const Themes = StyleSheet.create({
    primary: {
        backgroundColor: Colors.primary,
        color: Colors.secondary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
        color: Colors.primary,
    },
    option: {
        color: Colors.option,
    },
    error: {
        color: Colors.error,
    }
});