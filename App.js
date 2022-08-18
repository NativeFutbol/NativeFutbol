import { StyleSheet } from "react-native";
import AllCountriesScreen from "./screens/stats/AllCountriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabs from "./components/BottomTabs";

export default function App() {
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AllCountries" component={AllCountriesScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
        </Stack.Navigator> */}
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
