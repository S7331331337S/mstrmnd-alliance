import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Header } from "@/components/layout/Header";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { AgentModal } from "@/components/modals/AgentModal";
import { OS_ROSTER, type Agent } from "@/constants/agents";
import { toast } from "sonner-native";

export default function AgentsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selected, setSelected] = useState<Agent | null>(null);

  return (
    <View className="flex-1 bg-black">
      <Header
        title="Agents"
        showBack
        rightAction={
          <Pressable onPress={() => toast.info("New agent coming soon")} className="w-8 h-8 items-center justify-center">
            <Plus size={18} color="#ffffff" />
          </Pressable>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 24, gap: 10 }}
      >
        {OS_ROSTER.map((agent) => (
          <Pressable
            key={agent.id}
            onPress={() => setSelected(agent)}
            className="flex-row items-center gap-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl px-4 py-3.5"
          >
            <Avatar initials={agent.avatar} size="md" status={agent.status} />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">{agent.name}</Text>
              <Text className="text-[#71717a] text-xs mt-0.5">{agent.role}</Text>
            </View>
            <Badge
              label={agent.status === "active" ? "Active" : agent.status}
              variant={agent.status}
              dot
            />
          </Pressable>
        ))}
      </ScrollView>
      <AgentModal
        agent={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
        onChat={(agent) => router.push({ pathname: "/chat", params: { agentId: agent.id } })}
      />
    </View>
  );
}