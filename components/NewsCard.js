import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import moment from "moment";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.13);

const NewsCard = ({ item, index }) => {
  const publishedDate = new Date(item.publishedAt);

  return (
    <View style={styles.container} key={index}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 9,
          marginBottom: 0,
        }}
      >
        <Text style={styles.header}>{item.title}</Text>
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      </View>
      <Text style={styles.body}>{item.content}</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ fontSize: 12, paddingLeft: 10, margin: 5, marginTop: 1 }}
        >
          Published: {publishedDate.toDateString()}
        </Text>
        <Text
          style={{ fontSize: 12, paddingLeft: 10, margin: 5, marginTop: 1 }}
        >
          {moment(publishedDate).fromNow()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "70%",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 20,
  },
  header: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    width: "50%",
    flex: 1,
  },
  body: {
    color: "#222",
    fontSize: 14,
    margin: 5,
    paddingLeft: 10,
  },
});

export default NewsCard;