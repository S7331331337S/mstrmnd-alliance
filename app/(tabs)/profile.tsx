import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { KeyRound, Settings as SettingsIcon, Shield, SlidersHorizontal, User } from "lucide-react-native";
import { ScreenChrome } from "@/components/brand/ScreenChrome";
import { ListRow } from "@/components/brand/ListRow";
import { OS_ROSTER } from "@/constants/agents";
import { AUTOMATIONS } from "@/constants/ops";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      <ScreenChrome />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, gap: 20 }}
      >
        <Text className="text-white text-2xl font-bold tracking-tight">Profile</Text>

        <View className="items-center gap-3 py-6 bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl">
          <View className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#333333] items-center justify-center">
            <Text className="text-white text-2xl font-bold">SM</Text>
          </View>
          <Text className="text-white text-xl font-semibold">Steele Malone</Text>
          <Text className="text-[#71717a] text-sm">Operator</Text>
        </View>

        <View className="flex-row gap-3">
          {[
            { label: "Projects", value: "24" },
            { label: "Agents", value: String(OS_ROSTER.length) },
            { label: "Automations", value: String(AUTOMATIONS.length) },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-3 items-center">
              <Text className="text-white text-xl font-bold">{stat.value}</Text>
              <Text className="text-[#52525b] text-xs mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          <ListRow icon={<User size={16} color="#e4e4e7" />} label="Account" onPress={() => router.push("/settings")} />
          <ListRow icon={<SlidersHorizontal size={16} color="#e4e4e7" />} label="Preferences" onPress={() => router.push("/settings")} />
          <ListRow icon={<Shield size={16} color="#e4e4e7" />} label="Security" onPress={() => router.push("/settings")} />
          <ListRow
            icon={<KeyRound size={16} color="#e4e4e7" />}
            label="Integrations"
            onPress={() => router.push("/(tabs)/hub")}
            last
          />
        </View>

        <Pressable
          onPress={() => router.push("/settings")}
          className="flex-row items-center justify-center gap-2 py-3"
        >
          <SettingsIcon size={14} color="#71717a" />
          <Text className="text-[#71717a] text-sm">Open Settings</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}