import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomSearchBar from "./components/CustomSearchBar";
import AllCountriesScreen from "./screens/AllCountriesScreen";
import { FOOTBALL_API_KEY } from "@env";

export default function App() {
  console.log(FOOTBALL_API_KEY);
  return (
    <View>
      <AllCountriesScreen />
    </View>
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
