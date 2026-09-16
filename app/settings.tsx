import React, { useCallback, useEffect, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bell,
  CreditCard,
  Info,
  Link2,
  Lock,
  Palette,
  Settings2,
  Shield,
} from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { ListRow } from "@/components/brand/ListRow";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { apiBaseUrl } from "@/lib/config";
import {
  emailFromJwt,
  getSessionToken,
  setSessionToken,
  signInToOs,
} from "@/lib/session";
import { toast } from "sonner-native";

const DEFAULT_OS = "https://mstrmnd-core.vercel.app";

const ROWS = [
  { label: "General", Icon: Settings2 },
  { label: "Appearance", Icon: Palette },
  { label: "Notifications", Icon: Bell },
  { label: "Privacy", Icon: Shield },
  { label: "Security", Icon: Lock },
  { label: "Billing", Icon: CreditCard },
  { label: "About", Icon: Info },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [draftUrl, setDraftUrl] = useState(apiBaseUrl() ?? DEFAULT_OS);
  const [draftEmail, setDraftEmail] = useState("");
  const [draftPassword, setDraftPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(() => {
    const t = getSessionToken();
    setToken(t);
    setEmail(t ? emailFromJwt(t) : null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const connect = async () => {
    setSaving(true);
    try {
      const result = await signInToOs(draftUrl, draftEmail, draftPassword);
      setDraftPassword("");
      setToken(result.token);
      setEmail(result.email);
      toast.success("Connected to MSTRMND OS");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not reach MSTRMND OS";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const disconnect = async () => {
    await setSessionToken(null);
    setToken(null);
    setEmail(null);
    setDraftPassword("");
    toast.info("Disconnected");
  };

  const hostLabel = (() => {
    try {
      return new URL(draftUrl.trim() || DEFAULT_OS).host;
    } catch {
      return draftUrl || DEFAULT_OS;
    }
  })();

  const canConnect =
    draftUrl.trim().length >= 8 &&
    draftEmail.trim().length >= 3 &&
    draftPassword.length >= 1 &&
    !saving;

  return (
    <View className="flex-1 bg-black">
      <Header title="Settings" showBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 24 }}
      >
        <Text className="text-[#71717a] text-xs uppercase tracking-widest mb-2 px-1">
          Connection
        </Text>
        <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden mb-6 p-4 gap-3">
          {token ? (
            <>
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-[#111111] border border-[#1a1a1a] items-center justify-center">
                  <Link2 size={16} color="#e4e4e7" />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-sm font-medium">
                    MSTRMND OS connected
                  </Text>
                  <Text className="text-[#71717a] text-xs mt-0.5">
                    {email ?? "Session active"}
                  </Text>
                  <Text className="text-[#52525b] text-xs mt-0.5">{hostLabel}</Text>
                </View>
              </View>
              <Button variant="ghost" size="sm" onPress={() => void disconnect()}>
                Disconnect
              </Button>
            </>
          ) : (
            <>
              <Text className="text-[#a1a1aa] text-sm leading-5">
                Sign in to MSTRMND OS to send Bearer auth on{" "}
                <Text className="text-[#e4e4e7]">/eve/v1/*</Text>. Without a
                session, live agent turns may 401.
              </Text>
              <Input
                label="OS URL"
                value={draftUrl}
                onChangeText={setDraftUrl}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                placeholder={DEFAULT_OS}
              />
              <Input
                label="Email"
                value={draftEmail}
                onChangeText={setDraftEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="you@example.com"
              />
              <Input
                label="Password"
                value={draftPassword}
                onChangeText={setDraftPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                placeholder="Password"
              />
              <Button
                size="sm"
                loading={saving}
                disabled={!canConnect}
                onPress={() => void connect()}
              >
                Connect
              </Button>
              <Text className="text-[#52525b] text-xs leading-4">
                {Platform.OS === "web"
                  ? "On web the session token is kept in browser storage. Prefer the native app for anything real."
                  : "Stored in the device keychain and sent only to your MSTRMND OS host."}
              </Text>
            </>
          )}
        </View>

        <Text className="text-[#71717a] text-xs uppercase tracking-widest mb-2 px-1">
          More
        </Text>
        <View className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          {ROWS.map((row, i) => (
            <ListRow
              key={row.label}
              icon={<row.Icon size={16} color="#e4e4e7" />}
              label={row.label}
              onPress={() => toast.info("Coming soon")}
              last={i === ROWS.length - 1}
            />
          ))}
        </View>
        <Text className="text-[#333333] text-xs text-center mt-8">MSTRMND v1.0.0</Text>
      </ScrollView>
    </View>
  );
}
