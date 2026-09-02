import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  BarChart3,
  ChevronRight,
  Crosshair,
  Layers,
  Network,
  Search,
  TrendingUp,
} from "lucide-react-native";
import { ScreenChrome } from "@/components/brand/ScreenChrome";

const ACTIONS = [
  { title: "Create Plan", subtitle: "Define goals and map strategy", Icon: Crosshair, href: "/insights" as const },
  { title: "Research", subtitle: "Gather insights and intelligence", Icon: Search, href: "/knowledge" as const },
  { title: "Build System", subtitle: "Design structures and workflows", Icon: Layers, href: "/automations" as const },
  { title: "Analyze", subtitle: "Evaluate data and performance", Icon: BarChart3, href: "/(tabs)/insights" as const },
  { title: "Connect Tools", subtitle: "Integrate and automate", Icon: Network, href: "/automations" as const },
  { title: "Evolve", subtitle: "Optimize and scale systems", Icon: TrendingUp, href: "/(tabs)/insights" as const },
];

export default function HubScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      <ScreenChrome rightLabel="COMMAND CENTER" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, gap: 12 }}
      >
        <View className="mb-2">
          <Text className="text-white text-2xl font-bold tracking-tight">Command Center</Text>
          <Text className="text-[#71717a] text-sm mt-1">One intelligence layer. Limitless outcomes.</Text>
        </View>

        {ACTIONS.map(({ title, subtitle, Icon, href }) => (
          <Pressable
            key={title}
            onPress={() => router.push(href)}
            className="flex-row items-center gap-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl px-4 py-4 active:bg-[#111111]"
          >
            <View className="w-11 h-11 rounded-xl bg-[#111111] border border-[#222222] items-center justify-center">
              <Icon size={18} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">{title}</Text>
              <Text className="text-[#71717a] text-xs mt-0.5">{subtitle}</Text>
            </View>
            <ChevronRight size={16} color="#52525b" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
