import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000000" },
            animation: "fade",
          }}
        >
          <Stack.Screen name="onboarding" options={{ animation: "slide_from_bottom" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="agent/[id]" options={{ animation: "slide_from_right" }} />
        </Stack>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              backgroundColor: "#111111",
              borderColor: "#222222",
              borderWidth: 1,
            },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
