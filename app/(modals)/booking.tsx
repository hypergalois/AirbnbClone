import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { places } from "@/assets/data/places";
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const Booking = () => {
  const router = useRouter();

  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const [selectedDate, setSelectedDate] = useState("Any week");
  const today = new Date().toISOString().substring(0, 10);

  const [groups, setGroups] = useState(guestsGroups);
  const [guestsSummary, setGuestsSummary] = useState("Add guests");

  const updateGuestsSummary = (newGroups: any) => {
    const totalGuests = newGroups.reduce(
      (sum: number, group: { count: number }) => sum + group.count,
      0
    );
    setGuestsSummary(totalGuests > 0 ? `${totalGuests} guests` : "Add guests");
  };

  const onClearAll = () => {
    setSelectedPlace(0);
    setSelectedDate("Any week");
    setGroups(guestsGroups);
    setGuestsSummary("Add guests");
    setOpenCard(0);
  };

  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/*  Where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(20)}
            exiting={FadeOut.duration(20)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewdData}>
              {places[selectedPlace].title}
            </Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 0 && <Text style={styles.cardHeader}>Where to?</Text>}
        {openCard == 0 && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.cardBody}
          >
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="search"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.inputField}
                placeholder="Search destinations"
                placeholderTextColor={Colors.grey}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.placesContainer}
            >
              {places.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedPlace(index)}
                  key={index}
                >
                  <Image
                    source={item.img}
                    style={
                      selectedPlace == index
                        ? styles.placeSelected
                        : styles.place
                    }
                  />
                  <Text style={{ fontFamily: "Montserrat", paddingTop: 6 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* When */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(20)}
            exiting={FadeOut.duration(20)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewdData}>{selectedDate}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 1 && (
          <Text style={styles.cardHeader}>When's your trip?</Text>
        )}

        {openCard == 1 && (
          <Animated.View style={styles.cardBody}>
            <DatePicker
              options={{
                defaultFont: "Montserrat",
                headerFont: "Montserrat-SemiBold",
                mainColor: Colors.primary,
                borderColor: "transparent",
              }}
              current={today}
              selected={today}
              mode={"calendar"}
              onSelectedChange={(date) => setSelectedDate(date)}
              minimumDate={today}
            />
          </Animated.View>
        )}
      </View>

      {/* Guests */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(20)}
            exiting={FadeOut.duration(20)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewdData}>{guestsSummary}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 2 && <Text style={styles.cardHeader}>Who's coming?</Text>}

        {openCard == 2 && (
          <Animated.View style={styles.cardBody}>
            {groups.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.guestItem,
                  index + 1 < guestsGroups.length ? styles.itemBorder : null,
                ]}
              >
                <View>
                  <Text
                    style={{ fontFamily: "Montserrat-SemiBold", fontSize: 14 }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 14,
                      color: Colors.grey,
                    }}
                  >
                    {item.text}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count = Math.max(
                        0,
                        newGroups[index].count - 1
                      );
                      setGroups(newGroups);
                      updateGuestsSummary(newGroups);
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={26}
                      color={groups[index].count > 0 ? Colors.grey : "#cdcdcd"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 16,
                      minWidth: 18,
                      textAlign: "center",
                    }}
                  >
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count++;
                      setGroups(newGroups);
                      updateGuestsSummary(newGroups);
                    }}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={26}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ height: "100%", justifyContent: "center" }}
            onPress={onClearAll}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Montserrat-SemiBold",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <Ionicons
              name="search-outline"
              size={24}
              style={defaultStyles.btnIcon}
              color={"#fff"}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  placesContainer: {
    flexDirection: "row",
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  previewText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: Colors.dark,
  },

  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});
