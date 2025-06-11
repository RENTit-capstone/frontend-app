import { Common } from '@/styles/common';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

type DropDownProps = {
    label: string;
    icon?: ReactNode;
    onPress?: () => void;
    selectedColor: string | undefined;
    disabled?: boolean;
    style?: StyleProps | StyleProps[];
};

const DropDown = (props: DropDownProps) => {
    const { label, icon, onPress, selectedColor, disabled, style } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                Common.XStack,
                Common.badge,
                { width: '45%', height: 30, borderColor: selectedColor, position: 'relative' },
                style,
            ]}
        >
            <Text style={{ color: selectedColor }}>{label}</Text>
            {icon && <View style={{ position: 'absolute', right: 16 }}>{icon}</View>}
        </TouchableOpacity>
    );
};

export default DropDown;
