import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


const AuthLayout = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="login" />
                <Stack.Screen name="signup" />
            </Stack>    
        </SafeAreaView>
    );
}

export default AuthLayout;