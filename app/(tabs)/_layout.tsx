import { Tabs } from "expo-router";
import { BarChart3, Home, LayoutGrid, User } from "lucide-react-native";

const TAB_BAR_BG = "#050505";
const ACTIVE = "#ffffff";
const INACTIVE = "#52525b";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BG,
          borderTopColor: "#1a1a1a",
          borderTopWidth: 1,
          // No fixed height / bottom padding: the navigator adds the safe-area
          // bottom inset itself, so the bar clears the gesture/3-button nav bar
          // under edge-to-edge instead of sitting behind it.
          paddingTop: 10,
        },
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarShowLabel: false,
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
