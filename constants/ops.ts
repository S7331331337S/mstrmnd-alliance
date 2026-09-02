export type AutomationStatus = "active" | "draft" | "archived";

export interface Automation {
  id: string;
  name: string;
  description: string;
  status: AutomationStatus;
  enabled: boolean;
}

export interface KnowledgeFolder {
  id: string;
  name: string;
  count: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  ago: string;
}

export interface InsightCategory {
  label: string;
  pct: number;
}

export const ACTIVITY: ActivityItem[] = [
  { id: "1", title: "Workflow completed", detail: "Lead Enrichment finished 248 records", ago: "2m ago" },
  { id: "2", title: "Agent response", detail: "Data Analyst delivered Q2 Performance", ago: "14m ago" },
  { id: "3", title: "Automation enabled", detail: "Daily Report is now active", ago: "1h ago" },
  { id: "4", title: "Knowledge updated", detail: "Playbooks gained 3 new docs", ago: "3h ago" },
];

export const AUTOMATIONS: Automation[] = [
  { id: "1", name: "Lead Enrichment", description: "Enrich inbound leads from CRM", status: "active", enabled: true },
  { id: "2", name: "Daily Report", description: "Compile overnight ops signals", status: "active", enabled: true },
  { id: "3", name: "Data Sync", description: "Mirror warehouse to workspace", status: "active", enabled: true },
  { id: "4", name: "Inbox Triage", description: "Route agent mail by intent", status: "draft", enabled: false },
  { id: "5", name: "Churn Watch", description: "Flag at-risk accounts weekly", status: "archived", enabled: false },
];

export const KNOWLEDGE: KnowledgeFolder[] = [
  { id: "1", name: "Company Docs", count: 128 },
  { id: "2", name: "Market Research", count: 86 },
  { id: "3", name: "Playbooks", count: 42 },
  { id: "4", name: "Model Cards", count: 19 },
];

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  { label: "Operations", pct: 42 },
  { label: "Marketing", pct: 28 },
  { label: "Product", pct: 18 },
  { label: "Finance", pct: 12 },
];

export const SIGNAL_TREND = [42, 48, 45, 62, 58, 71, 68, 84, 79, 96, 88, 104];
