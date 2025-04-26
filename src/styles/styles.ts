import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

export const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FBF5ED',
        flex: 1,
        // justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: '10%',
        width: '100%'
    },
    componentWrapper: {
        width: '100%',
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
    YStack: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginHorizontal: '10%',
        justifyContent: 'center',
    },
    XStack: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
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
    listItemImage: {
        width: 100,
        height: 100,
    },
    listView: {
        alignItems: "center",
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
    buttonGroup: {
        backgroundColor: Colors.secondary,
        borderRadius: "6px",
        margin: 24,
        textAlign: "center",
        alignSelf: "stretch",
        flex: 1,
    },
    divider: {
        height: "40%",
        borderColor: Colors.option,
        borderWidth: 1
    },
    statusNumber: {
        fontSize: 25,
        fontWeight: 600,
    }, 
    statusButton: {
        alignSelf: "stretch",
        padding: 40,
        flex: 1,
        marginBottom: 0,
        marginTop: 0,
    },
    badge: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },
    cardWrapper: {
        alignSelf: "flex-start",
    },
    alignLeft: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        gap: 2
    },
});