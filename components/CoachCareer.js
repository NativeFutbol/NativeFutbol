import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function CoachCareer({ data }) {
  console.log("insidecoachcareer---", data);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 500 }} />}
          data={data}
          renderItem={({ careerinfo }) => (
            <View>
              <Text>Career</Text>
              <Image
                source={{
                  uri: careerinfo?.team?.logo,
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
                Team:{careerinfo?.team?.name}
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {careerinfo?.start} to{" "}
                {careerinfo?.end === null ? "Present" : careerinfo?.end}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 800,
    // width: 800,
    // borderWidth: 2,
    // borderRadius: 10,
    // justifyContent: "center",
    // margin: 5,
    // backgroundColor: "white",
    // alignItems: "center",
    // backgroundColor: "red",
  },
  image: {
    // alignSelf: "center",
    // height: 100,
    // width: 100,
  },
});
