import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Grid3x3 } from "lucide-react-native";
import { Mark } from "@/components/brand/Mark";

interface ScreenChromeProps {
  rightLabel?: string;
  onMenu?: () => void;
}

export function ScreenChrome({ rightLabel = "SYSTEM ONLINE", onMenu }: ScreenChromeProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
      <View className="flex-row items-center gap-2">
        <Mark size={22} />
        <Text className="text-white text-sm font-semibold tracking-[3px]">MSTRMND</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="flex-row items-center gap-1.5">
          <View accessibilityElementsHidden importantForAccessibility="no" className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <Text className="text-[#a1a1aa] text-[10px] tracking-widest">{rightLabel}</Text>
        </View>
        <Pressable
          onPress={onMenu ?? (() => router.push("/(tabs)/hub"))}
          accessibilityRole="button"
          accessibilityLabel="Open hub"
          className="w-11 h-11 items-center justify-center"
        >
          <Grid3x3 size={16} color="#e4e4e7" />
        </Pressable>
      </View>
    </View>
  );
}
