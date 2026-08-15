import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Button } from "./Button";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: "default" | "destructive";
  children?: React.ReactNode;
}

export function Dialog({
  visible,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
  children,
}: DialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/70 items-center justify-center px-6" onPress={onClose}>
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-[#0a0a0a] border border-[#222222] rounded-2xl w-full max-w-sm p-5 gap-4"
        >
          <View className="gap-1.5">
            <Text className="text-white text-base font-semibold">{title}</Text>
            {description && (
              <Text className="text-[#71717a] text-sm leading-5">{description}</Text>
            )}
          </View>

          {children && <View>{children}</View>}

          <View className="flex-row gap-2 justify-end">
            <Button variant="ghost" size="sm" onPress={onClose}>
              {cancelLabel}
            </Button>
            {onConfirm && (
              <Button
                variant={variant === "destructive" ? "destructive" : "default"}
                size="sm"
                onPress={onConfirm}
              >
                {confirmLabel}
              </Button>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
