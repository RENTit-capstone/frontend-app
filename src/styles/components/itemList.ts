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
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 24,
    },
    rowDivider: {
        width: "90%",
        height: 0,
        borderColor: "#E5E5E5CC",
        borderWidth: 1,
        marginTop: 10,
    },

    //ListItem
    cardWrapper: {
        justifyContent: "flex-start",
        width: "90%",
    },
    listItemImage: {
        width: 100,
        height: 100,
        borderRadius: 6,
        marginRight: 5,
    },
    interactions: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 0,
        gap: 2,
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