import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Filters() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllCountries")}
            >
              <Text style={styles.text}>Countries</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity onPress={() => navigation.navigate("AllLeagues")}>
              <Text style={styles.text}>Leagues</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity onPress={() => navigation.navigate("AllTeams")}>
              <Text style={styles.text}>Teams</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity onPress={() => navigation.navigate("AllPlayers")}>
              <Text style={styles.text}>Players</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterOptions: {
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  container: {
    // width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
  },
  text: {
    padding: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
});
