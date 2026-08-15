// Agent data types
export type AgentStatus = "active" | "idle" | "thinking" | "error";
export type AgentCapability = "reasoning" | "coding" | "research" | "creative" | "analysis" | "planning";

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  capabilities: AgentCapability[];
  model: string;
  messagesCount: number;
  successRate: number;
  avatar: string;
}

export interface Message {
  id: string;
  agentId: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// Mock agents
export const MOCK_AGENTS: Agent[] = [
  {
    id: "1",
    name: "Axiom",
    role: "Lead Strategist",
    description: "Coordinates multi-agent workflows and high-level planning",
    status: "active",
    capabilities: ["reasoning", "planning", "analysis"],
    model: "gpt-4o",
    messagesCount: 1284,
    successRate: 98,
    avatar: "AX",
  },
  {
    id: "2",
    name: "Cipher",
    role: "Code Architect",
    description: "Full-stack engineering, code review, and system design",
    status: "active",
    capabilities: ["coding", "analysis", "reasoning"],
    model: "claude-3-5-sonnet",
    messagesCount: 934,
    successRate: 96,
    avatar: "CI",
  },
  {
    id: "3",
    name: "Nova",
    role: "Research Analyst",
    description: "Deep research, fact-checking, and knowledge synthesis",
    status: "thinking",
    capabilities: ["research", "analysis", "reasoning"],
    model: "gpt-4o",
    messagesCount: 721,
    successRate: 94,
    avatar: "NV",
  },
  {
    id: "4",
    name: "Muse",
    role: "Creative Director",
    description: "Brand voice, content creation, and creative ideation",
    status: "idle",
    capabilities: ["creative", "reasoning"],
    model: "claude-3-5-sonnet",
    messagesCount: 512,
    successRate: 91,
    avatar: "MU",
  },
  {
    id: "5",
    name: "Sigma",
    role: "Data Analyst",
    description: "Statistical analysis, data pipelines, and insights",
    status: "idle",
    capabilities: ["analysis", "coding", "research"],
    model: "gpt-4o",
    messagesCount: 388,
    successRate: 97,
    avatar: "SG",
  },
  {
    id: "6",
    name: "Orion",
    role: "System Architect",
    description: "Infrastructure, DevOps, and scalability planning",
    status: "error",
    capabilities: ["planning", "coding", "analysis"],
    model: "claude-3-5-sonnet",
    messagesCount: 267,
    successRate: 89,
    avatar: "OR",
  },
];

export const STATUS_COLOR: Record<AgentStatus, string> = {
  active: "#22c55e",
  idle: "#52525b",
  thinking: "#f59e0b",
  error: "#ef4444",
};

export const CAPABILITY_LABELS: Record<AgentCapability, string> = {
  reasoning: "Reasoning",
  coding: "Coding",
  research: "Research",
  creative: "Creative",
  analysis: "Analysis",
  planning: "Planning",
};
