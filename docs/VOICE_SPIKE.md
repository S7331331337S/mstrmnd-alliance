# Voice spike — expo-gpt-live vs Alliance

Source skim: [davidmokos/expo-gpt-live](https://github.com/davidmokos/expo-gpt-live) (MIT, Expo SDK 57, GPT-Live-1 / OpenAI Realtime WebRTC).

## Stack fit vs `mstrmnd-alliance`

| Layer | expo-gpt-live | Alliance (main) | Fit |
| --- | --- | --- | --- |
| Expo / RN / React | 57 / 0.86 / 19.2.3 | 57 / 0.86 / 19.2.3 | Strong |
| Router | expo-router | expo-router | Strong |
| Storage | AsyncStorage | AsyncStorage + SecureStore | Strong |
| Native client | expo-dev-client (required) | expo-dev-client present | Strong |
| UI | `@expo/ui` + AI Elements Persona (Rive) | NativeWind + brand chrome | Partial — UX patterns reusable, visuals rewrite |
| Audio | `react-native-webrtc` + InCallManager | none | New native surface |
| Backend | OpenAI GPT-Live-1 + server token | Mastermind OS Bearer / eve | **Rewrite** |

Expo Go cannot run this template (WebRTC + Rive). Same constraint will apply to any Alliance voice path.

## Reusable vs rewrite

**Reusable (keep patterns / vendor carefully):**

- Call lifecycle + mute / transcript UX (`useLiveSession`, voice-control, transcript sheet)
- WebRTC + InCallManager full-duplex / iOS background-call behavior
- Provider-agnostic session state machine (idle → connecting → connected → error)
- Rive persona *idea* (swap to MSTRMND tokens; do not ship AI Elements as brand)

**Rewrite for Grok / xAI / Mastermind rails:**

- Server session mint (`gpt-live-1`, OpenAI SDP answer, `OPENAI_API_KEY`)
- Data-channel event protocol (`oai-events`)
- Auth (`API_TOKEN` local) → Alliance SecureStore session → `mstrmnd-core` Bearer
- Tool sideband / delegation models → eve / OS tools when we want Mastermind-backed voice
- Until xAI exposes a Live/WebRTC-equivalent API, OpenAI remains the only drop-in live backend

## Recommendation

**Spike PR inside Alliance** (this doc + `lib/voice` interface).

- Not bookmark-only — stack fit is high and Steele asked for a read with a ship path.
- Not a greenfield `mstrmnd-voice` product fork — avoids a second client runtime/identity; voice belongs on Alliance (Operator) or Labs later.
- Spike stays behind Settings / docs until SecureStore→Bearer dogfood is green and Fri grill is clear.

## First shippable slice (1–3 days)

1. **Day 0–1 (this PR):** docs + `lib/voice` transport/session types (provider-agnostic). No OpenAI key in client.
2. **Day 1–2:** optional native spike screen (dev-client only) wiring WebRTC deps; OpenAI Live behind `VoiceBackend = 'openai' | 'stub'`.
3. **Day 2–3:** auth handoff — reuse Alliance session JWT; never put provider keys in `EXPO_PUBLIC_*`.

Out of scope for slice 1: Grok Live (no public parity yet), Rive brand personas, production EAS voice profile, Client Zero demo.
