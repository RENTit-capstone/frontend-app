import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { TextThemes, ViewThemes } from '@/styles/theme';
import { View, Image, Text } from 'react-native';

type AvatarType = {
    url?: string;
};

const Avatar = (props: AvatarType) => {
    const { url } = props;
    const { userName } = useAuthStore();
    return (
        <View>
            {url ? (
                <Image source={{ uri: url }} style={Common.avatar} />
            ) : (
                <Text style={[Common.avatar, TextThemes.primary, ViewThemes.primary]}>
                    {userName?.charAt(0).toUpperCase()}
                </Text>
            )}
        </View>
    );
};
export default Avatar;
