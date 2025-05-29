import { Common } from '@/styles/common';
import { Pressable, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowWhite from '@/assets/images/left-arrow-white.svg';
import Menu from '@/assets/images/dots-vertical.svg';
import Share from '@/assets/images/share.svg';
import { useRouter } from 'expo-router';

const ItemHeader = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const backgroundColor = 'rgba(0, 0, 0, 0)';

    return (
        <SafeAreaView
            style={[
                Common.headerWrapper,
                {
                    backgroundColor: backgroundColor,
                    paddingTop: insets.top,
                },
            ]}
        >
            <Pressable onPress={() => router.back()}>
                <LeftArrowWhite width={32} height={32} />
            </Pressable>
            <View style={Common.XStack}>
                <Pressable>
                    <Share />
                </Pressable>
                <Pressable>
                    <Menu />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
export default ItemHeader;
