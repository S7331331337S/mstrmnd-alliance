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
```
