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
import { setSingleScreenData } from "../store/singleScreenData";
import { useDispatch } from "react-redux";

export default function CategoryList({ data, filter }) {
  const navigation = useNavigation();
  const navigationName =
    filter === "countries"
      ? "SingleCountry"
      : filter === "leagues"
      ? "SingleLeague"
      : filter === "teams"
      ? "SingleTeam"
      : "SinglePlayer";

  const dispatch = useDispatch();

  return (
    <FlatList
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={<View style={{ height: 500 }} />}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationName, item);
              dispatch(setSingleScreenData(item));
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri:
                  item?.flag ||
                  item?.league?.logo ||
                  item?.team?.logo ||
                  item?.player?.photo ||
                  item?.photo,
                height: 100,
                width: 100,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item?.name ||
                item?.league?.name ||
                item?.team?.name ||
                item?.player?.name}
            </Text>
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
