import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, Redirect, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import useAuthStore from '@/stores/useAuthStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateSelectorModal from '@/components/items/DateSelectorModal';
import PolicyModal from '@/components/items/PolicyModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export {
  ErrorBoundary,
} from 'expo-router';

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
  const isAllowedPage = pathname.includes("login") || pathname.includes("signup");

  if (!token && !isAllowedPage) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
      <SafeAreaProvider>  
        <GestureHandlerRootView>  
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />    
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
          <DateSelectorModal />
          <PolicyModal />
        </GestureHandlerRootView>
      </SafeAreaProvider>
  );
}

