import { Common } from '@/styles/common';
import { TextThemes, ViewThemes } from '@/styles/theme';
import { View, Image, Text } from 'react-native';

export default function Avatar(name: string) {
    const text = name.length > 0 ? name : 'ABCD';

    return (
        <View>
            {text.length > 0 ? (
                <Text style={[Common.avatar, TextThemes.primary, ViewThemes.primary]}>
                    {text.charAt(0).toUpperCase()}
                </Text>
            ) : (
                <Image source={{ uri: 'https://i.pravatar.cc/150' }} style={Common.avatar} />
            )}
        </View>
    );
}
