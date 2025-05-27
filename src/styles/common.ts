import Colors from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

export const Common = StyleSheet.create({
    container: {
        backgroundColor: '#FBF5ED',
        flex: 1,
        width: '100%',
        alignSelf: 'flex-start',
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
        width: '100%',
    },
    YStack: {
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
    },
    XStack: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 15,
        paddingVertical: 15,
        flex: 1,
        alignSelf: 'stretch',
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
        backgroundColor: '#FBF5ED',
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 15,
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 50,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
    },
    badge: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        alignSelf: 'flex-start',
        paddingVertical: 4,
        alignItems: 'center',
    },
    wideView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bold: {
        fontSize: 20,
        fontWeight: 600,
    },
    section: {
        marginVertical: 12,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        minHeight: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        zIndex: 20,
    },
    roundTopEdge: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        // borderCurve: "continuous",
    },
    tabBarItem: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 8,
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    darkBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
    },
    cancel: {
        position: 'absolute',
        zIndex: 20,
        top: 0,
        right: 16,
        marginVertical: 0,
    },
    chips: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 12,
        marginVertical: 12,
        marginHorizontal: 12,
    },
    upperShadow: {
        ...Platform.select({
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    floatingButton: {
        position: 'absolute',
        borderRadius: 50,
        padding: 16,
        right: 16,
        bottom: 64,
        zIndex: 50,
    },
    textArea: {
        textAlignVertical: 'top',
        height: 128,
    },
    floatingIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginVertical: 15,
        paddingRight: 35,
        paddingTop: 20,
        transform: [{ translateY: -26 }],
    },
    searchGroup: {
        gap: '5%',
        backgroundColor: 'white',
        paddingTop: 16,
    },
    toast: {
        borderLeftColor: Colors.statusAccepted,
        backgroundColor: Colors.statusAccepted,
        borderRadius: 8,
        ...Platform.select({
            default: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 5,
            },
        }),
    },
    toastText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
    },
});
