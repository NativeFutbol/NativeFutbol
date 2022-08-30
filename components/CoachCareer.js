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
import Timeline from "react-native-beautiful-timeline";

export default function CoachCareer({ data }) {
  const dummyData = [
    {
      date: 1574342522000,
      data: [
        {
          title: "React Native Beautiful Timeline",
          subtitle: "Sed at justo eros. Phasellus.",
          date: 1574342522000,
        },
        {
          title: "React Native",
          subtitle: "Sed viverra. Nam sagittis.",
          date: 1574342501000,
        },
      ],
    },
    {
      date: 1574248261000,
      data: [
        {
          title: "Timeline",
          subtitle: "Morbi magna orci, consequat in.",
          date: 1574248261000,
        },
      ],
    },
    {
      date: 1574125621000,
      data: [
        {
          title: "Beauty Timeline",
          subtitle: "Nulla a eleifend urna. Morbi. Praesent.",
          date: 1574125621000,
        },
      ],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Timeline data={dummyData} />
        <FlatList
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<View style={{ height: 500 }} />}
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                backgroundColor: "rgba(55, 55, 55, 0.5)",
              }}
            >
              <View>
                <Image
                  source={{
                    uri: item?.team?.logo
                      ? item.team.logo
                      : "https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193057179?k=20&m=1193057179&s=612x612&w=0&h=4eEeQWJXxxhRthWOBzbDP0ryllT5Mu7xtO1o9IA-hMU=",
                    height: 100,
                    width: 100,
                  }}
                />
              </View>

              <View style={{ justifyContent: "center", margin: 5 }}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    margin: 5,
                  }}
                >
                  Team: {item?.team?.name}
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {item?.start} to {item?.end === null ? "Present" : item?.end}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 800,
    width: 800,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    margin: 5,
    backgroundColor: "white",
    alignItems: "center",
    backgroundColor: "red",
  },
  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
});
