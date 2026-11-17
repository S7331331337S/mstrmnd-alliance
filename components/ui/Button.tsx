import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";

type Variant = "default" | "outline" | "ghost" | "destructive" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  default: {
    container: "bg-[#ffffff] active:bg-[#e4e4e7]",
    text: "text-[#000000] font-semibold",
  },
  accent: {
    container: "border border-[#e4e4e7] bg-transparent active:bg-[#1a1a1a]",
    text: "text-white font-semibold",
  },
  outline: {
    container: "border border-[#726f65] bg-transparent active:bg-[#1a1a1a]",
    text: "text-[#ffffff] font-medium",
  },
  ghost: {
    container: "bg-transparent active:bg-[#1a1a1a]",
    text: "text-[#a1a1aa] font-medium",
  },
  destructive: {
    container: "bg-[#e08a7c] active:bg-[#c9766a]",
    text: "text-[#0a0a0b] font-semibold",
  },
};

const sizeStyles: Record<Size, { container: string; text: string }> = {
  sm: { container: "min-h-[44px] px-3 rounded-lg", text: "text-xs" },
  md: { container: "h-11 px-4 rounded-xl", text: "text-sm" },
  lg: { container: "h-12 px-6 rounded-full", text: "text-base" },
};

export function Button({
  variant = "default",
  size = "md",
  loading = false,
  children,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={typeof children === "string" ? children : undefined}
      {...props}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={`flex-row items-center justify-center ${v.container} ${s.container} ${
        fullWidth ? "w-full" : "self-start"
      } ${isDisabled ? "opacity-50" : ""}`}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "default" || variant === "destructive" ? "#000" : "#fff"}
        />
      ) : typeof children === "string" ? (
        <Text className={`${v.text} ${s.text}`}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
