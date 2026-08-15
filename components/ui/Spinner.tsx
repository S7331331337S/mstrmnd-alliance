import React from "react";
import { ActivityIndicator, View } from "react-native";

interface SpinnerProps {
  size?: "small" | "large";
  color?: string;
}

export function Spinner({ size = "small", color = "#8b5cf6" }: SpinnerProps) {
  return (
    <View className="items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
