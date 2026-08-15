import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { X } from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  snapPoint?: number;
  children: React.ReactNode;
}

export function Sheet({ visible, onClose, title, snapPoint = 0.6, children }: SheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable
          className="flex-1 bg-black/60"
          onPress={onClose}
        />
        <Animated.View
          style={{
            transform: [{ translateY }],
            maxHeight: SCREEN_HEIGHT * snapPoint,
            minHeight: 200,
          }}
          className="bg-[#0a0a0a] rounded-t-3xl border-t border-x border-[#1a1a1a]"
        >
          {/* Handle */}
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 rounded-full bg-[#333333]" />
          </View>

          {title && (
            <View className="flex-row items-center justify-between px-5 pb-4">
              <Text className="text-white text-base font-semibold">{title}</Text>
              <Pressable
                onPress={onClose}
                className="w-7 h-7 rounded-full bg-[#1a1a1a] items-center justify-center"
              >
                <X size={14} color="#a1a1aa" />
              </Pressable>
            </View>
          )}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
