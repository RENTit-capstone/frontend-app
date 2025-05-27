import { Common } from '@/styles/common';
import { View, Text } from 'react-native';
import { ItemStatusType, QnAProcessedType, RentalStatusType } from '@/types/types';
import Colors from '@/constants/Colors';

type BadgeType = {
    status: ItemStatusType | RentalStatusType | QnAProcessedType;
};

const Badge = (props: BadgeType) => {
    const { status } = props;
    let theme, text;
    if (status === 'AVAILABLE') {
        theme = Colors.available;
        text = '대여가능';
    } else if (status === 'NOTPROCESSED') {
        theme = Colors.available;
        text = '답변 대기';
    } else if (status === 'PROCESSED') {
        theme = Colors.out;
        text = '답변 완료';
    } else {
        theme = Colors.out;
        text = '대여중';
    }

    return (
        <View style={[Common.badge, { borderColor: theme }]}>
            <Text style={{ color: theme }}>{text}</Text>
        </View>
    );
};

export default Badge;
