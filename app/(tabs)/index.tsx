import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import Listings from "@/components/Listings";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ExploreHeader from "@/components/ExploreHeader";

const index = () => {
  const [category, setCategory] = React.useState("Tiny homes");

  const onCategoryChanged = (category: string) => {
    console.log("category changed", category);
    setCategory(category);
  };

  useEffect(() => {
    console.log("reload listings");
  }, [category]);

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />
      <Listings listings={[]} category={category} />
      <ListingsBottomSheet />
    </View>
  );
};

export default index;
