import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import "react-native-reanimated";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
		"Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
		"Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			router.push("/(modals)/login");
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen
				name="(modals)/login"
				options={{
					presentation: "modal",
					title: "Log In or Sign Up",
					headerTitleStyle: { fontFamily: "Montserrat-SemiBold" },
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name="close-outline" size={24} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
			<Stack.Screen
				name="(modals)/booking"
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name="close-outline" size={24} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
