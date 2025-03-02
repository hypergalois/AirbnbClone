import { View, Text } from "react-native";
import React from "react";

interface Props {
  listings: Array<any>;
  category: string;
}

const Listings = ({ listings, category }: Props) => {
  React.useEffect(() => {
    console.log("reload listings", listings.length);
  }, [category]);

  return (
    <View>
      <Text>Listings</Text>
    </View>
  );
};

export default Listings;
