import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const bottomTabBar = StyleSheet.create({
    defaultTabBar: {
        position: "absolute",
        bottom: 0,
        height: "10%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        // borderCurve: "continuous",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        shadowOpacity: 0.15,
    },
    tabBarItem: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 8,
        height: "65%",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    itemDetailsTabBar: {
        position: "absolute",
        bottom: 0,
        height: "10%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        shadowOpacity: 0.15,
    }
});
