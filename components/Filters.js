import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

export default function Filters() {
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
            <TouchableOpacity>
              <Text style={styles.text}>Countries</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity>
              <Text style={styles.text}>Leagues</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity>
              <Text style={styles.text}>Teams</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterOptions}>
            <TouchableOpacity>
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
    marginHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
  },
  container: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 5,
  },
  text: {
    padding: 3,
    fontSize: 16,
    fontWeight: "bold",
  },
});
