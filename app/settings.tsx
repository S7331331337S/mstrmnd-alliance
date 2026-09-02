import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bell,
  CreditCard,
  Info,
  Key,
  Lock,
  Palette,
  Settings2,
  Shield,
} from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { ListRow } from "@/components/brand/ListRow";
import { toast } from "sonner-native";

const ROWS = [
  { label: "General", Icon: Settings2 },
  { label: "Appearance", Icon: Palette },
  { label: "Notifications", Icon: Bell },
  { label: "Privacy", Icon: Shield },
  { label: "Security", Icon: Lock },
  { label: "API Keys", Icon: Key },
  { label: "Billing", Icon: CreditCard },
  { label: "About", Icon: Info },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [soon] = useState(() => () => toast.info("Coming soon"));

  return (
    <View className="flex-1 bg-black">
      <Header title="Settings" showBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 24 }}
      >
        <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          {ROWS.map((row, i) => (
            <ListRow
              key={row.label}
              icon={<row.Icon size={16} color="#e4e4e7" />}
              label={row.label}
              onPress={soon}
              last={i === ROWS.length - 1}
            />
          ))}
        </View>
        <Text className="text-[#333333] text-xs text-center mt-8">MSTRMND v1.0.0</Text>
      </ScrollView>
    </View>
  );
}
