import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

interface Props {
  listings: any;
}

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
      >
        {/* Render all our marker as usual */}
        {listings.features.map((item: any) => (
          <Marker
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.locateBtn} onPress={() => {}}>
        <Ionicons name="navigate" size={24} color={Colors.dark} />
      </TouchableOpacity>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});
