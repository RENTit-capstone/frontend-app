// app.config.js
export default ({ config }) => ({
    ...config,
    expo: {
        name: 'com.rentit',
        slug: 'com-rentit',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './src/assets/images/rentit-icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        newArchEnabled: true,
        splash: {
            image: './src/assets/images/logo.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'com.rentit',
            googleServicesFile: './GoogleService-Info.plist',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './src/assets/images/rentit-icon.png',
                backgroundColor: '#ffffff',
            },
            package: 'com.rentit',
            googleServicesFile: './google-services.json',
            permissions: ['NOTIFICATIONS', 'INTERNET'],
            config: {
                usesCleartextTraffic: true,
            },
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './src/assets/images/logo.png',
        },
        plugins: [
            'expo-router',
            'expo-secure-store',
            'expo-notifications',
            '@react-native-firebase/app',
            [
                '@react-native-firebase/messaging',
                {
                    androidNotificationChannelId: 'default',
                    androidNotificationChannelName: 'Default',
                    iosNSUserNotificationUsageDescription:
                        'This app uses notifications to send you updates.',
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },
        notification: {
            icon: './src/assets/images/rentit-icon.png',
            color: '#ffffff',
        },
        extra: {
            router: {},
            eas: {
                projectId: 'dbcb49e9-9b85-4699-a551-8dbc76cbaf79',
            },
            apiUrl: 'http://223.130.147.103:8080',
        },
        owner: 'kloud035',
    },
});
