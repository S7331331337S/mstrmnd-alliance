import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Database,
  FileText,
  LayoutGrid,
  MessageSquare,
  NotebookPen,
  Search,
  Users,
} from "lucide-react-native";
import { Mark } from "@/components/brand/Mark";

const ORBIT = [
  { Icon: MessageSquare, label: "Chat", angle: -90 },
  { Icon: FileText, label: "Docs", angle: -40 },
  { Icon: LayoutGrid, label: "Workspace", angle: 10 },
  { Icon: Users, label: "CRM", angle: 60 },
  { Icon: Database, label: "Storage", angle: 130 },
  { Icon: Search, label: "Search", angle: 180 },
  { Icon: NotebookPen, label: "Notes", angle: 230 },
];

const RADIUS = 118;

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const enter = async () => {
    await AsyncStorage.setItem("mstrmnd.entered", "1");
    router.replace("/(tabs)/dashboard");
  };

  return (
    <View
      className="flex-1 bg-black"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
    >
      <View className="flex-1 items-center justify-center">
        <View style={{ width: 300, height: 300 }} className="items-center justify-center">
          {ORBIT.map(({ Icon, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * RADIUS;
            const y = Math.sin(rad) * RADIUS;
            return (
              <View
                key={angle}
                className="absolute w-11 h-11 rounded-full bg-[#0a0a0a] border border-[#2a2a2a] items-center justify-center"
                style={{
                  left: 150 + x - 22,
                  top: 150 + y - 22,
                }}
              >
                <Icon size={16} color="#e4e4e7" />
              </View>
            );
          })}
          <View className="w-24 h-24 rounded-3xl bg-[#0a0a0a] border border-[#2a2a2a] items-center justify-center">
            <Mark size={72} />
          </View>
        </View>

        <Text className="text-white text-xl font-semibold tracking-[2px] mt-4">
          Welcome back MSTRMND
        </Text>
        <Text className="text-[#71717a] text-sm mt-2 px-10 text-center">
          The operating layer for AI systems.
        </Text>
      </View>

      <View className="px-8">
        <Pressable
          onPress={enter}
          className="h-14 rounded-full border border-[#e4e4e7] items-center justify-center active:bg-[#111111]"
        >
          <Text className="text-white text-base font-semibold tracking-widest">Enter</Text>
        </Pressable>
      </View>
    </View>
  );
}
