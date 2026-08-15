import React from "react";
import { Text, View } from "react-native";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "active" | "idle" | "thinking" | "error";
  accentColor?: string;
}

const sizeMap = {
  sm: { container: "w-8 h-8 rounded-xl", text: "text-xs", dot: "w-2 h-2 -bottom-0.5 -right-0.5" },
  md: { container: "w-10 h-10 rounded-xl", text: "text-sm", dot: "w-2.5 h-2.5 -bottom-0.5 -right-0.5" },
  lg: { container: "w-14 h-14 rounded-2xl", text: "text-base", dot: "w-3 h-3 bottom-0 right-0" },
  xl: { container: "w-20 h-20 rounded-3xl", text: "text-xl", dot: "w-4 h-4 bottom-0.5 right-0.5" },
};

const statusColor: Record<string, string> = {
  active: "bg-[#22c55e]",
  idle: "bg-[#52525b]",
  thinking: "bg-[#f59e0b]",
  error: "bg-[#ef4444]",
};

export function Avatar({ initials, size = "md", status, accentColor = "#8b5cf6" }: AvatarProps) {
  const s = sizeMap[size];

  return (
    <View className="relative self-start">
      <View
        className={`${s.container} items-center justify-center`}
        style={{ backgroundColor: `${accentColor}25`, borderWidth: 1, borderColor: `${accentColor}40` }}
      >
        <Text className={`${s.text} font-bold text-white`}>{initials}</Text>
      </View>
      {status && (
        <View
          className={`absolute ${s.dot} ${statusColor[status]} rounded-full border-2 border-[#000000]`}
        />
      )}
    </View>
  );
}
