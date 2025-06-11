import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { TextThemes, ViewThemes } from '@/styles/theme';
import { View, Image, Text } from 'react-native';

type AvatarType = {
    url?: string;
    nickname?: string;
};

const Avatar = (props: AvatarType) => {
    const { url, nickname } = props;
    const { userName } = useAuthStore();

    const Content = () => {
        if (url) return <Image source={{ uri: url }} style={Common.avatar} />;
        else if (nickname)
            return (
                <Text style={[Common.avatar, TextThemes.primary, ViewThemes.primary]}>
                    {nickname?.charAt(0).toUpperCase()}
                </Text>
            );
        else
            return (
                <Text style={[Common.avatar, TextThemes.primary, ViewThemes.primary]}>
                    {userName?.charAt(0).toUpperCase()}
                </Text>
            );
    };
    return (
        <View>
            <Content />
        </View>
    );
};
export default Avatar;
