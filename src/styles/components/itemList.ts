import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../tokens';

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
        width: '25%',
        alignSelf: 'center',
        flex: 0,
        flexGrow: 1,
    },
    divider: {
        height: '50%',
        alignSelf: 'center',
        borderColor: Colors.option,
        borderWidth: 1,
        width: 0,
        marginHorizontal: 5,
    },

    //ListContainer
    listContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 24,
    },
    rowDivider: {
        width: '90%',
        height: 0,
        borderColor: '#E5E5E5CC',
        borderWidth: 1,
    },

    //ListItem
    cardWrapper: {
        justifyContent: 'flex-start',
        width: '90%',
    },
    listItemImage: {
        width: 100,
        height: 100,
        borderRadius: 6,
        marginRight: 5,
    },

    //ItemListTab
    topTabIndicator: {
        backgroundColor: Colors.primary,
    },
    topTab: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: 20,
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
        }),
    },

    // [id]
    detailImage: {
        width: '100%',
        maxHeight: '40%',
    },
    bottomSheet: {
        backgroundColor: '#FBF5ED',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
    detailsHeader: {
        justifyContent: 'space-between',
        gap: 10,
    },
    detailInfo: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        color: '#767676',
        fontWeight: 600,
        marginVertical: 10,
    },
    imageSelectButton: {
        backgroundColor: Colors.option,
        width: 100,
        height: 100,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        justifyContent: 'center',
        flex: 0,
    },
    sortOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    SortDropdown: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
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
});
