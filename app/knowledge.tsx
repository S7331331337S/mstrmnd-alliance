import React, { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Folder, Search } from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { KNOWLEDGE } from "@/constants/ops";

export default function KnowledgeScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const folders = useMemo(
    () => KNOWLEDGE.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <View className="flex-1 bg-black">
      <Header title="Knowledge" showBack />
      <View className="px-5 pt-4">
        <View className="flex-row items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3 h-11">
          <Search size={16} color="#52525b" />
          <TextInput
            placeholder="Search knowledge..."
            placeholderTextColor="#52525b"
            value={query}
            onChangeText={setQuery}
            className="flex-1 text-white text-sm"
            style={{ color: "#ffffff" }}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 24, gap: 10 }}
      >
        {folders.map((folder) => (
          <View
            key={folder.id}
            className="flex-row items-center gap-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl px-4 py-4"
          >
            <View className="w-10 h-10 rounded-xl bg-[#111111] border border-[#222222] items-center justify-center">
              <Folder size={16} color="#e4e4e7" />
            </View>
            <Text className="flex-1 text-white text-sm font-medium">{folder.name}</Text>
            <Text className="text-[#71717a] text-sm">{folder.count}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
