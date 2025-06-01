import { Common } from '@/styles/common';
import { Pressable, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrow from '@/assets/images/left-arrow.svg';
import { useRouter } from 'expo-router';
import { Colors } from '@/styles/tokens';

const BackButtonHeader = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <SafeAreaView
            style={[
                Common.headerWrapper,
                {
                    backgroundColor: Colors.background,
                    paddingTop: insets.top,
                },
            ]}
        >
            <Pressable onPress={() => router.back()}>
                <LeftArrow width={32} height={32} />
            </Pressable>
        </SafeAreaView>
    );
};

export default BackButtonHeader;
