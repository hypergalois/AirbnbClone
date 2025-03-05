import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/cache";
import { useAuth } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";

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

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

export default function RootLayout() {
  const [isLoadedFonts, errorFonts] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (errorFonts) throw errorFonts;
  }, [errorFonts]);

  useEffect(() => {
    if (isLoadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [isLoadedFonts]);

  if (!isLoadedFonts) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded: isLoadedClerk, isSignedIn } = useAuth();

  const router = useRouter();

  if (!isLoadedClerk) {
    return null;
  }

  useEffect(() => {
    if (isLoadedClerk && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoadedClerk]);

  return (
    <GestureHandlerRootView>
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
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerTransparent: true,
            headerTitle: (props) => <ModalHeaderText />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "#fff",
                  borderColor: Colors.grey,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}
              >
                <Ionicons name="close-outline" size={22} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="listing/[id]"
          options={{ headerTitle: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, headerTitle: "" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
