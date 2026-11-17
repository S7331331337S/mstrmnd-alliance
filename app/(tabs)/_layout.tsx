import { Tabs } from "expo-router";
import { BarChart3, Home, LayoutGrid, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_BG = "#050505";
const ACTIVE = "#ffffff";
const INACTIVE = "#8a877d";

/** Icon (24) + label line box (~16) + top padding (8) + breathing room. */
const BAR_CONTENT_HEIGHT = 64;

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BG,
          borderTopColor: "#1a1a1a",
          borderTopWidth: 1,
          // Explicit height = content + the safe-area bottom inset. The navigator's default
          // 49pt content area is too short once labels are shown (#19), which clipped the
          // labels into the system nav bar under edge-to-edge.
          height: BAR_CONTENT_HEIGHT + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom,
        },
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="hub"
        options={{
          title: "Hub",
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
