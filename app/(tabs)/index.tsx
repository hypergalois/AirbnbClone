import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
	return (
		<View>
			<Text>index</Text>
			<Link href={"/(modals)/login"}>Login</Link>
			<Link href={"/(modals)/booking"}>Bookings</Link>
			<Link href={"/listing/232"}>Listing details</Link>
		</View>
	);
};

export default index;
