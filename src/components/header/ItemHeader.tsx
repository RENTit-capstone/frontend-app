import { Common } from '@/styles/common';
import { Pressable, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowWhite from '@/assets/images/left-arrow-white.svg';
import Menu from '@/assets/images/dots-vertical.svg';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { itemList } from '@/styles/components/itemList';
import { useMenuStore } from '@/stores/useMenuStore';
import { Colors } from '@/styles/tokens';

const ItemHeader = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const backgroundColor = Colors.black;
    const { height } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = useMenuStore((state) => state.menuItems);

    return (
        <View
            style={[
                Common.headerWrapper,
                {
                    backgroundColor: backgroundColor,
                    paddingTop: insets.top,
                    height: height * 0.1,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                },
            ]}
        >
            <Pressable
                onPress={() => router.back()}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
                <LeftArrowWhite width={32} height={32} />
            </Pressable>
            <View style={[Common.XStack, { gap: 20 }]}>
                <Pressable
                    onPress={() => setIsOpen(!isOpen)}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                    <Menu />
                </Pressable>
                {isOpen && (
                    <View
                        style={[
                            itemList.SortDropdown,
                            {
                                position: 'absolute',
                                zIndex: 1000,
                                top: 32,
                                right: 12,
                            },
                        ]}
                    >
                        {menuItems.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={option.onPress}
                                style={[
                                    itemList.sortOption,
                                    { alignItems: 'center', paddingVertical: 16, width: 100 },
                                ]}
                            >
                                <Text>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};
export default ItemHeader;
