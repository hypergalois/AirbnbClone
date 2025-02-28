import { View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const Login = () => {
  const { isSignedIn } = useAuth();

  return (
    <View>
      <Text>{isSignedIn ? "Signed in" : "Not signed in"}</Text>
    </View>
  );
};

export default Login;
