import React from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
  bordered?: boolean;
}

export function Card({ children, elevated = false, bordered = true, style, className, ...props }: CardProps) {
  return (
    <View
      {...props}
      className={`rounded-2xl ${elevated ? "bg-[#1a1a1a]" : "bg-[#0a0a0a]"} ${
        bordered ? "border border-[#1a1a1a]" : ""
      } ${className ?? ""}`}
      style={style}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className, ...props }: ViewProps & { children: React.ReactNode }) {
  return (
    <View {...props} className={`px-4 pt-4 pb-3 ${className ?? ""}`}>
      {children}
    </View>
  );
}

export function CardContent({ children, className, ...props }: ViewProps & { children: React.ReactNode }) {
  return (
    <View {...props} className={`px-4 pb-4 ${className ?? ""}`}>
      {children}
    </View>
  );
}

export function CardFooter({ children, className, ...props }: ViewProps & { children: React.ReactNode }) {
  return (
    <View
      {...props}
      className={`px-4 py-3 border-t border-[#1a1a1a] flex-row items-center justify-between ${className ?? ""}`}
    >
      {children}
    </View>
  );
}
