import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Stack } from "expo-router";
import Listings from "@/components/Listings";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import ListingsMap from "@/components/ListingsMap";
import ExploreHeader from "@/components/ExploreHeader";
import listingData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";

const index = () => {
  const [category, setCategory] = React.useState("Tiny homes");
  const items = useMemo(() => listingData, []);
  const geoItems = useMemo(() => listingsDataGeo, []);

  const onCategoryChanged = (category: string) => {
    console.log("category changed", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 70 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}

      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default index;
