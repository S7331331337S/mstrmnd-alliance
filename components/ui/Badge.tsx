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
  idle: { bg: "bg-[#1a1a1a]", text: "text-[#8a877d]", dot: "bg-[#8a877d]" },
  thinking: { bg: "bg-[#f59e0b20]", text: "text-[#f59e0b]", dot: "bg-[#f59e0b]" },
  error: { bg: "bg-[#e08a7c24]", text: "text-[#e08a7c]", dot: "bg-[#e08a7c]" },
  accent: { bg: "bg-[#ffffff14]", text: "text-[#e4e4e7]" },
  outline: { bg: "bg-transparent border border-[#726f65]", text: "text-[#a1a1aa]" },
};

export function Badge({ label, variant = "default", dot = false }: BadgeProps) {
  const v = variantMap[variant];

  return (
    <View className={`flex-row items-center gap-1.5 px-2 py-0.5 rounded-full ${v.bg}`}>
      {dot && v.dot && (
        <View accessibilityElementsHidden importantForAccessibility="no" className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
      )}
      <Text className={`text-xs font-medium ${v.text}`}>{label}</Text>
    </View>
  );
}
