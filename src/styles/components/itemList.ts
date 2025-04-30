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
        alignSelf: "center",
        flex: 0,
        flexGrow: 1,
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

    //TabBar
    tabBar: {
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
    }

});