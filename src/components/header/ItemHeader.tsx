import { Common } from '@/styles/common';
import { Dimensions, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowWhite from '@/assets/images/left-arrow-white.svg';
import Menu from '@/assets/images/dots-vertical.svg';
import Share from '@/assets/images/share.svg';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { itemList } from '@/styles/components/itemList';
import { useMenuStore } from '@/stores/useMenuStore';

const ItemHeader = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const backgroundColor = 'rgba(0, 0, 0, 0)';
    const screenHeight = Dimensions.get('window').height;
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = useMenuStore((state) => state.menuItems);

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
                {isOpen && (
                    <View
                        style={[
                            itemList.SortDropdown,
                            {
                                position: 'absolute',
                                zIndex: 1000,
                                top: 64,
                                // justifyContent: 'center',
                                width: '100%',
                            },
                        ]}
                    >
                        {menuItems.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => console.log(option.label)}
                                style={[
                                    itemList.sortOption,
                                    { alignItems: 'center', paddingVertical: 16 },
                                ]}
                            >
                                <Text>{option.label}</Text>
                            </TouchableOpacity>
                        ))}{' '}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
export default ItemHeader;
