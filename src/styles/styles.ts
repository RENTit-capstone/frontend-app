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
        borderRadius: 10,
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
    button: {
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 15,
        paddingVertical: 15,
        width: '100%',
    },   
    textOption: {
        marginTop: 20,
        opacity: 0.6,
        fontSize: 14,
    },
    errorMsg: {
        fontSize: 14,
    }
});