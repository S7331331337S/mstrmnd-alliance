import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Bot, Command, Plus, TrendingUp, Zap } from "lucide-react-native";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { AgentModal } from "@/components/modals/AgentModal";
import { CommandPalette } from "@/components/modals/CommandPalette";
import { MOCK_AGENTS, type Agent } from "@/constants/agents";

const ACTIVE_AGENTS = MOCK_AGENTS.filter((a) => a.status === "active" || a.status === "thinking");

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentModalVisible, setAgentModalVisible] = useState(false);
  const [commandVisible, setCommandVisible] = useState(false);

  const totalMessages = MOCK_AGENTS.reduce((acc, a) => acc + a.messagesCount, 0);
  const avgSuccess = Math.round(MOCK_AGENTS.reduce((acc, a) => acc + a.successRate, 0) / MOCK_AGENTS.length);

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View>
          <Text className="text-[#52525b] text-xs font-medium uppercase tracking-widest">MSTRMND</Text>
          <Text className="text-white text-2xl font-bold tracking-tight">Alliance</Text>
        </View>
        <Pressable
          onPress={() => setCommandVisible(true)}
          className="w-9 h-9 rounded-xl bg-[#111111] border border-[#1a1a1a] items-center justify-center"
        >
          <Command size={16} color="#a1a1aa" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20, gap: 20 }}
      >
        {/* Stats row */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 gap-2">
            <View className="flex-row items-center gap-2">
              <Zap size={14} color="#8b5cf6" />
              <Text className="text-[#52525b] text-xs">Active Agents</Text>
            </View>
            <Text className="text-white text-2xl font-bold">{ACTIVE_AGENTS.length}</Text>
            <Text className="text-[#52525b] text-xs">of {MOCK_AGENTS.length} total</Text>
          </View>
          <View className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 gap-2">
            <View className="flex-row items-center gap-2">
              <TrendingUp size={14} color="#22c55e" />
              <Text className="text-[#52525b] text-xs">Avg. Success</Text>
            </View>
            <Text className="text-white text-2xl font-bold">{avgSuccess}%</Text>
            <Text className="text-[#52525b] text-xs">{totalMessages.toLocaleString()} messages</Text>
          </View>
        </View>

        {/* Active agents */}
        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-white font-semibold text-base">Active Now</Text>
            <Pressable onPress={() => router.push("/(tabs)/agents")}>
              <Text className="text-[#8b5cf6] text-sm">See all</Text>
            </Pressable>
          </View>

          {ACTIVE_AGENTS.map((agent) => (
            <Pressable
              key={agent.id}
              onPress={() => { setSelectedAgent(agent); setAgentModalVisible(true); }}
            >
              <Card elevated bordered>
                <CardContent>
                  <View className="flex-row items-center gap-3 pt-4">
                    <Avatar initials={agent.avatar} size="md" status={agent.status} />
                    <View className="flex-1 gap-0.5">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-white font-semibold text-sm">{agent.name}</Text>
                        <Badge
                          label={agent.status}
                          variant={agent.status as any}
                          dot
                        />
                      </View>
                      <Text className="text-[#71717a] text-xs">{agent.role}</Text>
                    </View>
                  </View>
                </CardContent>
              </Card>
            </Pressable>
          ))}
        </View>

        {/* All agents quick grid */}
        <View className="gap-3">
          <Text className="text-white font-semibold text-base">All Agents</Text>
          <View className="flex-row flex-wrap gap-3">
            {MOCK_AGENTS.map((agent) => (
              <Pressable
                key={agent.id}
                className="flex-1 min-w-[140px] bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-3 gap-2"
                onPress={() => { setSelectedAgent(agent); setAgentModalVisible(true); }}
              >
                <Avatar initials={agent.avatar} size="sm" status={agent.status} />
                <Text className="text-white text-sm font-medium">{agent.name}</Text>
                <Text className="text-[#52525b] text-xs" numberOfLines={1}>{agent.role}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => router.push("/(tabs)/chat")}
        className="absolute bottom-28 right-5 w-14 h-14 rounded-2xl bg-[#8b5cf6] items-center justify-center shadow-lg active:bg-[#7c3aed]"
      >
        <Plus size={24} color="#ffffff" />
      </Pressable>

      <AgentModal
        agent={selectedAgent}
        visible={agentModalVisible}
        onClose={() => setAgentModalVisible(false)}
        onChat={(agent) => router.push(`/agent/${agent.id}`)}
      />
      <CommandPalette visible={commandVisible} onClose={() => setCommandVisible(false)} />
    </View>
  );
}
