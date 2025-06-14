import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, Redirect, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import useAuthStore from '@/stores/useAuthStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Common } from '@/styles/common';
import BaseBottomSheet from '@/components/bottomSheet/BaseBottomSheet';
import { Colors } from '@/styles/tokens';
import BackButtonHeader from '@/components/header/BackButtonHeader';

SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync().then(() => setAppReady(true));
        }
    }, [loaded]);

    if (!loaded || !appReady) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const token = useAuthStore((state) => state.accessToken);
    const pathname = usePathname();
    const isAllowedPage = pathname.includes('login') || pathname.includes('signup');
    const isWeb = Platform.OS === 'web';
    const contentWidth = isWeb ? 414 : '100%';

    if (!token && !isAllowedPage) {
        return <Redirect href={'/(auth)/login'} />;
    }

    return (
        <>
            <SafeAreaProvider
                style={{
                    width: contentWidth,
                    alignSelf: 'center',
                    backgroundColor: Colors.secondary,
                }}
            >
                <GestureHandlerRootView>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="modal" options={{ headerShown: false }} />
                        <Stack.Screen
                            name="notification"
                            options={{
                                title: '알림',
                                headerShown: true,
                                header: () => <BackButtonHeader title="알림" />,
                            }}
                        />
                    </Stack>
                    <BaseBottomSheet />
                </GestureHandlerRootView>
            </SafeAreaProvider>
            <Toast
                position="bottom"
                config={{
                    success: (props) => (
                        <BaseToast
                            {...props}
                            style={Common.toast}
                            contentContainerStyle={{ paddingHorizontal: 16 }}
                            text1Style={Common.toastText}
                        />
                    ),
                }}
            />
        </>
    );
}
