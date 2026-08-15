import React from "react";
import { Text, View } from "react-native";

type BadgeVariant = "default" | "active" | "idle" | "thinking" | "error" | "accent" | "outline";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantMap: Record<BadgeVariant, { bg: string; text: string; dot?: string }> = {
  default: { bg: "bg-[#1a1a1a]", text: "text-[#a1a1aa]" },
  active: { bg: "bg-[#22c55e20]", text: "text-[#22c55e]", dot: "bg-[#22c55e]" },
  idle: { bg: "bg-[#1a1a1a]", text: "text-[#52525b]", dot: "bg-[#52525b]" },
  thinking: { bg: "bg-[#f59e0b20]", text: "text-[#f59e0b]", dot: "bg-[#f59e0b]" },
  error: { bg: "bg-[#ef444420]", text: "text-[#ef4444]", dot: "bg-[#ef4444]" },
  accent: { bg: "bg-[#8b5cf620]", text: "text-[#8b5cf6]" },
  outline: { bg: "bg-transparent border border-[#333333]", text: "text-[#a1a1aa]" },
};

export function Badge({ label, variant = "default", dot = false }: BadgeProps) {
  const v = variantMap[variant];

  return (
    <View className={`flex-row items-center gap-1.5 px-2 py-0.5 rounded-full ${v.bg}`}>
      {dot && v.dot && (
        <View className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
      )}
      <Text className={`text-xs font-medium ${v.text}`}>{label}</Text>
    </View>
  );
}
