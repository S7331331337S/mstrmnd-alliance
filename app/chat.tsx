import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowUp, Paperclip } from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { Avatar } from "@/components/ui/Avatar";
import { Spinner } from "@/components/ui/Spinner";
import { OS_ROSTER } from "@/constants/agents";
import { runTurn } from "@/lib/agent-client";
import { backendLabel, isBackendConfigured } from "@/lib/config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachment?: string;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { agentId } = useLocalSearchParams<{ agentId?: string }>();
  const agent = OS_ROSTER.find((a) => a.id === agentId) ?? OS_ROSTER[0];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Q2 Performance is attached. Ask for segments, drivers, or a follow-up pack.",
      timestamp: new Date(),
      attachment: "Q2 Performance.pdf",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const listRef = useRef<FlatList>(null);
  const sessionRef = useRef<string | null>(null);
  const isLive = isBackendConfigured();

  const onlineLabel = useMemo(
    () => (agent.status === "active" || agent.status === "thinking" ? "Online" : "Offline"),
    [agent.status],
  );

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;
    const prompt = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    const replyId = (Date.now() + 1).toString();

    const upsertReply = (content: string) => {
      setMessages((prev) => {
        const reply: Message = { id: replyId, role: "assistant", content, timestamp: new Date() };
        const index = prev.findIndex((m) => m.id === replyId);
        if (index === -1) return [...prev, reply];
        const next = [...prev];
        next[index] = reply;
        return next;
      });
    };

    if (!isLive) {
      setTimeout(() => {
        upsertReply(
          prompt.toLowerCase().includes("segment")
            ? "Top performing segments: Enterprise Mid-Market (+18%), Product-led Expansion (+14%), and Partner Assist (+9%)."
            : "Logged. I can pull the source pack, compare to last quarter, or open a workflow.",
        );
        setIsStreaming(false);
      }, 900);
      return;
    }

    try {
      const { sessionId } = await runTurn(prompt, {
        sessionId: sessionRef.current ?? undefined,
        onText: upsertReply,
        onDone: (text) => upsertReply(text || "(no response)"),
      });
      sessionRef.current = sessionId;
    } catch (error) {
      upsertReply(error instanceof Error ? error.message : "The operating layer is unreachable.");
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <Header title="Agent Chat" subtitle={`${agent.name} · ${onlineLabel}`} showBack />
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isUser = item.role === "user";
          return (
            <View className={`flex-row gap-3 mb-4 ${isUser ? "flex-row-reverse" : ""}`}>
              {!isUser && <Avatar initials={agent.avatar} size="sm" status={agent.status} />}
              <View className={`max-w-[78%] gap-2 ${isUser ? "items-end" : "items-start"}`}>
                <View
                  className={`rounded-2xl px-4 py-3 ${
                    isUser ? "bg-white" : "bg-[#111111] border border-[#1a1a1a]"
                  }`}
                >
                  <Text className={`text-sm leading-5 ${isUser ? "text-black" : "text-[#e4e4e7]"}`}>
                    {item.content}
                  </Text>
                </View>
                {item.attachment && (
                  <View className="flex-row items-center gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl px-3 py-2">
                    <Paperclip size={12} color="#a1a1aa" />
                    <Text className="text-[#a1a1aa] text-xs">{item.attachment}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          isStreaming ? (
            <View className="flex-row gap-3 mb-4">
              <Avatar initials={agent.avatar} size="sm" status="thinking" />
              <View className="bg-[#111111] border border-[#1a1a1a] rounded-2xl px-4 py-3">
                <Spinner size="small" />
              </View>
            </View>
          ) : null
        }
      />
      <View className="px-4 pt-2" style={{ paddingBottom: insets.bottom + 8 }}>
        <View className="flex-row items-end gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl px-4 py-2">
          <Paperclip size={16} color="#52525b" />
          <TextInput
            placeholder="Ask anything..."
            placeholderTextColor="#52525b"
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={2000}
            className="flex-1 text-white text-sm py-1"
            style={{ color: "#ffffff", maxHeight: 120 }}
          />
          <Pressable
            onPress={sendMessage}
            disabled={!input.trim() || isStreaming}
            className={`w-8 h-8 rounded-full items-center justify-center mb-0.5 ${
              input.trim() && !isStreaming ? "bg-white" : "bg-[#1a1a1a]"
            }`}
          >
            <ArrowUp size={16} color={input.trim() && !isStreaming ? "#000000" : "#52525b"} />
          </Pressable>
        </View>
        <Text className="text-[#333333] text-xs text-center mt-2">
          {isLive ? backendLabel() : "demo mode"}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}