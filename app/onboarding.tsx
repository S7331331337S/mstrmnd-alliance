import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowRight, Bot, BrainCircuit, Layers, Zap } from "lucide-react-native";
import { Button } from "@/components/ui/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const STEPS = [
  {
    icon: <BrainCircuit size={48} color="#8b5cf6" />,
    title: "Multi-Agent\nIntelligence",
    description:
      "Deploy a coordinated alliance of specialized AI agents, each with unique capabilities working in concert.",
    accent: "#8b5cf6",
  },
  {
    icon: <Layers size={48} color="#3b82f6" />,
    title: "Orchestrated\nWorkflows",
    description:
      "Axiom coordinates your agents automatically, routing tasks to the right specialist at the right time.",
    accent: "#3b82f6",
  },
  {
    icon: <Zap size={48} color="#f59e0b" />,
    title: "Ready to\nDeploy",
    description:
      "Your alliance is pre-configured with 6 elite agents. Activate them and start building at the speed of thought.",
    accent: "#f59e0b",
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goNext = () => {
    if (step < STEPS.length - 1) {
      Animated.timing(slideAnim, {
        toValue: -(step + 1) * SCREEN_WIDTH,
        duration: 350,
        useNativeDriver: true,
      }).start();
      setStep(step + 1);
    } else {
      router.replace("/(tabs)");
    }
  };

  const current = STEPS[step];

  return (
    <View
      className="flex-1 bg-black"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}
    >
      {/* Skip */}
      <View className="flex-row justify-end px-5 pt-4">
        <Pressable onPress={() => router.replace("/(tabs)")}>
          <Text className="text-[#52525b] text-sm">Skip</Text>
        </Pressable>
      </View>

      {/* Slides */}
      <View className="flex-1 overflow-hidden">
        <Animated.View
          style={{
            flexDirection: "row",
            width: SCREEN_WIDTH * STEPS.length,
            transform: [{ translateX: slideAnim }],
          }}
        >
          {STEPS.map((s, i) => (
            <View
              key={i}
              style={{ width: SCREEN_WIDTH }}
              className="flex-1 items-center justify-center px-10 gap-8"
            >
              {/* Icon container */}
              <View
                className="w-24 h-24 rounded-3xl items-center justify-center"
                style={{ backgroundColor: `${s.accent}15`, borderWidth: 1, borderColor: `${s.accent}30` }}
              >
                {s.icon}
              </View>

              {/* Text */}
              <View className="items-center gap-3">
                <Text className="text-white text-3xl font-bold text-center leading-tight">
                  {s.title}
                </Text>
                <Text className="text-[#71717a] text-base text-center leading-6">
                  {s.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Bottom area */}
      <View className="px-8 gap-6">
        {/* Progress dots */}
        <View className="flex-row items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <View
              key={i}
              className={`rounded-full ${i === step ? "w-6 h-1.5" : "w-1.5 h-1.5"}`}
              style={{ backgroundColor: i === step ? current.accent : "#222222" }}
            />
          ))}
        </View>

        {/* CTA */}
        <Button
          variant="accent"
          size="lg"
          fullWidth
          onPress={goNext}
        >
          {step < STEPS.length - 1 ? "Continue" : "Enter the Alliance"}
        </Button>
      </View>
    </View>
  );
}
