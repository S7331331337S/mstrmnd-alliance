import React from "react";
import { Image, ImageStyle, StyleProp, View } from "react-native";

interface MarkProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function Mark({ size = 72, style }: MarkProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={require("../../assets/mark.png")}
        style={[{ width: size, height: size }, style]}
        resizeMode="contain"
      />
    </View>
  );
}
