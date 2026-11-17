import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus, Workflow } from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { ListRow } from "@/components/brand/ListRow";
import { AUTOMATIONS, type AutomationStatus } from "@/constants/ops";
import { toast } from "sonner-native";

const TABS: { key: AutomationStatus; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Drafts" },
  { key: "archived", label: "Archived" },
];

export default function AutomationsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<AutomationStatus>("active");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a.enabled])),
  );

  const items = useMemo(() => AUTOMATIONS.filter((a) => a.status === tab), [tab]);

  return (
    <View className="flex-1 bg-black">
      <Header
        title="Automations"
        showBack
        rightAction={
          <Pressable
            onPress={() => toast.info("New automation coming soon")}
            accessibilityRole="button"
            accessibilityLabel="New automation"
            className="w-11 h-11 items-center justify-center"
          >
            <Plus size={18} color="#ffffff" />
          </Pressable>
        }
      />
      <View className="flex-row gap-2 px-5 pt-4">
        {TABS.map((t) => (
          <Pressable
            key={t.key}
            onPress={() => setTab(t.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: tab === t.key }}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            className={`px-4 py-1.5 rounded-full border ${
              tab === t.key ? "bg-white border-white" : "border-[#726f65]"
            }`}
          >
            <Text className={`text-xs font-medium ${tab === t.key ? "text-black" : "text-[#8a877d]"}`}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 24 }}
      >
        <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <ListRow
              key={item.id}
              icon={<Workflow size={16} color="#e4e4e7" />}
              label={item.name}
              toggle={tab === "active"}
              toggleValue={enabled[item.id]}
              onToggle={(v) => setEnabled((prev) => ({ ...prev, [item.id]: v }))}
              last={i === items.length - 1}
            />
          ))}
          {items.length === 0 && (
            <View className="py-10 items-center">
              <Text className="text-[#8a877d] text-sm">Nothing in {tab}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
