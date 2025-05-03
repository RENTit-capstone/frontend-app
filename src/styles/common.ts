import Colors from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

export const Common = StyleSheet.create({
    container: {
        backgroundColor: '#FBF5ED',
        flex: 1,
        width: '100%',
        alignSelf: "flex-start"
    },
    wrapper: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    textInput: {
        backgroundColor: '#f9f9f9',
        borderColor: '#D3D3D7',
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: 8,
        padding: 12,
        height: 40,
    },
    componentWrapper: {
        width: '100%',
    },
    fullScreen: {
        width: "100%",
    },
    YStack: {
        paddingHorizontal: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,        
    },
    XStack: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    button: {
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 15,
        paddingVertical: 15,
        flex: 1,
        alignSelf:'stretch',
    },   
    textOption: {
        marginTop: 20,
        opacity: 0.6,
        fontSize: 14,
    },
    errorMsg: {
        marginBottom: 5,
    },
    disabled: {
        opacity: 0.5,
    },
    headerWrapper: {
        backgroundColor: "#FBF5ED",
        height: 64,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        gap: 15,
        alignItems: "center",
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: "100%",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 24,
    },
    badge: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },
    wideView: {
        flex: 1,
        alignSelf: "stretch",
    },
    test: {
        backgroundColor: "gray",
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center',
        flexDirection: "row"
    },
    textWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    bold: {
        fontSize: 20, 
        fontWeight: 600
    },
    section: {
        marginVertical: 12,
    },
    floatingIcon: {
        position: "absolute",
        alignSelf: "flex-end",
        marginVertical: 15,
        paddingRight: 32,
        paddingTop: 20,
        transform: [{ translateY: -12 }],
    }
});