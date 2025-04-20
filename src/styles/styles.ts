import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F4EDE1',
        flex: 1,
        // justifyContent: 'center',
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
    fullYStack: {
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
        alignSelf:'stretch'
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
    able: {
        opacity: 1,
    }
});