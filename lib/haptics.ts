import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

/** Haptics are native-only and must never throw into a press handler. */
const enabled = Platform.OS === "ios" || Platform.OS === "android";

function run(fn: () => Promise<void>) {
  if (!enabled) return;
  fn().catch(() => {});
}

export const haptics = {
  /** Primary action committed (send, connect, enter). */
  primary: () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  /** A switch or segmented selection changed. */
  selection: () => run(() => Haptics.selectionAsync()),
  /** A destructive action was confirmed. */
  destructive: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
  success: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  error: () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
};
