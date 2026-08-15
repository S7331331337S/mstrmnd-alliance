import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { AgentModal } from "@/components/modals/AgentModal";
import { MOCK_AGENTS, type Agent, CAPABILITY_LABELS, type AgentCapability } from "@/constants/agents";
import { useRouter } from "expo-router";

const ALL_CAPS: AgentCapability[] = ["reasoning", "coding", "research", "creative", "analysis", "planning"];

export default function AgentsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<AgentCapability | "all">("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = MOCK_AGENTS.filter((a) => {
    const matchQuery =
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.role.toLowerCase().includes(query.toLowerCase());
    const matchCap = filter === "all" || a.capabilities.includes(filter);
    return matchQuery && matchCap;
  });

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3 gap-4">
        <Text className="text-white text-2xl font-bold tracking-tight">Agents</Text>

        {/* Search */}
        <View className="flex-row items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3 h-10">
          <Search size={16} color="#52525b" />
          <TextInput
            placeholder="Search agents..."
            placeholderTextColor="#52525b"
            value={query}
            onChangeText={setQuery}
            className="flex-1 text-white text-sm"
            style={{ color: "#ffffff" }}
          />
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full border ${
                filter === "all" ? "bg-[#8b5cf6] border-[#8b5cf6]" : "bg-transparent border-[#222222]"
              }`}
            >
              <Text className={`text-xs font-medium ${filter === "all" ? "text-white" : "text-[#71717a]"}`}>All</Text>
            </Pressable>
            {ALL_CAPS.map((cap) => (
              <Pressable
                key={cap}
                onPress={() => setFilter(cap)}
                className={`px-3 py-1.5 rounded-full border ${
                  filter === cap ? "bg-[#8b5cf6] border-[#8b5cf6]" : "bg-transparent border-[#222222]"
                }`}
              >
                <Text className={`text-xs font-medium ${filter === cap ? "text-white" : "text-[#71717a]"}`}>
                  {CAPABILITY_LABELS[cap]}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 12 }}
      >
        {filtered.map((agent) => (
          <Pressable
            key={agent.id}
            onPress={() => { setSelectedAgent(agent); setModalVisible(true); }}
          >
            <Card elevated bordered>
              <CardContent>
                <View className="flex-row items-start gap-3 pt-4">
                  <Avatar initials={agent.avatar} size="md" status={agent.status} />
                  <View className="flex-1 gap-1.5">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-white font-semibold text-sm">{agent.name}</Text>
                      <Badge label={agent.status} variant={agent.status as any} dot />
                    </View>
                    <Text className="text-[#71717a] text-xs">{agent.role}</Text>
                    <Text className="text-[#52525b] text-xs leading-4" numberOfLines={2}>{agent.description}</Text>
                    <View className="flex-row flex-wrap gap-1.5 mt-1">
                      {agent.capabilities.slice(0, 3).map((cap) => (
                        <Badge key={cap} label={CAPABILITY_LABELS[cap]} variant="accent" />
                      ))}
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          </Pressable>
        ))}

        {filtered.length === 0 && (
          <View className="py-20 items-center gap-2">
            <Text className="text-[#52525b] text-sm">No agents match your search</Text>
          </View>
        )}
      </ScrollView>

      <AgentModal
        agent={selectedAgent}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onChat={(agent) => router.push(`/agent/${agent.id}`)}
      />
    </View>
  );
}
