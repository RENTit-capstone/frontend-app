import { Common } from '@/styles/common';
import { Pressable, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrow from '@/assets/images/left-arrow.svg';
import LeftArrowWhite from '@/assets/images/left-arrow-white.svg';
import Menu from '@/assets/images/dots-vertical.svg';
import Share from '@/assets/images/share.svg';
import { useRouter } from 'expo-router';
import { Colors } from '@/styles/tokens';

const ItemHeader = (props: { name: string }) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const backgroundColor = props.name === '[id]' ? 'rgba(0, 0, 0, 0)' : Colors.background;
    const BackIcon = () =>
        props.name === '[id]' ? (
            <LeftArrowWhite width={32} height={32} />
        ) : (
            <LeftArrow width={32} height={32} />
        );

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
                <BackIcon />
            </Pressable>
            {props.name === '[id]' && (
                <View style={Common.XStack}>
                    <Pressable>
                        <Share />
                    </Pressable>
                    <Pressable>
                        <Menu />
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
};
export default ItemHeader;
