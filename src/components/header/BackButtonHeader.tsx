import { Common } from '@/styles/common';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrow from '@/assets/images/left-arrow.svg';
import { useRouter } from 'expo-router';
import { Colors } from '@/styles/tokens';

const BackButtonHeader = ({ title = '' }: { title?: string }) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View
            style={[
                Common.headerWrapper,
                Common.XStack,
                {
                    backgroundColor: Colors.background,
                    paddingTop: insets.top,
                    paddingBottom: 16,
                },
            ]}
        >
            <Pressable
                onPress={() => router.back()}
                style={{ position: 'absolute', left: 10, top: 20 }}
            >
                <LeftArrow width={32} height={32} />
            </Pressable>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 12,
                }}
            >
                {title}
            </Text>
        </View>
    );
};

export default BackButtonHeader;
