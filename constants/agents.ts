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

export const MOCK_AGENTS: Agent[] = [
  {
    id: "1",
    name: "Data Analyst",
    role: "Signals & performance",
    description: "Reads warehouse signals, scores segments, and ships Q-level performance packs.",
    status: "active",
    capabilities: ["analysis", "research", "reasoning"],
    model: "gpt-4o",
    messagesCount: 1284,
    successRate: 98,
    avatar: "DA",
  },
  {
    id: "2",
    name: "Content Strategist",
    role: "Narrative & campaigns",
    description: "Turns research into briefs, campaigns, and on-brand copy across channels.",
    status: "active",
    capabilities: ["creative", "planning", "research"],
    model: "claude-3-5-sonnet",
    messagesCount: 934,
    successRate: 96,
    avatar: "CS",
  },
  {
    id: "3",
    name: "Ops Orchestrator",
    role: "Workflows & routing",
    description: "Coordinates automations, agents, and handoffs across the operating layer.",
    status: "thinking",
    capabilities: ["planning", "reasoning", "analysis"],
    model: "gpt-4o",
    messagesCount: 721,
    successRate: 94,
    avatar: "OO",
  },
  {
    id: "4",
    name: "Knowledge Steward",
    role: "Store & retrieve",
    description: "Indexes company docs, playbooks, and research for grounded answers.",
    status: "idle",
    capabilities: ["research", "reasoning"],
    model: "claude-3-5-sonnet",
    messagesCount: 512,
    successRate: 91,
    avatar: "KS",
  },
  {
    id: "5",
    name: "Model Lab",
    role: "Train & evaluate",
    description: "Runs experiments, compares models, and publishes eval cards.",
    status: "idle",
    capabilities: ["analysis", "coding", "research"],
    model: "gpt-4o",
    messagesCount: 388,
    successRate: 97,
    avatar: "ML",
  },
  {
    id: "6",
    name: "Governance",
    role: "Control & compliance",
    description: "Enforces policy, access, and audit trails across the stack.",
    status: "error",
    capabilities: ["planning", "analysis"],
    model: "claude-3-5-sonnet",
    messagesCount: 267,
    successRate: 89,
    avatar: "GV",
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
