import { Common } from '@/styles/common';
import { Pressable, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowWhite from '@/assets/images/left-arrow-white.svg';
import Menu from '@/assets/images/dots-vertical.svg';
import Share from '@/assets/images/share.svg';

const ItemHeader = () => {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView
            style={[
                Common.headerWrapper,
                {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    paddingTop: insets.top,
                    marginHorizontal: 16,
                },
            ]}
        >
            <Pressable>
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
