import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Home from "@/assets/images/home.svg";
import { ReactElement } from "react";
import Colors from "@/constants/Colors";
import { Common } from "@/styles/common";

const BottomNavBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const primaryColor = Colors.primary;
    const secondaryColor = Colors.secondary;
    const whiteColor = Colors.white;

    const icons: Record<string, (props: { color: string} ) => ReactElement> = {
        itemList: ({ color }) => <Home stroke={color} />,
        history: ({ color }) => <Home stroke={color} />
    }
    
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

        if(["_sitemap", "+not-found"].includes(route.name)) return null;

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
                style={[Common.tabBarItem, {backgroundColor: isFocused ? primaryColor : secondaryColor}] }
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
            >
                {
                    icons[route.name]({
                        color: isFocused? whiteColor : primaryColor,
                    })
                }
                <Text style={{ color: isFocused ? whiteColor : primaryColor, fontSize: 16 }}>
                    {`${label}`}
                </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

export default BottomNavBar;