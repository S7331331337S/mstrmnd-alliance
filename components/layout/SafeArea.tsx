import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaProps extends ViewProps {
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

export function SafeArea({ children, edges = ["top", "bottom"], className, style, ...props }: SafeAreaProps) {
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: edges.includes("top") ? insets.top : 0,
    paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
    paddingLeft: edges.includes("left") ? insets.left : 0,
    paddingRight: edges.includes("right") ? insets.right : 0,
  };

  return (
    <View {...props} className={`flex-1 bg-[#000000] ${className ?? ""}`} style={[padding, style]}>
      {children}
    </View>
  );
}
