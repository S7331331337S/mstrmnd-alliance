import React, { useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight, Key, Moon, Shield, Trash2, User, Zap } from "lucide-react-native";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
import { toast } from "sonner-native";

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  destructive?: boolean;
}

function SettingRow({ icon, label, value, toggle, toggleValue, onToggle, onPress, destructive }: SettingRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress && !toggle}
      className="flex-row items-center gap-3 px-4 py-3 active:bg-[#0a0a0a]"
    >
      <View className="w-8 h-8 rounded-xl bg-[#111111] items-center justify-center">{icon}</View>
      <Text className={`flex-1 text-sm font-medium ${destructive ? "text-[#ef4444]" : "text-[#e4e4e7]"}`}>
        {label}
      </Text>
      {value && <Text className="text-[#52525b] text-sm">{value}</Text>}
      {toggle && <Switch value={toggleValue} onValueChange={onToggle} trackColor={{ true: "#8b5cf6", false: "#222222" }} />}
      {!toggle && onPress && <ChevronRight size={16} color="#333333" />}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(true);
  const [streaming, setStreaming] = useState(true);
  const [resetVisible, setResetVisible] = useState(false);

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6">
          <Text className="text-white text-2xl font-bold tracking-tight">Settings</Text>
        </View>

        {/* Profile */}
        <View className="px-5 mb-6">
          <Card elevated bordered>
            <CardContent>
              <View className="flex-row items-center gap-4 pt-4">
                <Avatar initials="MA" size="lg" />
                <View className="flex-1">
                  <Text className="text-white font-semibold text-base">Commander</Text>
                  <Text className="text-[#52525b] text-sm">commander@mstrmnd.ai</Text>
                  <Badge label="Pro" variant="accent" />
                </View>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Preferences */}
        <View className="px-5 mb-4">
          <Text className="text-[#52525b] text-xs font-medium uppercase tracking-widest mb-2">Preferences</Text>
          <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
            <SettingRow
              icon={<Moon size={16} color="#8b5cf6" />}
              label="Dark Mode"
              toggle
              toggleValue={darkMode}
              onToggle={setDarkMode}
            />
            <View className="h-px bg-[#111111] mx-4" />
            <SettingRow
              icon={<Zap size={16} color="#f59e0b" />}
              label="Streaming Responses"
              toggle
              toggleValue={streaming}
              onToggle={setStreaming}
            />
          </View>
        </View>

        {/* API & Security */}
        <View className="px-5 mb-4">
          <Text className="text-[#52525b] text-xs font-medium uppercase tracking-widest mb-2">API & Security</Text>
          <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
            <SettingRow
              icon={<Key size={16} color="#a1a1aa" />}
              label="API Keys"
              value="3 configured"
              onPress={() => toast.info("API Keys manager coming soon")}
            />
            <View className="h-px bg-[#111111] mx-4" />
            <SettingRow
              icon={<Shield size={16} color="#22c55e" />}
              label="Privacy & Data"
              onPress={() => toast.info("Privacy settings coming soon")}
            />
          </View>
        </View>

        {/* Account */}
        <View className="px-5 mb-4">
          <Text className="text-[#52525b] text-xs font-medium uppercase tracking-widest mb-2">Account</Text>
          <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
            <SettingRow
              icon={<User size={16} color="#a1a1aa" />}
              label="Profile"
              onPress={() => toast.info("Profile editor coming soon")}
            />
            <View className="h-px bg-[#111111] mx-4" />
            <SettingRow
              icon={<Trash2 size={16} color="#ef4444" />}
              label="Reset Alliance"
              destructive
              onPress={() => setResetVisible(true)}
            />
          </View>
        </View>

        {/* Version */}
        <View className="items-center py-4">
          <Text className="text-[#333333] text-xs">MSTRMND Alliance v1.0.0</Text>
        </View>
      </ScrollView>

      <ConfirmDialog
        visible={resetVisible}
        onClose={() => setResetVisible(false)}
        onConfirm={() => {
          setResetVisible(false);
          toast.error("Alliance reset");
        }}
        title="Reset Alliance?"
        description="This will remove all agent configurations, chat history, and preferences. This action cannot be undone."
        confirmLabel="Reset"
      />
    </View>
  );
}
