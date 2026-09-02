import React from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface ListRowProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  last?: boolean;
}

export function ListRow({
  icon,
  label,
  value,
  onPress,
  toggle,
  toggleValue,
  onToggle,
  last,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress && !toggle}
      className={`flex-row items-center gap-3 px-4 py-3.5 ${last ? "" : "border-b border-[#1a1a1a]"}`}
    >
      {icon ? (
        <View className="w-9 h-9 rounded-xl bg-[#111111] border border-[#1a1a1a] items-center justify-center">
          {icon}
        </View>
      ) : null}
      <Text className="flex-1 text-white text-sm font-medium">{label}</Text>
      {value ? <Text className="text-[#71717a] text-sm">{value}</Text> : null}
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ true: "#22c55e", false: "#222222" }}
          thumbColor="#ffffff"
        />
      ) : onPress ? (
        <ChevronRight size={16} color="#52525b" />
      ) : null}
    </Pressable>
  );
}
