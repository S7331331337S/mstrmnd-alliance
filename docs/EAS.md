# EAS notes (Alliance)

- Expo owner: `mstrmndgo`; project `mstrmnd-alliance` (`extra.eas.projectId` in `app.json`). The project already exists and is GitHub-linked; do not run `eas init`.
- Bundle ID / Android package: `com.mstrmnd.alliance` (unchanged). URL scheme: `mstrmnd-alliance`.
- **Android signing: use an EAS-managed keystore.** On the first `eas build -p android`, let EAS generate it, then back it up with `eas credentials`. Never commit keystores, `.p8` keys or service-account JSON.
- iOS signing and Play service account are not set up yet (no credentials on the account). iOS is blocked on the Apple Developer Program License Agreement.
- No builds or submissions are run from CI.
