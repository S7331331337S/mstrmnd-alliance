import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Sheet } from "@/components/ui/Sheet";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import type { Agent } from "@/constants/agents";
import { STATUS_COLOR, CAPABILITY_LABELS } from "@/constants/agents";
import { Brain, Zap, BarChart2, ChevronRight } from "lucide-react-native";

interface AgentModalProps {
  agent: Agent | null;
  visible: boolean;
  onClose: () => void;
  onChat: (agent: Agent) => void;
}

export function AgentModal({ agent, visible, onClose, onChat }: AgentModalProps) {
  const [systemPrompt, setSystemPrompt] = useState("");

  if (!agent) return null;

  return (
    <Sheet visible={visible} onClose={onClose} title={agent.name} snapPoint={0.75}>
      <View className="px-5 gap-5">
        {/* Profile row */}
        <View className="flex-row items-center gap-4">
          <Avatar initials={agent.avatar} size="lg" status={agent.status} />
          <View className="flex-1 gap-1">
            <Text className="text-white font-semibold text-base">{agent.name}</Text>
            <Text className="text-[#71717a] text-sm">{agent.role}</Text>
            <Badge
              label={agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              variant={agent.status as any}
              dot
            />
          </View>
        </View>

        {/* Description */}
        <Text className="text-[#a1a1aa] text-sm leading-6">{agent.description}</Text>

        {/* Stats */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-[#111111] rounded-xl p-3 gap-1 border border-[#1a1a1a]">
            <Text className="text-[#52525b] text-xs">Messages</Text>
            <Text className="text-white text-lg font-bold">{agent.messagesCount.toLocaleString()}</Text>
          </View>
          <View className="flex-1 bg-[#111111] rounded-xl p-3 gap-1 border border-[#1a1a1a]">
            <Text className="text-[#52525b] text-xs">Success Rate</Text>
            <Text className="text-white text-lg font-bold">{agent.successRate}%</Text>
          </View>
          <View className="flex-1 bg-[#111111] rounded-xl p-3 gap-1 border border-[#1a1a1a]">
            <Text className="text-[#52525b] text-xs">Model</Text>
            <Text className="text-[#8b5cf6] text-xs font-semibold mt-1">{agent.model.split("-").slice(0, 2).join("-")}</Text>
          </View>
        </View>

        {/* Capabilities */}
        <View className="gap-2">
          <Text className="text-[#52525b] text-xs font-medium uppercase tracking-wide">Capabilities</Text>
          <View className="flex-row flex-wrap gap-2">
            {agent.capabilities.map((cap) => (
              <Badge key={cap} label={CAPABILITY_LABELS[cap]} variant="accent" />
            ))}
          </View>
        </View>

        {/* System Prompt */}
        <View className="gap-2">
          <Text className="text-[#52525b] text-xs font-medium uppercase tracking-wide">Override Prompt</Text>
          <Input
            placeholder="Add a custom system instruction..."
            value={systemPrompt}
            onChangeText={setSystemPrompt}
            multiline
            numberOfLines={3}
            style={{ height: 72, textAlignVertical: "top" }}
          />
        </View>

        {/* CTA */}
        <Button variant="accent" size="lg" fullWidth onPress={() => { onClose(); onChat(agent); }}>
          Start Session
        </Button>
      </View>
    </Sheet>
  );
}
