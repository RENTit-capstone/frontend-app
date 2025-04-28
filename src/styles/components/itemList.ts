import Colors from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

export const itemList = StyleSheet.create({
    // StatusButtonGroup
    statusButtonWrapper: {
        backgroundColor: Colors.secondary,
        borderRadius: 6,
    },
    statusNumber: {
        fontSize: 25,
        fontWeight: 600,
    }, 
    statusButton: {
        marginVertical: 5, 
        width: "25%",
        alignSelf: "center"
    },
    divider: {
        height: "50%",
        alignSelf: "center",
        borderColor: Colors.option,
        borderWidth: 1,
        width: 0,
        marginHorizontal: 5,
    },

    //ListContainer
    listContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 24,
    },

    //ListItem
    listItemImage: {
        width: 100,
        height: 100,
        borderRadius: 6,
    },

    //ItemListTab
    topTabIndicator: {
        backgroundColor: Colors.primary,
    },
    topTab: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: 10,
        ...Platform.select({
            default: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.08,
                shadowRadius: 5,
                },
            android: {
                elevation: 5,
                },
            })
    
    },

});