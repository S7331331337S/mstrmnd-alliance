import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, MoreVertical } from "lucide-react-native";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, showBack = false, rightAction }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-[#000000] border-b border-[#111111]"
    >
      <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
        <View className="flex-row items-center gap-3 flex-1">
          {showBack && (
            <Pressable
              onPress={() => router.back()}
              className="w-8 h-8 items-center justify-center rounded-lg active:bg-[#1a1a1a]"
            >
              <ArrowLeft size={20} color="#ffffff" />
            </Pressable>
          )}
          <View className="flex-1">
            <Text className="text-white text-lg font-bold tracking-tight">{title}</Text>
            {subtitle && (
              <Text className="text-[#52525b] text-xs mt-0.5">{subtitle}</Text>
            )}
          </View>
        </View>
        {rightAction && <View>{rightAction}</View>}
      </View>
    </View>
  );
}
