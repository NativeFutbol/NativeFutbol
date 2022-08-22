import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SvgUri } from "react-native-svg";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function TeamCategoryList({ data, filter }) {
  //   const navigation = useNavigation();
  //   const navigationName =
  //     filter === "countries"
  //       ? "SingleCountry"
  //       : filter === "leagues"
  //       ? "SingleLeague"
  //       : filter === "teams"
  //       ? "SingleTeam"
  //       : "SinglePlayer";
  console.log(data);

  return (
    <FlatList
      numColumns={2}
      keyExtractor={(item, index) => item.id || index}
      data={data}
      renderItem={({ item }) => (
        // console.log(item)
        <View style={styles.container}>
          <TouchableOpacity>
            {/* onPress={() => navigation.navigate(navigationName)} */}
            {/* <Image
              style={styles.image}
              source={{
                uri: item.team.logo,
                height: 100,
                width: 100,
              }}
            /> */}
            <Text
              style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold" }}
            >
              {item.team.name}
            </Text>
            <Text style={{ borderColor: "black" }}>hi</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
  },
  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
});
