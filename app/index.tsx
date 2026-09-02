import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [entered, setEntered] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("mstrmnd.entered").then((value) => {
      setEntered(value === "1");
    });
  }, []);

  if (entered === null) {
    return <View className="flex-1 bg-black" />;
  }

  return <Redirect href={entered ? "/(tabs)" : "/welcome"} />;
}
