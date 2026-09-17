/**
 * Provider-agnostic voice session types for the Alliance voice spike.
 *
 * Inspired by davidmokos/expo-gpt-live (MIT) LiveSession / Transport shapes.
 * OpenAI GPT-Live-1 is one backend; Grok/xAI or Mastermind OS would implement
 * the same interfaces without leaking provider keys into the client.
 */

export type VoiceStatus = "idle" | "connecting" | "connected" | "error";

export type VoiceBackendId = "stub" | "openai-live";

export type VoiceSnapshot = {
  status: VoiceStatus;
  error: string | null;
  muted: boolean;
  inputLevel: number;
  outputLevel: number;
  elapsedSeconds: number;
  backend: VoiceBackendId;
};

export type VoiceEvent = {
  type: string;
  [key: string]: unknown;
};

export type VoiceTransport = {
  offer(): Promise<string>;
  answer(sdp: string): Promise<void>;
  send(event: VoiceEvent): boolean;
  setMuted(muted: boolean): void;
  close(): void;
};

export type VoiceTransportFactory = (handlers: {
  onEvent: (event: VoiceEvent) => void;
  onFailure: (message: string) => void;
}) => Promise<VoiceTransport>;

export type VoiceSessionAPI = {
  /** Mint or refresh a provider session; must run server-side (never EXPO_PUBLIC keys). */
  createSession(input: { voice?: string }): Promise<{ sessionId: string; answerSdp?: string }>;
  closeSession(sessionId: string): Promise<void>;
};

export const initialVoiceSnapshot = (backend: VoiceBackendId = "stub"): VoiceSnapshot => ({
  status: "idle",
  error: null,
  muted: false,
  inputLevel: 0,
  outputLevel: 0,
  elapsedSeconds: 0,
  backend,
});
