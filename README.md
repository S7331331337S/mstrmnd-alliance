# MSTRMND Alliance

> A premium multi-agent companion app for iOS/Android — monochromatic, dark mode first.

## Stack

- **Expo SDK 57** + `expo-router` v5 (file-based routing)
- **Role:** mobile Operator client for Mastermind OS — not a separate product
- **NativeWind v4** — Tailwind CSS for React Native (dark mode first)
- **TypeScript**
- **react-native-reanimated** + **react-native-gesture-handler** — animations
- **lucide-react-native** — icons
- **sonner-native** — toast notifications
- **@shopify/flash-list** — performant lists
- **expo-secure-store** — OS session JWT on native (AsyncStorage on web)

## Design System

Pure monochromatic palette — platinum `#e8e2d0` over obsidian `#0a0a0b`. ONE accent only (matches mstrmnd-os). No second hue.

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

## Preview rails (Expo web / EAS)

Alliance preview is **Expo web** and **EAS**, not a dedicated Alliance Vercel host.

```bash
# Expo web (local browser preview)
npx expo start --web

# Static web export
npx expo export -p web

# EAS internal preview build
eas build --profile preview

# EAS Update (OTA) against a preview channel when configured
eas update --branch preview
```

### Retired host — do not use

`https://mstrmnd-alliance.vercel.app` is **dead** (`NOT_FOUND` / 404). It is **retired in docs only** — do not point traffic, env, or bookmarks at it. **No DNS work** is planned or required. Keep the OS origin at `https://mstrmnd-core.vercel.app`.

## Backend (hosting-agnostic)

The app talks to the MSTRMND OS agent runtime over the eve HTTP protocol
(`/eve/v1/*`) at a **configured origin**. No deployment domain is compiled into
the bundle, so the backend can move between Vercel, a container (ECS, Cloud Run,
Fly, Railway, a VPS), or a laptop on the same network without touching app code.

```bash
cp .env.example .env
# EXPO_PUBLIC_MSTRMND_API_URL=https://mstrmnd-core.vercel.app
```

Unset API URL, the app runs in **demo mode** against the local OS roster stub
rather than guessing a host. The chat footer shows which of the two is active.

### Auth (runtime OS session → Bearer)

mstrmnd-os verifies the same session JWT the web app puts in the
`mstrmnd_session` cookie — and also accepts `Authorization: Bearer <jwt>`
(see `mstrmnd-os/lib/session.ts`).

Alliance matches the **Board** pattern (`mstrmnd-core` `apps/board`):

1. Settings → Connect with OS URL + email + password
2. `POST {os}/api/auth/signin` with `x-mstrmnd-client: alliance` (+ `client: "alliance"` body)
3. Store JWT in **SecureStore** (native) / **AsyncStorage** (web) under `mstrmnd.os.session`
4. Send `Authorization: Bearer <jwt>` on every `/eve/v1/*` call

There is **no** `EXPO_PUBLIC_MSTRMND_SESSION` env-paste path. Cookie
`credentials: "include"` remains as a same-origin / web fallback only.

- `lib/session.ts` — hydrate / get / set token; `signInToOs`
- `lib/config.ts` — resolves the base URL; `sessionToken()` reads runtime only
- `lib/agent-client.ts` — creates sessions, streams NDJSON turns; attaches Bearer
  when a runtime session is present
- `constants/agents.ts` — **OS roster stub** (Maestro + Board seats). Static
  for now; not a live fetch

The self-host path for the backend itself is documented in `mstrmnd-core`
(`docs/portability.md`).

### Signed-in smoke checklist

- [ ] **OS:** sign in at https://mstrmnd-core.vercel.app/sign-in → session survives refresh
- [ ] **OS:** open `/cockpit` signed-in → renders (auth gate)
- [ ] **OS:** agents/workspace path signed-in (not blank mock)
- [ ] **Alliance:** Expo web or EAS preview → Settings Connect with same OS account → agents screen → chat hits `/eve/v1` with Bearer (not 401)
- [ ] Confirm `mstrmnd-alliance.vercel.app` still retired / not used

## Structure

```
app/
  _layout.tsx          # Root layout (hydrateSession on mount)
  onboarding.tsx       # 3-step onboarding
  (tabs)/
    index.tsx          # Home — Agent Dashboard
    agents.tsx         # Agent Gallery + search/filter
    chat.tsx           # Chat session
    settings.tsx       # Settings (OS Connect)
  agent/[id].tsx       # Agent detail

components/
  ui/                  # Button, Card, Badge, Avatar, Input, Sheet, Dialog, Spinner, Tabs
  layout/              # Header, SafeArea
  modals/              # AgentModal, ConfirmDialog, CommandPalette

constants/
  agents.ts            # Agent types + OS roster stub (Maestro / Board seats)

lib/
  session.ts           # Runtime OS session (SecureStore / AsyncStorage)
  config.ts            # Backend origin + runtime sessionToken()
  agent-client.ts      # eve HTTP client — Bearer auth, sessions + NDJSON streaming
```

## Voice spike (Labs)

See [`docs/VOICE_SPIKE.md`](docs/VOICE_SPIKE.md) and `lib/voice/` — Expo SDK 57 stack fit vs [expo-gpt-live](https://github.com/davidmokos/expo-gpt-live). OpenAI Live only today; Grok/xAI transport is a rewrite. Not in production nav until SecureStore→Bearer dogfood is green.
