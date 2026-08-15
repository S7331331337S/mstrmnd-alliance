import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Search, Bot, MessageSquare, Settings, Home, Zap } from "lucide-react-native";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  visible: boolean;
  onClose: () => void;
  commands?: Command[];
}

const defaultCommands: Command[] = [
  { id: "home", label: "Go to Home", icon: <Home size={16} color="#a1a1aa" />, action: () => {} },
  { id: "agents", label: "Browse Agents", icon: <Bot size={16} color="#a1a1aa" />, action: () => {} },
  { id: "chat", label: "New Chat", icon: <MessageSquare size={16} color="#a1a1aa" />, action: () => {} },
  { id: "settings", label: "Open Settings", icon: <Settings size={16} color="#a1a1aa" />, action: () => {} },
  { id: "activate", label: "Activate All Agents", icon: <Zap size={16} color="#8b5cf6" />, action: () => {} },
];

export function CommandPalette({ visible, onClose, commands = defaultCommands }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      setQuery("");
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.description?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/70" onPress={onClose}>
        <Animated.View
          style={{ opacity, transform: [{ translateY }] }}
          className="mx-4 mt-24"
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="bg-[#0a0a0a] border border-[#222222] rounded-2xl overflow-hidden">
              {/* Search bar */}
              <View className="flex-row items-center gap-3 px-4 py-3 border-b border-[#1a1a1a]">
                <Search size={18} color="#52525b" />
                <TextInput
                  autoFocus
                  placeholder="Type a command or search..."
                  placeholderTextColor="#52525b"
                  value={query}
                  onChangeText={setQuery}
                  className="flex-1 text-white text-sm"
                  style={{ color: "#ffffff" }}
                />
              </View>

              {/* Results */}
              <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                style={{ maxHeight: 300 }}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => { item.action(); onClose(); }}
                    className="flex-row items-center gap-3 px-4 py-3 active:bg-[#1a1a1a]"
                  >
                    <View className="w-8 h-8 rounded-lg bg-[#111111] items-center justify-center">
                      {item.icon}
                    </View>
                    <View className="flex-1">
                      <Text className="text-white text-sm font-medium">{item.label}</Text>
                      {item.description && (
                        <Text className="text-[#52525b] text-xs">{item.description}</Text>
                      )}
                    </View>
                    <Text className="text-[#333333] text-xs">↩</Text>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <View className="py-10 items-center">
                    <Text className="text-[#52525b] text-sm">No results found</Text>
                  </View>
                }
              />

              {/* Footer hint */}
              <View className="flex-row gap-4 px-4 py-2 border-t border-[#1a1a1a]">
                <Text className="text-[#333333] text-xs">↩ select</Text>
                <Text className="text-[#333333] text-xs">esc close</Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
