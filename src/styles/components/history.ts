import { StyleSheet } from 'react-native';
import { Colors } from '../tokens';

const primaryColor = Colors.primary;
const secondaryColor = Colors.secondary;
const whiteColor = Colors.white;

export const history = StyleSheet.create({
    //AccordionCard
    button: {
        paddingVertical: 10,
        borderRadius: 6,
    },
    cardContainer: {
        backgroundColor: whiteColor,
    },
});
