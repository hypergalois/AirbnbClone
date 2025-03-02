import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Stack } from "expo-router";
import Listings from "@/components/Listings";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ExploreHeader from "@/components/ExploreHeader";
import listingData from "@/assets/data/airbnb-listings.json";

const index = () => {
  const [category, setCategory] = React.useState("Tiny homes");
  const items = useMemo(() => listingData, []);

  const onCategoryChanged = (category: string) => {
    console.log("category changed", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
      <ListingsBottomSheet />
    </View>
  );
};

export default index;
