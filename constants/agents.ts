/**
 * OS roster stub — static seats aligned to Mastermind OS / Board.
 *
 * Mirrors mstrmnd-os Alliance minds (Maestro + specialists) and the Board
 * seats used by apps/board (`architect` … `chair`). Not a live fetch yet —
 * swap for `/eve` or Board API when that surface ships. UI should treat this
 * as the operating roster, not demo filler.
 */

export type AgentStatus = "active" | "idle" | "thinking" | "error";
export type AgentCapability =
  | "reasoning"
  | "coding"
  | "research"
  | "creative"
  | "analysis"
  | "planning";

export type AgentSeat =
  | "maestro"
  | "researcher"
  | "critic"
  | "memory-keeper"
  | "architect"
  | "operator"
  | "closer"
  | "contrarian"
  | "visionary"
  | "quant"
  | "storyteller"
  | "chair";

export interface Agent {
  id: AgentSeat;
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

/** Static OS roster stub (Maestro + Board seats). */
export const OS_ROSTER: Agent[] = [
  {
    id: "maestro",
    name: "Maestro",
    role: "Root orchestrator",
    description:
      "Decomposes goals, pulls Third-Mind context, delegates to specialists, and executes.",
    status: "active",
    capabilities: ["planning", "reasoning", "analysis"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "MA",
  },
  {
    id: "researcher",
    name: "Researcher",
    role: "Evidence & synthesis",
    description:
      "Deep research and source synthesis; returns structured evidence briefs with confidence.",
    status: "idle",
    capabilities: ["research", "analysis", "reasoning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "RS",
  },
  {
    id: "critic",
    name: "Critic",
    role: "Adversarial review",
    description:
      "Surfaces risks and returns a prioritized list of improvements before the room commits.",
    status: "idle",
    capabilities: ["analysis", "reasoning", "planning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "CR",
  },
  {
    id: "memory-keeper",
    name: "Memory-Keeper",
    role: "Third-Mind curator",
    description:
      "Decides what is worth remembering and writes durable observations into the Third-Mind.",
    status: "idle",
    capabilities: ["research", "reasoning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "MK",
  },
  {
    id: "architect",
    name: "The Architect",
    role: "Systems & feasibility",
    description:
      "Can it actually be built, and what breaks first? Dependencies, failure modes, one-way doors.",
    status: "active",
    capabilities: ["coding", "analysis", "planning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "AR",
  },
  {
    id: "operator",
    name: "The Operator",
    role: "Execution & sequencing",
    description:
      "What ships Monday, and who owns it? Converts ambition into dated, owned deliverables.",
    status: "active",
    capabilities: ["planning", "reasoning", "analysis"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "OP",
  },
  {
    id: "closer",
    name: "The Closer",
    role: "Revenue & demand",
    description:
      "Who pays, how much, and what makes them say yes? Starts from the buyer, not the product.",
    status: "idle",
    capabilities: ["creative", "analysis", "planning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "CL",
  },
  {
    id: "contrarian",
    name: "The Contrarian",
    role: "Adversarial review",
    description:
      "Here is how this fails. Names the load-bearing assumption nobody has tested.",
    status: "idle",
    capabilities: ["analysis", "reasoning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "CN",
  },
  {
    id: "visionary",
    name: "The Visionary",
    role: "Ambition & horizon",
    description:
      "What does this look like if it works completely? Keeps the 10x option open.",
    status: "idle",
    capabilities: ["creative", "planning", "reasoning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "VS",
  },
  {
    id: "quant",
    name: "The Quant",
    role: "Numbers & risk",
    description:
      "Show the unit economics. Converts proposals into money, time, and expected value.",
    status: "idle",
    capabilities: ["analysis", "reasoning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "QT",
  },
  {
    id: "storyteller",
    name: "The Storyteller",
    role: "Narrative & brand",
    description:
      "If you can't say it in one line, you don't have it. Positioning as a product decision.",
    status: "idle",
    capabilities: ["creative", "research", "planning"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "ST",
  },
  {
    id: "chair",
    name: "The Chair",
    role: "Synthesis & decision",
    description:
      "Closes the room with a call: the decision, the real disagreement, and three actions this week.",
    status: "thinking",
    capabilities: ["planning", "reasoning", "analysis"],
    model: "mstrmnd-os",
    messagesCount: 0,
    successRate: 100,
    avatar: "CH",
  },
];

/** @deprecated Prefer OS_ROSTER — kept so older imports keep compiling during the cutover. */
export const MOCK_AGENTS = OS_ROSTER;

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

export function getAgent(id: string): Agent | undefined {
  return OS_ROSTER.find((a) => a.id === id);
}