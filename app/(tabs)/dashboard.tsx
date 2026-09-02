import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BarChart3, BookOpen, Bot, Workflow } from "lucide-react-native";
import { ScreenChrome } from "@/components/brand/ScreenChrome";
import { ACTIVITY } from "@/constants/ops";

const QUICK = [
  { label: "Insights", href: "/(tabs)/insights" as const, Icon: BarChart3 },
  { label: "Automations", href: "/automations" as const, Icon: Workflow },
  { label: "Knowledge", href: "/knowledge" as const, Icon: BookOpen },
  { label: "Agents", href: "/agents" as const, Icon: Bot },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      <ScreenChrome />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, gap: 20 }}
      >
        <Text className="text-white text-2xl font-bold tracking-tight">Dashboard</Text>

        <View className="flex-row items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl px-4 py-3">
          <View className="w-2 h-2 rounded-full bg-[#22c55e]" />
          <Text className="text-[#a1a1aa] text-sm">System Status</Text>
          <Text className="text-white text-sm font-medium ml-auto">All systems operational</Text>
        </View>

        <View className="flex-row flex-wrap gap-3">
          {QUICK.map(({ label, href, Icon }) => (
            <Pressable
              key={label}
              onPress={() => router.push(href)}
              className="w-[47%] bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 gap-3 active:bg-[#111111]"
            >
              <View className="w-10 h-10 rounded-xl bg-[#111111] border border-[#222222] items-center justify-center">
                <Icon size={18} color="#e4e4e7" />
              </View>
              <Text className="text-white text-sm font-semibold">{label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="gap-3">
          <Text className="text-white font-semibold text-base">Activity</Text>
          <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
            {ACTIVITY.map((item, i) => (
              <View
                key={item.id}
                className={`px-4 py-3.5 ${i < ACTIVITY.length - 1 ? "border-b border-[#1a1a1a]" : ""}`}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-white text-sm font-medium">{item.title}</Text>
                  <Text className="text-[#52525b] text-xs">{item.ago}</Text>
                </View>
                <Text className="text-[#71717a] text-xs mt-1">{item.detail}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
