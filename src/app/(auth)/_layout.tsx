import { Stack, Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { Common } from "@/styles/common";
import TabBar from "@/components/bottomTabBar/TabBar";
import { ReactElement } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Header from "@/components/Header";

const AuthLayout = () => {
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>    );
}

export default AuthLayout;