import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const Booking = () => {
  return (
    <BlurView intensity={100} style={{ flex: 1 }}>
      <SafeAreaView>
        <Text>Booking</Text>
      </SafeAreaView>
    </BlurView>
  );
};

export default Booking;
