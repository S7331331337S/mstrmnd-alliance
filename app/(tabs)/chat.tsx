import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowUp, Bot, Cpu } from "lucide-react-native";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { MOCK_AGENTS } from "@/constants/agents";
import { runTurn } from "@/lib/agent-client";
import { backendLabel, isBackendConfigured } from "@/lib/config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentId?: string;
  timestamp: Date;
  streaming?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello. I'm Axiom, your lead strategist. The alliance is standing by. What's our objective today?",
    agentId: "1",
    timestamp: new Date(),
  },
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const listRef = useRef<FlatList>(null);
  const activeAgent = MOCK_AGENTS[0];

  // The eve session id, kept across turns so the conversation is continuous.
  const sessionRef = useRef<string | null>(null);
  // Live whenever a backend URL is configured — Vercel, a container, a laptop.
  // Unconfigured, the screen runs the local demo instead of guessing a host.
  const isLive = isBackendConfigured();

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

    /** Insert or replace the assistant reply as its text accumulates. */
    const upsertReply = (content: string, streaming: boolean) => {
      setMessages((prev) => {
        const reply: Message = {
          id: replyId,
          role: "assistant",
          content,
          agentId: "1",
          timestamp: new Date(),
          streaming,
        };
        const index = prev.findIndex((m) => m.id === replyId);
        if (index === -1) return [...prev, reply];
        const next = [...prev];
        next[index] = reply;
        return next;
      });
    };

    if (!isLive) {
      // Demo mode — no backend configured.
      const responses = [
        "Understood. Analyzing the request...",
        "I've processed your input and formulated a comprehensive strategy. Here's my assessment:\n\n1. The primary objective is clear and well-defined.\n2. I recommend coordinating with Cipher for technical implementation.\n3. Nova can handle the research phase in parallel.\n\nShall I activate the full alliance protocol?",
      ];
      setTimeout(() => {
        upsertReply(responses[Math.floor(Math.random() * responses.length)], false);
        setIsStreaming(false);
      }, 1500);
      return;
    }

    try {
      const { sessionId } = await runTurn(prompt, {
        sessionId: sessionRef.current ?? undefined,
        onText: (text) => upsertReply(text, true),
        onDone: (text) => upsertReply(text || "(no response)", false),
      });
      sessionRef.current = sessionId;
    } catch (error) {
      upsertReply(
        error instanceof Error ? error.message : "The alliance is unreachable.",
        false,
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.role === "user";
    const agent = item.agentId ? MOCK_AGENTS.find((a) => a.id === item.agentId) : null;

    return (
      <View className={`flex-row gap-3 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {!isUser && agent && (
          <Avatar initials={agent.avatar} size="sm" status={agent.status} />
        )}
        {isUser && (
          <View className="w-8 h-8 rounded-xl bg-[#1a1a1a] items-center justify-center">
            <Text className="text-white text-xs font-bold">ME</Text>
          </View>
        )}
        <View className={`max-w-[78%] gap-1 ${isUser ? "items-end" : "items-start"}`}>
          {!isUser && agent && (
            <Text className="text-[#52525b] text-xs ml-1">{agent.name}</Text>
          )}
          <View
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? "bg-[#8b5cf6] rounded-tr-sm"
                : "bg-[#111111] border border-[#1a1a1a] rounded-tl-sm"
            }`}
          >
            <Text className={`text-sm leading-5 ${isUser ? "text-white" : "text-[#e4e4e7]"}`}>
              {item.content}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
      style={{ paddingTop: insets.top }}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="flex-row items-center gap-3 px-5 py-3 border-b border-[#111111]">
        <Avatar initials={activeAgent.avatar} size="sm" status={activeAgent.status} />
        <View className="flex-1">
          <Text className="text-white text-sm font-semibold">{activeAgent.name}</Text>
          <Text className="text-[#52525b] text-xs">{activeAgent.role}</Text>
        </View>
        <Badge label={activeAgent.status} variant={activeAgent.status as any} dot />
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 20, paddingBottom: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          isStreaming ? (
            <View className="flex-row gap-3 mb-4">
              <Avatar initials={activeAgent.avatar} size="sm" status="thinking" />
              <View className="bg-[#111111] border border-[#1a1a1a] rounded-2xl rounded-tl-sm px-4 py-3">
                <Spinner size="small" />
              </View>
            </View>
          ) : null
        }
      />

      {/* Input */}
      <View className="px-4 pb-4 pt-2 gap-2" style={{ paddingBottom: insets.bottom + 8 }}>
        <View className="flex-row items-end gap-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl px-4 py-2">
          <TextInput
            placeholder="Message the alliance..."
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
            className={`w-8 h-8 rounded-xl items-center justify-center mb-1 ${
              input.trim() && !isStreaming ? "bg-[#8b5cf6]" : "bg-[#1a1a1a]"
            }`}
          >
            <ArrowUp size={16} color={input.trim() && !isStreaming ? "#ffffff" : "#52525b"} />
          </Pressable>
        </View>
        <Text className="text-[#333333] text-xs text-center">
          MSTRMND Alliance · {isLive ? backendLabel() : "demo mode"}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
