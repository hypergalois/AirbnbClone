import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Listings from "@/components/Listings";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ExploreHeader from "@/components/ExploreHeader";

const index = () => {
  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Listings />
      <ListingsBottomSheet />
    </View>
  );
};

export default index;
