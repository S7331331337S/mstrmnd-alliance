import React, { useState } from "react";
import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenChrome } from "@/components/brand/ScreenChrome";
import { Sparkline } from "@/components/brand/Sparkline";
import { INSIGHT_CATEGORIES, SIGNAL_TREND } from "@/constants/ops";

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [range, setRange] = useState<"week" | "month">("week");

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      <ScreenChrome />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110, gap: 20 }}
      >
        <View className="flex-row items-end justify-between">
          <Text className="text-white text-2xl font-bold tracking-tight">Insights</Text>
          <View className="flex-row bg-[#0a0a0a] border border-[#1a1a1a] rounded-full p-1">
            {(["week", "month"] as const).map((key) => (
              <Pressable
                key={key}
                onPress={() => setRange(key)}
                className={`px-3 py-1 rounded-full ${range === key ? "bg-[#1a1a1a]" : ""}`}
              >
                <Text className={`text-xs ${range === key ? "text-white" : "text-[#71717a]"}`}>
                  {key === "week" ? "This Week" : "This Month"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl p-5 gap-4">
          <Text className="text-[#71717a] text-xs tracking-widest uppercase">Overview</Text>
          <View className="flex-row items-end gap-3">
            <Text className="text-white text-4xl font-bold">12,847</Text>
            <Text className="text-[#22c55e] text-sm font-medium mb-1">+12.5%</Text>
          </View>
          <Sparkline points={SIGNAL_TREND} width={width - 80} height={110} />
        </View>

        <View className="gap-3">
          <Text className="text-white font-semibold text-base">Top Categories</Text>
          <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 gap-4">
            {INSIGHT_CATEGORIES.map((cat) => (
              <View key={cat.label} className="gap-1.5">
                <View className="flex-row justify-between">
                  <Text className="text-[#e4e4e7] text-sm">{cat.label}</Text>
                  <Text className="text-white text-sm font-medium">{cat.pct}%</Text>
                </View>
                <View className="h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
                  <View className="h-full bg-white rounded-full" style={{ width: `${cat.pct}%` }} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
