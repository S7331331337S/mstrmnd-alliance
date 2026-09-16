import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/** Same key as Board (`apps/board` settings-store). */
export const TOKEN_KEY = "mstrmnd.os.session";

let cachedToken: string | null = null;
let hydrated = false;

/**
 * SecureStore is unavailable on web; AsyncStorage (localStorage) is the
 * preview fallback — same tradeoff as Board.
 */
async function readSecret(key: string): Promise<string | null> {
  try {
    if (Platform.OS === "web") return await AsyncStorage.getItem(key);
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function writeSecret(key: string, value: string | null): Promise<void> {
  try {
    if (Platform.OS === "web") {
      if (value) await AsyncStorage.setItem(key, value);
      else await AsyncStorage.removeItem(key);
      return;
    }
    if (value) await SecureStore.setItemAsync(key, value);
    else await SecureStore.deleteItemAsync(key);
  } catch {
    // Storage failure shouldn't crash the app; the secret just won't persist.
  }
}

export function emailFromJwt(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(globalThis.atob(padded)) as { email?: unknown };
    return typeof json.email === "string" ? json.email : null;
  } catch {
    return null;
  }
}

/** Load the persisted OS session JWT into memory (call once on app mount). */
export async function hydrateSession(): Promise<void> {
  if (hydrated) return;
  cachedToken = await readSecret(TOKEN_KEY);
  hydrated = true;
}

/** In-memory session JWT after hydrate / set. */
export function getSessionToken(): string | null {
  return cachedToken;
}

/** Persist (or clear) the OS session JWT. */
export async function setSessionToken(token: string | null): Promise<void> {
  const next = token?.trim() || null;
  cachedToken = next;
  hydrated = true;
  await writeSecret(TOKEN_KEY, next);
}

export type SignInResult = {
  token: string;
  email: string | null;
};

/**
 * Sign in to MSTRMND OS — same scheme as Board:
 * POST `{os}/api/auth/signin` with email/password + `x-mstrmnd-client: alliance`.
 */
export async function signInToOs(
  osBaseUrl: string,
  email: string,
  password: string,
): Promise<SignInResult> {
  const base = osBaseUrl.trim().replace(/\/+$/, "");
  if (!base) throw new Error("OS URL is required");

  const response = await fetch(`${base}/api/auth/signin`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-mstrmnd-client": "alliance",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
      client: "alliance",
    }),
  });

  const body = (await response.json().catch(() => null)) as
    | { error?: string; token?: string; user?: { email?: string } }
    | null;

  if (!response.ok || !body?.token) {
    throw new Error(
      body?.error || "Could not sign in. Check the OS URL and credentials.",
    );
  }

  const token = body.token;
  await setSessionToken(token);
  return {
    token,
    email: body.user?.email ?? emailFromJwt(token) ?? email.trim(),
  };
}
