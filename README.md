# MSTRMND Alliance

> A premium multi-agent companion app for iOS/Android — monochromatic, dark mode first.

## Stack

- **Expo SDK 57** + `expo-router` v5 (file-based routing)
- **NativeWind v4** — Tailwind CSS for React Native (dark mode first)
- **TypeScript**
- **react-native-reanimated** + **react-native-gesture-handler** — animations
- **lucide-react-native** — icons
- **sonner-native** — toast notifications
- **@shopify/flash-list** — performant lists

## Design System

Pure monochromatic palette — black backgrounds, white text, violet accent (#8b5cf6). Vercel/iOS aesthetic with clean spacing and subtle borders.

## Getting Started

```bash
# Install dependencies
npm install

# Start Metro dev server (Expo Go)
npx expo start

# Generate native projects
npx expo prebuild

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

## Backend (hosting-agnostic)

The app talks to the MSTRMND OS agent runtime over the eve HTTP protocol
(`/eve/v1/*`) at a **configured origin**. No deployment domain is compiled into
the bundle, so the backend can move between Vercel, a container (ECS, Cloud Run,
Fly, Railway, a VPS), or a laptop on the same network without touching app code.

```bash
cp .env.example .env
# EXPO_PUBLIC_MSTRMND_API_URL=https://os.mstrmnd.example
```

Unset, the app runs in **demo mode** against local mock data rather than
guessing a host. The chat footer shows which of the two is active.

- `lib/config.ts` — resolves the base URL; the only place a host is named.
- `lib/agent-client.ts` — creates sessions, streams NDJSON turns, sends
  follow-ups, cancels turns. Streams incrementally through `expo/fetch` and
  falls back to a single-shot read where response streaming is unavailable.

The self-host path for the backend itself is documented in `mstrmnd-core`
(`docs/portability.md`).

## Structure

```
app/
  _layout.tsx          # Root layout
  onboarding.tsx       # 3-step onboarding
  (tabs)/
    index.tsx          # Home — Agent Dashboard
    agents.tsx         # Agent Gallery + search/filter
    chat.tsx           # Chat session
    settings.tsx       # Settings
  agent/[id].tsx       # Agent detail

components/
  ui/                  # Button, Card, Badge, Avatar, Input, Sheet, Dialog, Spinner, Tabs
  layout/              # Header, SafeArea
  modals/              # AgentModal, ConfirmDialog, CommandPalette

constants/
  agents.ts            # Agent types and mock data

lib/
  config.ts            # Backend origin (EXPO_PUBLIC_MSTRMND_API_URL)
  agent-client.ts      # eve HTTP protocol client — sessions + NDJSON streaming
```
