import Colors from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

export const Common = StyleSheet.create({
    container: {
        backgroundColor: '#FBF5ED',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: '10%',
        width: '100%'
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
        borderWidth: 1,
        marginVertical: 15,
        paddingVertical: 15,
        flexGrow: 1,
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
        flexDirection: "row",
        marginHorizontal: 10,
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
    textWrapper: {
        alignSelf: "flex-start",
        marginLeft: 10,
    },
    alignLeft: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        gap: 2
    },
    wideView: {
        flex: 1,
        alignSelf: "stretch"
    },
    cardWrapper: {
        justifyContent: "space-between",
        marginHorizontal: "5%",
    },
    rowDivider: {
        width: "90%",
        height: 0,
        borderColor: "#E5E5E5CC",
        borderWidth: 1,
        margin: 15,
    },

});