import { Common } from '@/styles/common';
import { Dimensions, Pressable, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowWhite from '@/assets/images/left-arrow-white.svg';
import Menu from '@/assets/images/dots-vertical.svg';
import Share from '@/assets/images/share.svg';
import { useRouter } from 'expo-router';

const ItemHeader = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const backgroundColor = 'rgba(0, 0, 0, 0)';
    const screenHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView
            style={[
                Common.headerWrapper,
                {
                    backgroundColor: backgroundColor,
                    paddingTop: insets.top,
                    height: screenHeight * 0.07,
                    marginHorizontal: 12,
                },
            ]}
        >
            <Pressable
                onPress={() => router.back()}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
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
