import React from "react";
import { ActivityIndicator, View } from "react-native";

interface SpinnerProps {
  size?: "small" | "large";
  color?: string;
}

export function Spinner({ size = "small", color = "#ffffff" }: SpinnerProps) {
  return (
    <View className="items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
