import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeWhite from '@/assets/images/home-white.svg';
import HomeFocused from '@/assets/images/home-focused.svg';
import HistoryWhite from '@/assets/images/history-white.svg';
import HistoryFocused from '@/assets/images/history-focused.svg';
import MyPageFocused from '@/assets/images/user-focused.svg';
import MyPageWhite from '@/assets/images/user-white.svg';
import { Common } from '@/styles/common';
import { Colors } from '@/styles/tokens';

const BottomNavBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const primaryColor = Colors.primary;
    const secondaryColor = Colors.secondary;
    const whiteColor = Colors.white;

    const icons = {
        itemListFocused: <HomeWhite />,
        itemListUnfocused: <HomeFocused />,
        historyFocused: <HistoryWhite />,
        historyUnfocused: <HistoryFocused />,
        mypageFocused: <MyPageWhite />,
        mypageUnfocused: <MyPageFocused />,
    };

    return (
        <View style={[Common.bottomBar, Common.upperShadow]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                          ? options.title
                          : route.name;

                if (['_sitemap', '+not-found'].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={[
                            Common.tabBarItem,
                            { backgroundColor: isFocused ? primaryColor : secondaryColor },
                        ]}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                    >
                        {
                            icons[
                                `${route.name}${isFocused ? 'Focused' : 'Unfocused'}` as keyof typeof icons
                            ]
                        }
                        <Text
                            style={{ color: isFocused ? whiteColor : primaryColor, fontSize: 16 }}
                        >
                            {`${label}`}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default BottomNavBar;
