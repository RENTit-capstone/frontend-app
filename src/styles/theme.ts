import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export const ViewThemes = StyleSheet.create({
    primary: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.secondary,
    },
    option: {
        borderColor: Colors.option,
    },
    error: {
    },
    transparent: {
        borderWidth: 0,
    }
});

export const TextThemes = StyleSheet.create({
    primary: {
        color: Colors.white,
    },
    secondary: {
        color: Colors.primary,
    },
    option: {
        color: Colors.optionText,
    },
    error: {
        color: Colors.error,
    },
    status: {
        color: Colors.status,
    },
    transparent: {
    }, 
    statusRequest: {
        color: Colors.statusRequested,
    }, 
    statusAccepted: {
        color: Colors.statusAccepted,
    },
    statusOverdue: {
        color: Colors.statusOverdue,
    },
  
});