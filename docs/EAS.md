# EAS notes (Alliance)

- Expo owner: `mstrmndgo`; project `mstrmnd-alliance` (`extra.eas.projectId` in `app.json`). The project already exists and is GitHub-linked; do not run `eas init`.
- Bundle ID / Android package: `com.mstrmnd.alliance` (unchanged). URL scheme: `mstrmnd-alliance`.
- **Android signing: use an EAS-managed keystore.** On the first `eas build -p android`, let EAS generate it, then back it up with `eas credentials`. Never commit keystores, `.p8` keys or service-account JSON.
- iOS signing and Play service account are not set up yet (no credentials on the account). iOS is blocked on the Apple Developer Program License Agreement.
- No builds or submissions are run from CI.

## OTA updates (EAS Update)

Configured with `expo-updates` (`updates.url` = `https://u.expo.dev/800d98e9-be77-462d-b031-c616ce7c5994`, `runtimeVersion: { policy: "appVersion" }`). Build profiles map to channels: `preview` → `preview`, `production` → `production` (`development` has no channel; it uses the dev client).

### First binary per channel is still required
An update can only be received by a binary that already embeds `expo-updates` and the channel. So before any OTA reaches a device, a signed build of each channel must be installed once (`eas build --profile preview|production`). That is blocked today on the iOS side: the Apple Developer Program License Agreement is not accepted, and we have neither an App Store Connect API key nor an interactive Apple sign-in on the EAS account. Android can use an EAS-managed keystore. Nothing here runs builds or submissions from CI.

### Publish an update
JS and asset changes only (no native code or dependency changes):

```
eas update --channel preview --message "what changed"
eas update --channel production --message "what changed"
```

Test on `preview` first, then publish the same commit to `production`. `eas update` is not run in CI; run it by hand.

### How `runtimeVersion` (appVersion) gates compatibility
With the `appVersion` policy the runtime version is the app's `version` in `app.json` (currently `1.0.0`). A binary only accepts updates published for its exact runtime version, so an update built from this repo reaches every binary with the same `version`. **Any change to native code, native dependencies, or Expo SDK requires bumping `version`** (and a new binary build), otherwise older binaries would receive JS that expects native modules they lack. Check with `npx expo-doctor` and `npx expo config --type public`. Note: `appVersion` does not detect native changes by itself; if you want that automatically, switch to the `fingerprint` policy later.

### Roll back
Either re-point the channel at a known-good update:

```
eas update:list --branch production          # find the good group id
eas update:republish --group <group-id> --destination-branch production
```

or send devices back to the update embedded in the binary:

```
eas update:rollback --branch production
```

(`eas update:rollback` is interactive and lets you choose between republishing the previous update and rolling back to the embedded one.)

### Expo Go
Expo Go ignores `expo-updates` for development, so `npx expo start` + Expo Go still works unchanged. Expo Go may log that `expo-updates` is not used; that is expected.
