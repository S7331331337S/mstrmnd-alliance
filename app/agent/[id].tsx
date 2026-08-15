import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, MessageSquare, BarChart2, Settings2 } from "lucide-react-native";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { AgentModal } from "@/components/modals/AgentModal";
import { MOCK_AGENTS, CAPABILITY_LABELS, STATUS_COLOR } from "@/constants/agents";

export default function AgentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [configVisible, setConfigVisible] = useState(false);

  const agent = MOCK_AGENTS.find((a) => a.id === id);

  if (!agent) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-[#52525b]">Agent not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      {/* Back button */}
      <View className="flex-row items-center px-5 pt-4 pb-2">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#111111] items-center justify-center mr-3"
        >
          <ArrowLeft size={18} color="#ffffff" />
        </Pressable>
        <Text className="text-white text-base font-semibold">Agent Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 20 }}
      >
        {/* Hero */}
        <View className="items-center gap-3 py-6 bg-[#0a0a0a] rounded-3xl border border-[#1a1a1a]">
          <Avatar initials={agent.avatar} size="xl" status={agent.status} />
          <View className="items-center gap-1">
            <Text className="text-white text-2xl font-bold">{agent.name}</Text>
            <Text className="text-[#71717a] text-sm">{agent.role}</Text>
            <Badge label={agent.status} variant={agent.status as any} dot />
          </View>
          <Text className="text-[#52525b] text-sm text-center px-8 leading-5">{agent.description}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          {[
            { label: "Messages", value: agent.messagesCount.toLocaleString() },
            { label: "Success", value: `${agent.successRate}%` },
            { label: "Model", value: agent.model.split("-")[0] },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-3 items-center gap-1">
              <Text className="text-white text-xl font-bold">{stat.value}</Text>
              <Text className="text-[#52525b] text-xs">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Capabilities */}
        <Card elevated bordered>
          <CardContent>
            <View className="pt-4 gap-3">
              <Text className="text-[#52525b] text-xs font-medium uppercase tracking-widest">Capabilities</Text>
              <View className="flex-row flex-wrap gap-2">
                {agent.capabilities.map((cap) => (
                  <Badge key={cap} label={CAPABILITY_LABELS[cap]} variant="accent" />
                ))}
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Model info */}
        <Card elevated bordered>
          <CardContent>
            <View className="pt-4 gap-3">
              <Text className="text-[#52525b] text-xs font-medium uppercase tracking-widest">Configuration</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-[#71717a] text-sm">Model</Text>
                <Text className="text-[#8b5cf6] text-sm font-medium">{agent.model}</Text>
              </View>
              <View className="h-px bg-[#111111]" />
              <View className="flex-row items-center justify-between">
                <Text className="text-[#71717a] text-sm">Status</Text>
                <View className="flex-row items-center gap-2">
                  <View className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLOR[agent.status] }} />
                  <Text className="text-[#a1a1aa] text-sm capitalize">{agent.status}</Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Actions */}
        <View className="gap-3">
          <Button
            variant="accent"
            size="lg"
            fullWidth
            onPress={() => router.push("/(tabs)/chat")}
          >
            Start Session
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onPress={() => setConfigVisible(true)}
          >
            Configure Agent
          </Button>
        </View>
      </ScrollView>

      <AgentModal
        agent={agent}
        visible={configVisible}
        onClose={() => setConfigVisible(false)}
        onChat={() => router.push("/(tabs)/chat")}
      />
    </View>
  );
}
