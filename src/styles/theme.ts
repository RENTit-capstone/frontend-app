import { StyleSheet } from 'react-native';
import { Colors } from './tokens';

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
    error: {},
    transparent: {
        borderWidth: 0,
    },
    available: {
        borderColor: Colors.navy,
    },
    out: {
        borderColor: Colors.brown,
    },
});

export const TextThemes = StyleSheet.create({
    primary: {
        color: Colors.white,
    },
    secondary: {
        color: Colors.primary,
    },
    option: {
        color: Colors.darkGray,
    },
    error: {
        color: Colors.error,
    },
    status: {
        color: Colors.black,
    },
    transparent: {},
    statusRequest: {
        color: Colors.navy,
    },
    statusAccepted: {
        color: Colors.gray,
    },
    statusOverdue: {
        color: Colors.red,
    },
    available: {
        color: Colors.navy,
    },
    out: {
        color: Colors.brown,
    },
});

