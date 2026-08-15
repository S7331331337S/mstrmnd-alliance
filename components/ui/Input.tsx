import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, hint, leftIcon, rightIcon, style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-sm font-medium text-[#a1a1aa]">{label}</Text>
      )}
      <View
        className={`flex-row items-center rounded-xl border ${
          error
            ? "border-[#ef4444]"
            : focused
            ? "border-[#8b5cf6]"
            : "border-[#222222]"
        } bg-[#0a0a0a] px-3 h-11`}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className="flex-1 text-white text-sm"
          placeholderTextColor="#52525b"
          style={[{ color: "#ffffff" }, style]}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && <Text className="text-xs text-[#ef4444]">{error}</Text>}
      {hint && !error && <Text className="text-xs text-[#52525b]">{hint}</Text>}
    </View>
  );
}
